import React from 'react';
import { UserIcon } from './icons/UserIcon';
import { LogoutIcon } from './icons/LogoutIcon';

interface ProfileMenuProps {
  isOpen: boolean;
  onLogout: () => void;
  onOpenProfile: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ isOpen, onLogout, onOpenProfile }) => {
  if (!isOpen) return null;

  const iconClass = "h-5 w-5 text-neutral-300";

  const menuItems = [
    { icon: <UserIcon className={iconClass} />, label: 'Perfil' },
    { icon: <LogoutIcon className={iconClass} />, label: 'Sair' },
  ];

  const handleItemClick = (label: string) => {
      if (label === 'Sair') {
          onLogout();
      } else if (label === 'Perfil') {
          onOpenProfile();
      }
  }

  return (
    <div 
      className="absolute bottom-full mb-2 w-56 bg-neutral-800 rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden animate-scale-in-up origin-bottom z-50"
      role="menu" 
      aria-orientation="vertical" 
      aria-labelledby="user-menu-button"
    >
      <div className="py-1">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href="#"
            onClick={(e) => { 
                e.preventDefault(); 
                handleItemClick(item.label)
            }}
            className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-200 hover:bg-orange-600/50 transition-colors"
            role="menuitem"
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProfileMenu;