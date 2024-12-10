import { useState, useRef, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatWindow = ({ currentChat }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (currentChat) {
      setIsLoading(true);
      // Simulate API call to fetch messages
      setTimeout(() => {
        setMessages([
          // Add sample messages
        ]);
        setIsLoading(false);
      }, 1000);
    }
  }, [currentChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (content) => {
    const newMessage = {
      id: Date.now(),
      content,
      timestamp: new Date(),
      sender: 'currentUser', // Replace with actual user ID
    };
    setMessages(prev => [...prev, newMessage]);
  };

  if (!currentChat) {
    return (
      <div className="flex flex-col h-full w-full bg-white px-4 py-6 items-center justify-center text-gray-400">
        Select a conversation to start messaging
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-white px-4 py-6">
      <ChatHeader chat={currentChat} />
      <MessageList
        messages={messages}
        isLoading={isLoading}
        messagesEndRef={messagesEndRef}
      />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;