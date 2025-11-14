import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const MAX_IMAGES = 10;

  // Функция для сжатия изображения
  const compressImage = (file, maxWidth = 1200, quality = 0.8) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (event) => {
        const img = new window.Image();
        img.src = event.target.result;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Пропорциональное уменьшение если изображение слишком большое
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Конвертируем в base64 с заданным качеством
          const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedBase64);
        };
        
        img.onerror = reject;
      };
      
      reader.onerror = reject;
    });
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = MAX_IMAGES - imagePreviews.length;

    if (files.length > remainingSlots) {
      toast.error(`You can only add ${remainingSlots} more image(s). Maximum is ${MAX_IMAGES}.`);
      return;
    }

    // Показываем индикатор загрузки
    const loadingToast = toast.loading('Compressing images...');

    try {
      for (const file of files) {
        if (!file.type.startsWith("image/")) {
          toast.error("Please select only image files");
          continue;
        }

        // Сжимаем изображение
        const compressedImage = await compressImage(file);
        
        setImagePreviews((prev) => [
          ...prev, 
          { id: Date.now() + Math.random(), data: compressedImage }
        ]);
      }

      toast.success('Images ready!', { id: loadingToast });
    } catch (error) {
      console.error('Error compressing images:', error);
      toast.error('Failed to process images', { id: loadingToast });
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (id) => {
    setImagePreviews((prev) => prev.filter((img) => img.id !== id));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && imagePreviews.length === 0) return;

    setIsSending(true);

    try {
      // Отправляем сообщение с текстом и всеми изображениями
      await sendMessage({
        text: text.trim(),
        images: imagePreviews.map(img => img.data),
      });

      // Анимация отправки
      setText("");
      setImagePreviews([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-4 w-full border-t border-base-300 bg-base-100">
      {imagePreviews.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2 animate-in slide-in-from-bottom duration-300">
          {imagePreviews.map((img) => (
            <div key={img.id} className="relative group animate-in zoom-in duration-200">
              <img
                src={img.data}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg border border-base-300 
                transition-all duration-200 group-hover:scale-105"
              />
              <button
                onClick={() => removeImage(img.id)}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-error
                flex items-center justify-center transition-all duration-200
                hover:scale-110 active:scale-95"
                type="button"
              >
                <X className="size-4 text-white" />
              </button>
            </div>
          ))}
          {imagePreviews.length < MAX_IMAGES && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-20 h-20 rounded-lg border-2 border-dashed border-base-300
              flex items-center justify-center hover:border-primary hover:bg-primary/5
              transition-all duration-200 group"
              type="button"
            >
              <Image className="size-6 text-base-content/40 group-hover:text-primary transition-colors" />
            </button>
          )}
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md
            transition-all duration-200 focus:ring-2 focus:ring-primary/50"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isSending}
          />
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`
              hidden sm:flex btn btn-circle btn-sm sm:btn-md
              transition-all duration-200 hover:scale-110 active:scale-95
              ${imagePreviews.length > 0 ? "btn-primary" : "btn-ghost"}
            `}
            onClick={() => fileInputRef.current?.click()}
            disabled={imagePreviews.length >= MAX_IMAGES}
          >
            <Image className="size-5" />
          </button>
        </div>
        <button
          type="submit"
          className={`
            btn btn-circle btn-sm sm:btn-md btn-primary
            transition-all duration-200
            ${isSending ? "animate-pulse" : "hover:scale-110 active:scale-95"}
          `}
          disabled={(!text.trim() && imagePreviews.length === 0) || isSending}
        >
          <Send className={`size-5 ${isSending ? "animate-bounce" : ""}`} />
        </button>
      </form>

      {imagePreviews.length > 0 && (
        <div className="mt-2 text-xs text-base-content/60 animate-in fade-in duration-300">
          {imagePreviews.length} / {MAX_IMAGES} images selected
        </div>
      )}
    </div>
  );
};
export default MessageInput;