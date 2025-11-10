import React from 'react';
import { LockSolidIcon } from './icons/LockSolidIcon';

interface PremiumModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose, onConfirm, title, description }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4"
            aria-labelledby="premium-modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div 
                className="bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-sm border border-neutral-800/50 animate-scale-in-up text-center p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mx-auto w-16 h-16 bg-orange-500/10 border-2 border-orange-500/30 rounded-full flex items-center justify-center text-orange-400">
                    <LockSolidIcon className="h-8 w-8" />
                </div>

                <h2 id="premium-modal-title" className="text-2xl font-bold text-white mt-6">
                    {title}
                </h2>

                <p className="text-neutral-400 mt-2">
                    {description}
                </p>

                <div className="mt-8 flex flex-col gap-3">
                    <button 
                        onClick={onConfirm}
                        className="w-full px-6 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-500 transition-colors"
                    >
                        Fazer Upgrade Agora
                    </button>
                    <button 
                        onClick={onClose}
                        className="w-full px-6 py-2 text-neutral-400 font-semibold rounded-lg hover:bg-neutral-800/50 transition-colors"
                    >
                        Talvez mais tarde
                    </button>
                </div>
            </div>
            {/* Animation styles are in PlatformPage.tsx or a global scope */}
        </div>
    );
};

export default PremiumModal;