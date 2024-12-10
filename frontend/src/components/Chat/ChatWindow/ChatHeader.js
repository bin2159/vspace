const ChatHeader = ({ chat }) => {
  return (
    <div className="flex items-center pb-4 border-b">
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{chat.name}</h2>
        {chat.status && (
          <p className="text-sm text-gray-500">{chat.status}</p>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;