import React, { useState, useMemo } from 'react';
import { UsersIcon } from './icons/UsersIcon';
import { UserIcon } from './icons/UserIcon';
import { TrashIcon } from './icons/TrashIcon';
import { PencilIcon } from './icons/PencilIcon';
import { BanIcon } from './icons/BanIcon';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

// Mock Data for Users
const initialUsers = [
  { id: 1, name: 'Carlos Silva', email: 'carlos.silva@example.com', joinDate: '2024-05-10', status: 'Active' },
  { id: 2, name: 'Beatriz Costa', email: 'beatriz.costa@example.com', joinDate: '2024-05-12', status: 'Active' },
  { id: 3, name: 'Daniel Almeida', email: 'daniel.almeida@example.com', joinDate: '2024-05-15', status: 'Banned' },
  { id: 4, name: 'Fernanda Lima', email: 'fernanda.lima@example.com', joinDate: '2024-05-20', status: 'Active' },
];
type User = typeof initialUsers[0];

type ModalAction = 'ban' | 'unban' | 'deleteUser';

interface AdminPageProps {
    onExitAdmin: () => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ onExitAdmin }) => {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalState, setModalState] = useState<{ isOpen: boolean; action: ModalAction | null; item: User | null }>({ isOpen: false, action: null, item: null });

    const filteredUsers = useMemo(() =>
        users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        ), [users, searchTerm]);

    const handleActionClick = (action: ModalAction, item: User) => {
        setModalState({ isOpen: true, action, item });
    };
    
    const confirmAction = () => {
        const { action, item } = modalState;
        if (!item) return;

        if (action === 'deleteUser') {
            setUsers(prev => prev.filter(u => u.id !== item.id));
        }
        if (action === 'ban') {
            setUsers(prev => prev.map(u => u.id === item.id ? { ...u, status: 'Banned' } : u));
        }
        if (action === 'unban') {
            setUsers(prev => prev.map(u => u.id === item.id ? { ...u, status: 'Active' } : u));
        }
        closeModal();
    };

    const closeModal = () => {
        setModalState({ isOpen: false, action: null, item: null });
    };

    return (
        <div className="flex h-screen w-full bg-neutral-950 text-white animate-fade-in overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-black/80 backdrop-blur-lg flex-shrink-0 flex flex-col p-6">
                 <h1 className="text-2xl font-bold text-white mb-10">Admin</h1>
                 <nav className="flex flex-col gap-4">
                     <div className="flex items-center gap-4 py-3 px-4 rounded-lg bg-orange-600 text-white">
                        <UsersIcon />
                        <span className="font-semibold">Usuários</span>
                    </div>
                 </nav>
                 <div className="mt-auto">
                    <button onClick={onExitAdmin} className="flex w-full items-center gap-4 py-3 px-4 rounded-lg text-neutral-300 hover:bg-orange-600/50 transition-colors">
                        <ArrowLeftIcon />
                        <span className="font-semibold">Voltar para a Plataforma</span>
                    </button>
                 </div>
            </aside>
            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-y-auto">
                <UserManagementPage users={filteredUsers} onSearch={setSearchTerm} onAction={handleActionClick} />
            </main>
            {/* Modals */}
            {modalState.isOpen && <ConfirmationModal {...modalState} onConfirm={confirmAction} onClose={closeModal} />}
        </div>
    );
};

const UserManagementPage: React.FC<{ users: User[], onSearch: (term: string) => void, onAction: (action: ModalAction, user: User) => void }> = ({ users, onSearch, onAction }) => (
    <div className="p-8">
        <h2 className="text-3xl font-bold text-white">Gerenciamento de Usuários</h2>
        <p className="text-neutral-400 mt-1">Monitore e gerencie os usuários da plataforma.</p>

        <div className="mt-8">
            <input 
                type="text" 
                placeholder="Buscar por nome ou email..."
                onChange={(e) => onSearch(e.target.value)}
                className="w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
        </div>

        <div className="mt-6 bg-neutral-900/80 rounded-xl border border-neutral-800/50 overflow-hidden">
            <table className="w-full text-left">
                <thead className="border-b border-neutral-800/50">
                    <tr>
                        <th className="p-4 font-semibold">Nome</th>
                        <th className="p-4 font-semibold">Email</th>
                        <th className="p-4 font-semibold">Data de Cadastro</th>
                        <th className="p-4 font-semibold">Status</th>
                        <th className="p-4 font-semibold text-right">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="border-b border-neutral-800/50 last:border-b-0 hover:bg-neutral-800/40 transition-colors">
                            <td className="p-4 flex items-center gap-3">
                                <div className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center flex-shrink-0"><UserIcon className="text-neutral-300" /></div>
                                <span>{user.name}</span>
                            </td>
                            <td className="p-4 text-neutral-300">{user.email}</td>
                            <td className="p-4 text-neutral-300">{user.joinDate}</td>
                            <td className="p-4">
                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${user.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {user.status === 'Active' ? 'Ativo' : 'Banido'}
                                </span>
                            </td>
                            <td className="p-4 text-right">
                                <div className="inline-flex gap-2">
                                    <button title="Editar" className="p-2 text-neutral-400 hover:text-white transition-colors"><PencilIcon /></button>
                                    {user.status === 'Active' ? 
                                     <button onClick={() => onAction('ban', user)} title="Banir" className="p-2 text-neutral-400 hover:text-red-500 transition-colors"><BanIcon /></button>
                                     : <button onClick={() => onAction('unban', user)} title="Desbanir" className="p-2 text-neutral-400 hover:text-green-500 transition-colors"><BanIcon /></button>
                                    }
                                    <button onClick={() => onAction('deleteUser', user)} title="Excluir" className="p-2 text-neutral-400 hover:text-red-500 transition-colors"><TrashIcon /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const ConfirmationModal: React.FC<{
    action: ModalAction | null;
    item: User | null;
    onConfirm: () => void;
    onClose: () => void;
}> = ({ action, item, onConfirm, onClose }) => {
    if (!action || !item) return null;

    const messages = {
        deleteUser: { title: 'Excluir Usuário', text: `Tem certeza que deseja excluir permanentemente o usuário ${item.name}? Esta ação não pode ser desfeita.`, confirmText: 'Excluir', color: 'red' },
        ban: { title: 'Banir Usuário', text: `Tem certeza que deseja banir ${item.name}? O usuário perderá o acesso à plataforma.`, confirmText: 'Banir', color: 'red' },
        unban: { title: 'Desbanir Usuário', text: `Tem certeza que deseja reativar a conta de ${item.name}?`, confirmText: 'Desbanir', color: 'green' },
    };
    const config = messages[action];
    const confirmColorClass = config.color === 'red' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700';

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-neutral-900 rounded-xl shadow-2xl p-8 max-w-md w-full border border-neutral-800/50">
                <h3 className="text-2xl font-bold text-white">{config.title}</h3>
                <p className="text-neutral-300 mt-4">{config.text}</p>
                <div className="mt-8 flex justify-end gap-4">
                    <button onClick={onClose} className="px-6 py-2 bg-neutral-700 font-semibold rounded-lg hover:bg-neutral-600 transition-colors">Cancelar</button>
                    <button onClick={onConfirm} className={`px-6 py-2 text-white font-semibold rounded-lg transition-colors ${confirmColorClass}`}>{config.confirmText}</button>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;