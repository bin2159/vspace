import { useContext } from "react";
import { ChatContext } from "@/context/ChatContext";

export default function ChatsDisplay() {
  const { chatText } = useContext(ChatContext);
  let flag = false;

  // Function to escape HTML special characters
  const escapeHtml = (str) => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  return (
    <div className="w-[100%] h-[60vh] p-6 space-y-4 mx-auto mb-5 overflow-y-auto bg-gray-100 rounded-lg shadow-lg">
      {chatText.map((chatMessage, index) => {
        // Remove triple backticks, replace ** with <strong> for bold, and replace newlines with <br />
        let formattedMessage = chatMessage
          .replace(/```/g, "")  // Remove triple backticks
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")  // Make text between ** bold
         

        // Escape all special HTML characters except <br />
        formattedMessage = escapeHtml(formattedMessage).replace(/\n/g, "<br />"); // Replace newlines with <br />;

        // Now set the formatted message with <br /> as line breaks
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
              // Render the formatted message with <br /> as line breaks
              dangerouslySetInnerHTML={{ __html: formattedMessage }}
            />
            {(flag = !flag)}
          </div>
        );
      })}
    </div>
  );
}
