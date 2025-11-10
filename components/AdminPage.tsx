import React, { useState } from 'react';
import { TrashIcon } from './icons/TrashIcon';
import { PencilIcon } from './icons/PencilIcon';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { ContentSection, Course } from './PlatformPage';
import { PlusIcon } from './icons/PlusIcon';

interface AdminPageProps {
    onExitAdmin: () => void;
    contentData: ContentSection[];
    setContentData: React.Dispatch<React.SetStateAction<ContentSection[]>>;
}

const EditCardModal: React.FC<{
    card: Course;
    onClose: () => void;
    onSave: (updatedCard: Course) => void;
}> = ({ card, onClose, onSave }) => {
    const [title, setTitle] = useState(card.title);
    const [imageUrl, setImageUrl] = useState(card.imageUrl);

    const handleSaveClick = () => {
        onSave({ ...card, title, imageUrl });
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-neutral-900 rounded-xl shadow-2xl p-8 max-w-lg w-full border border-neutral-800/50">
                <h3 className="text-2xl font-bold text-white mb-6">Editar Card</h3>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="card-title" className="block text-sm font-medium text-neutral-400 mb-1">Nome do Card</label>
                        <input id="card-title" type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500" />
                    </div>
                    <div>
                        <label htmlFor="card-image" className="block text-sm font-medium text-neutral-400 mb-1">URL da Imagem</label>
                        <input id="card-image" type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500" />
                    </div>
                    {imageUrl && <img src={imageUrl} alt="Preview" className="mt-4 rounded-lg max-h-48 w-auto mx-auto border border-neutral-700" />}
                </div>
                <div className="mt-8 flex justify-end gap-4">
                    <button onClick={onClose} className="px-6 py-2 bg-neutral-700 font-semibold rounded-lg hover:bg-neutral-600 transition-colors">Cancelar</button>
                    <button onClick={handleSaveClick} className="px-6 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-500 transition-colors">Salvar Alterações</button>
                </div>
            </div>
        </div>
    );
};

const DeleteConfirmationModal: React.FC<{
    itemType: 'Card' | 'Método';
    itemName: string;
    onConfirm: () => void;
    onClose: () => void;
}> = ({ itemType, itemName, onConfirm, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-neutral-900 rounded-xl shadow-2xl p-8 max-w-md w-full border border-neutral-800/50">
                <h3 className="text-2xl font-bold text-white">Excluir {itemType}</h3>
                <p className="text-neutral-300 mt-4">
                    Tem certeza que deseja excluir o {itemType.toLowerCase()} <span className="font-bold text-white">"{itemName}"</span>? Esta ação não pode ser desfeita.
                </p>
                <div className="mt-8 flex justify-end gap-4">
                    <button onClick={onClose} className="px-6 py-2 bg-neutral-700 font-semibold rounded-lg hover:bg-neutral-600 transition-colors">Cancelar</button>
                    <button onClick={onConfirm} className="px-6 py-2 text-white font-semibold rounded-lg transition-colors bg-red-600 hover:bg-red-700">Excluir</button>
                </div>
            </div>
        </div>
    );
};

const MethodModal: React.FC<{ 
    onClose: () => void; 
    onSave: (title: string) => void; 
    methodToEdit?: ContentSection | null 
}> = ({ onClose, onSave, methodToEdit }) => {
    const [title, setTitle] = useState(methodToEdit?.title || '');

    const handleSaveClick = () => {
        if (title.trim()) {
            onSave(title.trim());
        }
    };
    
    return (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-neutral-900 rounded-xl shadow-2xl p-8 max-w-lg w-full border border-neutral-800/50">
                <h3 className="text-2xl font-bold text-white mb-6">{methodToEdit ? 'Editar Método' : 'Adicionar Novo Método'}</h3>
                 <div>
                    <label htmlFor="method-title" className="block text-sm font-medium text-neutral-400 mb-1">Nome do Método</label>
                    <input id="method-title" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex: Populares na Comunidade" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div className="mt-8 flex justify-end gap-4">
                    <button onClick={onClose} className="px-6 py-2 bg-neutral-700 font-semibold rounded-lg hover:bg-neutral-600 transition-colors">Cancelar</button>
                    <button onClick={handleSaveClick} className="px-6 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-500 transition-colors">Salvar</button>
                </div>
            </div>
        </div>
    );
};

