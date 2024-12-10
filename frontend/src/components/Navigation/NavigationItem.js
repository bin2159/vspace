import { NavLink } from 'react-router-dom';

export default function NavigationItem({ item }) {
  return (
    <li key={item.name} className="w-full px-2">
      <NavLink
        to={item.path}
        className={({ isActive }) => `
          relative flex items-center justify-center px-2 py-3 rounded-lg
          transition-colors duration-200 ease-in-out
          ${isActive
            ? 'bg-gray-800 text-white'
            : 'text-gray-400 hover:text-white hover:bg-gray-800'}
        `}
      >
        <item.icon className="h-6 w-6" aria-hidden="true" />

        {item.badge && (
          <span className="absolute top-1 right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-sky-500 text-xs text-white items-center justify-center">
              {item.badge}
            </span>
          </span>
        )}

        <span className="sr-only">{item.name}</span>
      </NavLink>
    </li>
  );
}