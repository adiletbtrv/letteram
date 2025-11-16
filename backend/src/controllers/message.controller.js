import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image, images } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrls = [];

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrls.push(uploadResponse.secure_url);
    }

    //for multiple images
    if (images && Array.isArray(images)) {
      const uploadPromises = images.map(img => 
        cloudinary.uploader.upload(img, {
          folder: 'letteram_messages',
          transformation: [
            { width: 1000, crop: 'limit' },
            { quality: 'auto' }
          ]
        })
      );
      
      const uploadResults = await Promise.all(uploadPromises);
      imageUrls.push(...uploadResults.map(result => result.secure_url));
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrls[0] || undefined, 
      images: imageUrls.length > 0 ? imageUrls : undefined,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};