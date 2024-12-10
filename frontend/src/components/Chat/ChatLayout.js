import { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import ChatWindow from './ChatWindow/ChatWindow';

const ChatLayout = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "UI Art Design",
      avatar: "T",
      status: "active",
      unreadCount: 5,
      lastMessage: "Lorem ipsum dolor sit amet...",
      timestamp: "5 min",
      isTeam: true
    },
    // Add more chat objects
  ]);

  return (
    <div className="flex flex-row h-screen antialiased text-gray-800">
      <Sidebar
        chats={chats}
        selectedChat={selectedChat}
        onChatSelect={setSelectedChat}
      />
      <ChatWindow
        currentChat={selectedChat}
      />
    </div>
  );
};

export default ChatLayout;