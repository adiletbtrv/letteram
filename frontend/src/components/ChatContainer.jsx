import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-100">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full animate-in fade-in duration-500">
            <p className="text-base-content/60">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={message._id}
              className={`
                chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}
                animate-in slide-in-from-bottom duration-300
              `}
              style={{ animationDelay: `${index * 50}ms` }}
              ref={index === messages.length - 1 ? messageEndRef : null}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border border-base-300">
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                    className="transition-transform duration-200 hover:scale-110"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div className="chat-bubble flex flex-col transition-all duration-200 hover:scale-[1.02]">
                {message.images && message.images.length > 0 && (
                  <div className={`grid gap-2 mb-2 ${
                    message.images.length === 1 ? "grid-cols-1" :
                    message.images.length === 2 ? "grid-cols-2" :
                    message.images.length === 3 ? "grid-cols-3" :
                    "grid-cols-2"
                  }`}>
                    {message.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Attachment ${idx + 1}`}
                        className="rounded-md max-w-[200px] transition-transform duration-200 hover:scale-105 cursor-pointer"
                        onClick={() => window.open(img, '_blank')}
                      />
                    ))}
                  </div>
                )}
                {/* Legacy support for single image */}
                {message.image && !message.images && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2 transition-transform duration-200 hover:scale-105 cursor-pointer"
                    onClick={() => window.open(message.image, '_blank')}
                  />
                )}
                {message.text && <p className="break-words">{message.text}</p>}
              </div>
            </div>
          ))
        )}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;