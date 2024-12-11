import SearchField from "./SearchField";
import ChatsDisplay from "./ChatsDisplay";
import { useContext } from "react";
import { ChatContext } from "@/context/ChatContext";
export default function ChatWindow() {
  const {chatText} = useContext(ChatContext);
  return (
    <div >
      {/* Input Form */}
      {chatText.length > 0 && <ChatsDisplay />}
      <SearchField />
    </div>
  );
}