const AddCardModal: React.FC<{ onClose: () => void; onSave: (data: { title: string, imageUrl: string }) => void; }> = ({ onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSaveClick = () => {
        if (title.trim() && imageUrl.trim()) {
            onSave({ title: title.trim(), imageUrl: imageUrl.trim() });
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-neutral-900 rounded-xl shadow-2xl p-8 max-w-lg w-full border border-neutral-800/50">
                <h3 className="text-2xl font-bold text-white mb-6">Adicionar Novo Card</h3>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="new-card-title" className="block text-sm font-medium text-neutral-400 mb-1">Nome do Card</label>
                        <input id="new-card-title" type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500" />
                    </div>
                    <div>
                        <label htmlFor="new-card-image" className="block text-sm font-medium text-neutral-400 mb-1">URL da Imagem</label>
                        <input id="new-card-image" type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500" />
                    </div>
                    {imageUrl && <img src={imageUrl} alt="Preview" className="mt-4 rounded-lg max-h-48 w-auto mx-auto border border-neutral-700" />}
                </div>
                <div className="mt-8 flex justify-end gap-4">
                    <button onClick={onClose} className="px-6 py-2 bg-neutral-700 font-semibold rounded-lg hover:bg-neutral-600 transition-colors">Cancelar</button>
                    <button onClick={handleSaveClick} className="px-6 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-500 transition-colors">Salvar Card</button>
                </div>
            </div>
        </div>
    )
};

const ContentManagementPage: React.FC<{
    contentData: ContentSection[];
    setContentData: React.Dispatch<React.SetStateAction<ContentSection[]>>;
}> = ({ contentData, setContentData }) => {
    const [editingCard, setEditingCard] = useState<{sectionId: string, card: Course} | null>(null);
    const [deletingCard, setDeletingCard] = useState<{sectionId: string, card: Course} | null>(null);
    const [isMethodModalOpen, setIsMethodModalOpen] = useState(false);
    const [methodToEdit, setMethodToEdit] = useState<ContentSection | null>(null);
    const [deletingMethod, setDeletingMethod] = useState<ContentSection | null>(null);
    const [addingCardToSectionId, setAddingCardToSectionId] = useState<string | null>(null);

    const handleUpdateCard = (updatedCard: Course) => {
        if (!editingCard) return;
        setContentData(prevData =>
            prevData.map(section =>
                section.id === editingCard.sectionId
                ? {
                    ...section,
                    items: section.items.map(item =>
                        item.id === updatedCard.id ? updatedCard : item
                    ),
                    }
                : section
            )
        );
        setEditingCard(null);
    };

    const handleDeleteCard = () => {
        if (!deletingCard) return;
        setContentData(prevData =>
            prevData.map(section =>
                section.id === deletingCard.sectionId
                ? {
                    ...section,
                    items: section.items.filter(item => item.id !== deletingCard.card.id),
                    }
                : section
            )
        );
        setDeletingCard(null);
    };

    const handleSaveMethod = (title: string) => {
        if (methodToEdit) { // Editing existing method
            setContentData(prevData => prevData.map(section => section.id === methodToEdit.id ? {...section, title} : section));
        } else { // Adding new method
            const newMethod: ContentSection = {
                id: title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
                title,
                items: [],
            };
            setContentData(prevData => [...prevData, newMethod]);
        }
        setMethodToEdit(null);
        setIsMethodModalOpen(false);
    };

    const handleDeleteMethod = () => {
        if (!deletingMethod) return;
        setContentData(prevData => prevData.filter(section => section.id !== deletingMethod.id));
        setDeletingMethod(null);
    };

    const handleAddCard = (newCardData: { title: string, imageUrl: string }) => {
        if (!addingCardToSectionId) return;
        
        const newCard: Course = {
            id: newCardData.title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
            title: newCardData.title,
            imageUrl: newCardData.imageUrl,
            lessons: [], // Default empty lessons
            description: '', // Default empty description
        };

        setContentData(prevData =>
            prevData.map(section =>
                section.id === addingCardToSectionId
                    ? { ...section, items: [...section.items, newCard] }
                    : section
            )
        );
        setAddingCardToSectionId(null);
    };

    return (
        <div className="p-4 sm:p-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white">Gerenciamento de Conteúdo</h2>
                    <p className="text-neutral-400 mt-1">Adicione, edite ou remova métodos e cursos.</p>
                </div>
                 <button onClick={() => { setMethodToEdit(null); setIsMethodModalOpen(true); }} className="flex items-center gap-2 px-5 py-2 bg-orange-600 text-white font-semibold rounded-full hover:bg-orange-500 transition-colors">
                    <PlusIcon /> Adicionar Método
                </button>
            </div>
             <div className="mt-8 space-y-8">
                {contentData.map(section => (
                    <div key={section.id} className="bg-neutral-900/80 p-6 rounded-xl border border-neutral-800/50">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-semibold text-white">{section.title}</h3>
                            <div className="flex items-center gap-2">
                                 <button onClick={() => setAddingCardToSectionId(section.id)} className="flex items-center gap-2 px-4 py-2 text-sm bg-orange-600/80 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors">
                                    <PlusIcon /> Adicionar Card
                                </button>
                                <button onClick={() => { setMethodToEdit(section); setIsMethodModalOpen(true); }} className="p-2 text-neutral-400 hover:text-white" title="Editar Método"><PencilIcon /></button>
                                <button onClick={() => setDeletingMethod(section)} className="p-2 text-neutral-400 hover:text-red-500" title="Excluir Método"><TrashIcon /></button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {section.items.map(course => (
                                <div key={course.id} className="group relative aspect-[9/16] rounded-lg overflow-hidden">
                                    <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <h4 className="absolute bottom-2 left-3 font-bold text-white">{course.title}</h4>
                                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                        <button onClick={() => setEditingCard({ sectionId: section.id, card: course })} className="p-2 bg-black/60 rounded-full text-white hover:bg-blue-500 transition-colors" title="Editar"><PencilIcon /></button>
                                        <button onClick={() => setDeletingCard({ sectionId: section.id, card: course })} className="p-2 bg-black/60 rounded-full text-white hover:bg-red-600 transition-colors" title="Excluir"><TrashIcon /></button>
                                    </div>
                                </div>
                            ))}
                             {section.items.length === 0 && <p className="col-span-full text-neutral-500 text-center py-4">Nenhum card neste método. Adicione um!</p>}
                        </div>
                    </div>
                ))}
            </div>
            {editingCard && (
                <EditCardModal
                    card={editingCard.card}
                    onClose={() => setEditingCard(null)}
                    onSave={handleUpdateCard}
                />
            )}
            {deletingCard && (
                 <DeleteConfirmationModal
                    itemType="Card"
                    itemName={deletingCard.card.title}
                    onClose={() => setDeletingCard(null)}
                    onConfirm={handleDeleteCard}
                />
            )}
             {deletingMethod && (
                 <DeleteConfirmationModal
                    itemType="Método"
                    itemName={deletingMethod.title}
                    onClose={() => setDeletingMethod(null)}
                    onConfirm={handleDeleteMethod}
                />
            )}
            {isMethodModalOpen && (
                <MethodModal
                    onClose={() => { setIsMethodModalOpen(false); setMethodToEdit(null); }}
                    onSave={handleSaveMethod}
                    methodToEdit={methodToEdit}
                />
            )}
            {addingCardToSectionId && (
                <AddCardModal
                    onClose={() => setAddingCardToSectionId(null)}
                    onSave={handleAddCard}
                />
            )}
        </div>
    )
}

const AdminPage: React.FC<AdminPageProps> = ({ onExitAdmin, contentData, setContentData }) => {
    return (
        <div className="flex flex-col h-screen w-full bg-neutral-950 text-white animate-fade-in overflow-hidden">
             <header className="flex-shrink-0 flex items-center justify-between p-4 bg-neutral-900/80 backdrop-blur-sm sticky top-0 z-30 border-b border-neutral-800">
                <h1 className="text-xl font-bold text-white">Gerenciamento de Conteúdo</h1>
                <button onClick={onExitAdmin} className="flex items-center gap-2 py-2 px-4 rounded-lg text-neutral-300 hover:bg-orange-600/50 transition-colors">
                    <ArrowLeftIcon />
                    <span>Voltar para Plataforma</span>
                </button>
             </header>
            <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-700 scrollbar-track-neutral-950">
                 <ContentManagementPage contentData={contentData} setContentData={setContentData} />
            </main>
             <style>{`
                .animate-fade-in { animation: fade-in 0.3s ease-in forwards; }
                @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
                 .scrollbar-thin {
                    scrollbar-width: thin;
                    scrollbar-color: #D97706 #171717;
                }
                .scrollbar-thin::-webkit-scrollbar {
                    width: 8px;
                }
                .scrollbar-thin::-webkit-scrollbar-track {
                    background: #0a0a0a;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb {
                    background-color: #B45309;
                    border-radius: 4px;
                }
                 .scrollbar-thin::-webkit-scrollbar-thumb:hover {
                    background-color: #D97706;
                }
            `}</style>
        </div>
    );
};

export default AdminPage;