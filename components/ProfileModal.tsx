import React, { useRef } from 'react';
import { UserIcon } from './icons/UserIcon';
import { MailIcon } from './icons/MailIcon';
import { LockIcon } from './icons/LockIcon';
import { PencilIcon } from './icons/PencilIcon';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    isAdmin: boolean;
    profilePicture: string | null;
    setProfilePicture: React.Dispatch<React.SetStateAction<string | null>>;
}

interface InputFieldProps {
    icon: React.ReactNode;
    label: string;
    type: string;
    id: string;
    defaultValue?: string;
    placeholder?: string;
    disabled?: boolean;
    rightIcon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({ icon, label, type, id, defaultValue, placeholder, disabled, rightIcon }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-neutral-400 mb-1">{label}</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                {icon}
            </div>
            <input
                type={type}
                id={id}
                defaultValue={defaultValue}
                placeholder={placeholder}
                disabled={disabled}
                className={`w-full pl-12 ${rightIcon ? 'pr-12' : 'pr-4'} py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition ${disabled ? 'bg-neutral-800/50 cursor-not-allowed text-neutral-500' : ''}`}
            />
             {rightIcon && (
                 <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    {rightIcon}
                </div>
            )}
        </div>
    </div>
);

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, isAdmin, profilePicture, setProfilePicture }) => {
    if (!isOpen) return null;

    const fileInputRef = useRef<HTMLInputElement>(null);

    const user = {
        name: isAdmin ? 'Admin' : 'Nome do Usuário',
        email: isAdmin ? 'admin@r4.com' : 'usuario@exemplo.com'
    };
    
    const handleSave = () => {
        // Lógica de salvamento viria aqui
        onClose();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const triggerFileSelect = () => fileInputRef.current?.click();

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-lg border border-neutral-800/50 animate-scale-in-up flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Configurações do Perfil</h2>
                    <button onClick={onClose} className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-700/50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                    {/* Profile Picture Section */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative group">
                            <div className="w-32 h-32 bg-neutral-800 rounded-full flex items-center justify-center overflow-hidden border-2 border-neutral-700">
                                {profilePicture ? (
                                    <img src={profilePicture} alt="Foto de Perfil" className="w-full h-full object-cover" />
                                ) : (
                                    <UserIcon className="h-16 w-16 text-neutral-500" />
                                )}
                            </div>
                            <button 
                                onClick={triggerFileSelect}
                                className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white"
                                aria-label="Alterar foto de perfil"
                            >
                                <PencilIcon />
                            </button>
                        </div>
                        <input 
                            type="file" 
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/png, image/jpeg, image/webp"
                            onChange={handleImageChange}
                        />
                        <button onClick={triggerFileSelect} className="font-semibold text-orange-400 hover:text-orange-300 transition-colors">
                            Alterar Foto
                        </button>
                    </div>

                    {/* User Info */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Informações do Perfil</h4>
                        <div className="space-y-4">
                            <InputField label="Nome Completo" id="fullName" type="text" defaultValue={user.name} icon={<UserIcon className="h-5 w-5 text-neutral-400" />} />
                            <InputField label="Email" id="email" type="email" defaultValue={user.email} icon={<MailIcon />} disabled rightIcon={<LockIcon />} />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Alterar Senha</h4>
                        <div className="space-y-4">
                            <InputField label="Senha Atual" id="current-password" type="password" placeholder="••••••••" icon={<LockIcon />} />
                            <InputField label="Nova Senha" id="new-password" type="password" placeholder="••••••••" icon={<LockIcon />} />
                            <InputField label="Confirmar Nova Senha" id="confirm-password" type="password" placeholder="••••••••" icon={<LockIcon />} />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-neutral-800/50 flex justify-end gap-4">
                     <button 
                        onClick={onClose}
                        className="px-6 py-2 bg-neutral-700 text-white font-semibold rounded-lg hover:bg-neutral-600 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={handleSave}
                        className="px-6 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-500 transition-colors"
                    >
                        Salvar Alterações
                    </button>
                </div>
            </div>
            {/* Animation styles */}
            <style>{`
                @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
                @keyframes scale-in-up {
                    0% {
                        opacity: 0;
                        transform: scale(0.95) translateY(10px);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
                .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
                .animate-scale-in-up { animation: scale-in-up 0.2s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default ProfileModal;
