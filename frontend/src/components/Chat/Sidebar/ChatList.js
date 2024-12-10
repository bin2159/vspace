const ChatList = ({ chats, selectedChat, onChatSelect }) => {
  return (
    <div className="h-full overflow-hidden relative pt-2">
      <div className="flex flex-col divide-y h-full overflow-y-auto -mx-4">
        {chats.map(chat => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            isSelected={selectedChat?.id === chat.id}
            onClick={() => onChatSelect(chat)}
          />
        ))}
      </div>
      <NewChatButton />
    </div>
  );
};

const ChatListItem = ({ chat, isSelected, onClick }) => {
  const {
    avatar,
    name,
    lastMessage,
    timestamp,
    unreadCount,
    status,
  } = chat;

  return (
    <div
      className={`flex flex-row items-center p-4 relative cursor-pointer
        ${isSelected ? 'bg-gradient-to-r from-red-100 to-transparent border-l-2 border-red-500' : ''}`}
      onClick={onClick}
    >
      <div className="absolute text-xs text-gray-500 right-0 top-0 mr-4 mt-3">
        {timestamp}
      </div>
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0">
        {avatar}
      </div>
      <div className="flex flex-col flex-grow ml-3">
        <div className="flex items-center">
          <div className="text-sm font-medium">{name}</div>
          {status === 'active' && (
            <div className="h-2 w-2 rounded-full bg-green-500 ml-2" />
          )}
        </div>
        <div className="text-xs truncate w-40">{lastMessage}</div>
      </div>
      {unreadCount > 0 && (
        <div className="flex-shrink-0 ml-2 self-end mb-1">
          <span className="flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs rounded-full">
            {unreadCount}
          </span>
        </div>
      )}
    </div>
  );
};

const NewChatButton = () => (
  <div className="absolute bottom-0 right-0 mr-2">
    <button className="flex items-center justify-center shadow-sm h-10 w-10 bg-red-500 text-white rounded-full">
      <svg className="w-6 h-6"
           fill="none"
           stroke="currentColor"
           viewBox="0 0 24 24"
           xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    </button>
  </div>
);

export default ChatList;