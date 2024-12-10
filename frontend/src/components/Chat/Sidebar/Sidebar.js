import NavigationBar from './NavigationBar';
import ChatList from './ChatList';
import { useState } from 'react';

const Sidebar = ({ chats, selectedChat, onChatSelect }) => {
  const [filter, setFilter] = useState('all'); // 'all', 'archived', 'starred'

  return (
    <div className="flex flex-row w-96 flex-shrink-0 bg-gray-100 p-4">
      <NavigationBar />
      <div className="flex flex-col w-full h-full pl-4 pr-4 py-4 -mr-4">
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center">
            <div className="text-xl font-semibold">Messages</div>
            <div className="flex items-center justify-center ml-2 text-xs h-5 w-5 text-white bg-red-500 rounded-full font-medium">
              {chats.reduce((acc, chat) => acc + (chat.unreadCount || 0), 0)}
            </div>
          </div>
          <SearchBar />
        </div>

        <ChatFilter
          currentFilter={filter}
          onFilterChange={setFilter}
        />

        <ChatList
          chats={chats.filter(chat => {
            if (filter === 'all') return true;
            return chat[filter];
          })}
          selectedChat={selectedChat}
          onChatSelect={onChatSelect}
        />
      </div>
    </div>
  );
};

const SearchBar = () => (
  <div className="ml-auto">
    <button className="flex items-center justify-center h-7 w-7 bg-gray-200 text-gray-500 rounded-full">
      <svg className="w-4 h-4 stroke-current"
           fill="none"
           stroke="currentColor"
           viewBox="0 0 24 24"
           xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </button>
  </div>
);

const ChatFilter = ({ currentFilter, onFilterChange }) => (
  <div className="mt-5">
    <ul className="flex flex-row items-center justify-between">
      {['all', 'archived', 'starred'].map(filter => (
        <li key={filter}>
          <button
            onClick={() => onFilterChange(filter)}
            className={`flex items-center pb-3 text-xs font-semibold relative
              ${currentFilter === filter
                ? 'text-indigo-800'
                : 'text-gray-700'}`}
          >
            <span className="capitalize">{filter === 'all' ? 'All Conversations' : filter}</span>
            {currentFilter === filter && (
              <span className="absolute left-0 bottom-0 h-1 w-6 bg-indigo-800 rounded-full" />
            )}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default Sidebar;