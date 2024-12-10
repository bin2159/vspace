import { useState } from 'react';

export const Tooltip = ({ children, content, placement = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const placements = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2'
  };

  return (
    <div className="relative flex items-center group"
         onMouseEnter={() => setIsVisible(true)}
         onMouseLeave={() => setIsVisible(false)}>
      {children}
      {isVisible && (
        <div className={`
          absolute z-10
          ${placements[placement]}
          px-2 py-1
          bg-gray-900 text-white
          text-xs rounded
          whitespace-nowrap
          pointer-events-none
          transition-opacity duration-200
        `}>
          {content}
          <div className={`
            absolute w-2 h-2
            bg-gray-900
            transform rotate-45
            ${placement === 'top' ? 'bottom-[-4px] left-1/2 -translate-x-1/2' : ''}
            ${placement === 'right' ? 'left-[-4px] top-1/2 -translate-y-1/2' : ''}
            ${placement === 'bottom' ? 'top-[-4px] left-1/2 -translate-x-1/2' : ''}
            ${placement === 'left' ? 'right-[-4px] top-1/2 -translate-y-1/2' : ''}
          `} />
        </div>
      )}
    </div>
  );
};