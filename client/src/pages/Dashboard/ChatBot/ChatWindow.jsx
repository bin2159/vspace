import SearchField from "./SearchField";
import ChatsDisplay from "./ChatsDisplay";
export default function ChatWindow() {
  return (
    <div >
      {/* Input Form */}
      <ChatsDisplay />
      <SearchField />
    </div>
  );
}
