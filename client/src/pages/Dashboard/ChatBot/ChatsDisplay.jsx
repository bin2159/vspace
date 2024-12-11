import { useContext } from "react";
import { ChatContext } from "@/context/ChatContext";

export default function ChatsDisplay() {
  const { chatText } = useContext(ChatContext);
  let flag = false;

  return (
    <div className="w-[100%] h-[60vh] p-6 space-y-4 mx-auto mb-5 overflow-y-auto bg-gray-100 rounded-lg shadow-lg">
      {chatText.map((chatMessage, index) => {
        return (
          <div
            key={index}
            className={`flex ${flag === false ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`inline-block max-w-xs px-4 py-2 rounded-xl text-white break-words ${
                flag === false
                  ? "bg-indigo-600 text-right"
                  : "bg-gray-500 text-left"
              }`}
            >
              {chatMessage}
              {(flag = !flag)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
