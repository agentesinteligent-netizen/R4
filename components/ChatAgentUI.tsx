import React, { useState, useRef, useEffect } from 'react';
import { SendIcon } from './icons/SendIcon';
import { UserIcon } from './icons/UserIcon';
import { AgentIcon } from './icons/AgentIcon';
import { PaperclipIcon } from './icons/PaperclipIcon';

interface ChatMessage {
    sender: 'user' | 'ai';
    text?: string;
    imageUrl?: string;
}

const ChatAgentUI: React.FC = () => {
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const chatEndRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        const chatInput = inputRef.current?.value;
        if (!chatInput || !chatInput.trim()) return;

        const newUserMessage: ChatMessage = { sender: 'user', text: chatInput };
        setChatMessages(prev => [...prev, newUserMessage]);
        
        if (inputRef.current) {
            inputRef.current.value = '';
        }

        setTimeout(() => {
            const aiResponse: ChatMessage = { sender: 'ai', text: `Esta é uma resposta simulada para: "${chatInput}"`};
            setChatMessages(prev => [...prev, aiResponse]);
        }, 1000);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result as string;
                const newUserMessage: ChatMessage = { sender: 'user', imageUrl };
                setChatMessages(prev => [...prev, newUserMessage]);

                setTimeout(() => {
                    const aiResponse: ChatMessage = { sender: 'ai', text: 'Esta é uma análise simulada da imagem que você enviou.' };
                    setChatMessages(prev => [...prev, aiResponse]);
                }, 1000);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {chatMessages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                        {msg.sender === 'ai' && <div className="w-10 h-10 bg-orange-600/30 rounded-full flex items-center justify-center flex-shrink-0"><AgentIcon /></div>}
                        
                        <div className={`max-w-lg rounded-2xl ${msg.sender === 'user' ? 'bg-orange-600 text-white rounded-br-none' : 'bg-neutral-800 text-neutral-200 rounded-bl-none'}`}>
                            {msg.imageUrl ? (
                                <div className="p-2">
                                    <img src={msg.imageUrl} alt="Envio do usuário" className="max-w-xs max-h-64 rounded-xl" />
                                </div>
                            ) : (
                                <p className="p-4">{msg.text}</p>
                            )}
                        </div>

                        {msg.sender === 'user' && <div className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center flex-shrink-0"><UserIcon /></div>}
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="p-6 border-t border-neutral-800/50">
                <div className="relative">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        className="hidden"
                        accept="image/*"
                    />
                    <button type="button" onClick={triggerFileInput} className="absolute inset-y-0 left-0 flex items-center justify-center w-12 h-full text-neutral-400 hover:text-orange-400 transition-colors" aria-label="Anexar imagem">
                        <PaperclipIcon />
                    </button>
                    <input
                        type="text"
                        ref={inputRef}
                        defaultValue=""
                        placeholder="Digite sua mensagem ou envie uma imagem..."
                        className="w-full pl-12 pr-14 py-3 bg-neutral-800 border border-neutral-700 rounded-full text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button type="submit" className="absolute inset-y-0 right-0 flex items-center justify-center w-12 h-full text-orange-400 hover:text-orange-300 transition-colors" aria-label="Enviar mensagem">
                        <SendIcon />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default React.memo(ChatAgentUI);