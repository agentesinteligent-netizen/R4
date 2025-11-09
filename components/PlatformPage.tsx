import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ContentIcon } from './icons/ContentIcon';
import { CommunityIcon } from './icons/CommunityIcon';
import { AgentIcon } from './icons/AgentIcon';
import { UserIcon } from './icons/UserIcon';
import { RocketIcon } from './icons/RocketIcon';
import { PlayIcon } from './icons/PlayIcon';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import ProfileMenu from './ProfileMenu';
import { ChatIcon } from './icons/ChatIcon';
import { ImageIcon } from './icons/ImageIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { BrushIcon } from './icons/BrushIcon';
import { CleanIcon } from './icons/CleanIcon';
import { DiscordIcon } from './icons/DiscordIcon';
import AgentWorkspace from './AgentWorkspace';
import { DownloadIcon } from './icons/DownloadIcon';
import { DashboardIcon } from './icons/DashboardIcon';
import DashboardView from './DashboardView';
import ProfileModal from './ProfileModal';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';
import { PencilIcon } from './icons/PencilIcon';

interface Lesson {
    id: number;
    title: string;
    videoId: string;
    description: string;
}

export interface Course {
    id: string;
    title: string;
    imageUrl: string;
    lessons: Lesson[];
    description?: string;
}

export interface ContentSection {
  id: string;
  title: string;
  items: Course[];
}


export interface Agent {
    id: string;
    name: string;
    description: string;
    longDescription: string;
    icon: React.ReactNode;
}

export type ActiveView = 'dashboard' | 'conteudo' | 'comunidade' | 'agentes';

interface PlatformPageProps {
    isAdmin: boolean;
    onNavigateToAdmin: () => void;
    onLogout: () => void;
    contentData: ContentSection[];
    setContentData: React.Dispatch<React.SetStateAction<ContentSection[]>>;
    profilePicture: string | null;
    setProfilePicture: React.Dispatch<React.SetStateAction<string | null>>;
    lastViewedCourseId: string | null;
    setLastViewedCourseId: React.Dispatch<React.SetStateAction<string | null>>;
    lastUsedAgentId: string | null;
    setLastUsedAgentId: React.Dispatch<React.SetStateAction<string | null>>;
}

interface SidebarProps {
    activeView: ActiveView;
    onNavigate: (view: ActiveView) => void;
    isCollapsed: boolean;
    toggleSidebar: () => void;
    isAdmin: boolean;
    onNavigateToAdmin: () => void;
    onLogout: () => void;
    onOpenProfile: () => void;
    profilePicture: string | null;
}

export const initialContentData: ContentSection[] = [
    {
        id: 'recentes',
        title: 'Aulas Recentes',
        items: [
            { id: 'ui-ux', title: 'Fundamentos de UI/UX', imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOT二次wxfDB8MXxyYW5kb218fHx8fHx8fHwxNzE2NTY5OTM0fA&ixlib=rb-4.0.3&q=80&w=400', lessons: [{id: 1, title: 'Introdução', videoId: 'Jd8Y-L33GQI', description: 'Nesta primeira aula, vamos mergulhar nos conceitos essenciais de UI e UX.'}, {id: 2, title: 'Pesquisa', videoId: '1uxY1mr2C3A', description: 'Aprenda a realizar pesquisas eficazes com usuários para informar seu design.'}], description: 'Aprenda os princípios essenciais de User Interface e User Experience para criar produtos digitais que as pessoas amam usar.'},
            { id: 'react-avancado', title: 'React Avançado', imageUrl: 'https://images.unsplash.com/photo-1561883088-039e53143d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOT二次wxfDB8MXxyYW5kb218fHx8fHx8fHwxNzE2NTcwMDE3fA&ixlib=rb-4.0.3&q=80&w=400', lessons: [{id: 1, title: 'Hooks', videoId: 'N3AkSS5hXMA', description: 'Domine os React Hooks para um código mais limpo e funcional.'}, {id: 2, title: 'Context API', videoId: '5p_Stp3Sj0c', description: 'Gerencie o estado global da sua aplicação de forma eficiente com a Context API.'}]},
            { id: 'state-management', title: 'State Management', imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOT二次wxfDB8MXxyYW5kb218fHx8fHx8fHwxNzE2NTcwMDQ0fA&ixlib=rb-4.0.3&q=80&w=400', lessons: [{id: 1, title: 'Redux', videoId: 'N3AkSS5hXMA', description: 'Introdução ao Redux para gerenciamento de estado complexo.'}]},
            { id: 'design-systems', title: 'Design Systems', imageUrl: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOT二次wxfDB8MXxyYW5kb218fHx8fHx8fHwxNzE2NTcwMDY3fA&ixlib-rb-4.0.3&q=80&w=400', lessons: [{id: 1, title: 'Tokens', videoId: '1uxY1mr2C3A', description: 'O que são design tokens e como eles podem otimizar seu sistema de design.'}]},
            { id: 'css-animacoes', title: 'Animações com CSS', imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOT二次wxfDB8MXxyYW5kb218fHx8fHx8fHwxNzE2NTcwMDkxfA&ixlib-rb-4.0.3&q=80&w=400', lessons: [{id: 1, title: 'Transitions', videoId: 'Jd8Y-L33GQI', description: 'Crie animações suaves e elegantes usando apenas transições CSS.'}]},
            { id: 'apis', title: 'APIs e Integrações', imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOT二次wxfDB8MXxyYW5kb218fHx8fHx8fHwxNzE2NTcwMTE0fA&ixlib-rb-4.0.3&q=80&w=400', lessons: [{id: 1, title: 'REST vs GraphQL', videoId: '5p_Stp3Sj0c', description: 'Entenda as diferenças, vantagens e desvantagens entre REST e GraphQL.'}]},
        ]
    },
    {
        id: 'populares',
        title: 'Populares na Comunidade',
        items: [
            { id: 'typescript', title: 'Introdução ao TypeScript', imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOT二次wxfDB8MXxyYW5kb218fHx8fHx8fHwxNzE2NTcwMTM4fA&ixlib-rb-4.0.3&q=80&w=400', lessons: [{id: 1, title: 'Tipagem Básica', videoId: 'N3AkSS5hXMA', description: 'Comece com TypeScript aprendendo os tipos básicos.'}], description: 'Saia do JavaScript vanilla e entre no mundo da tipagem estática com TypeScript. Evite bugs e melhore a manutenibilidade do seu código.'},
            { id: 'nextjs', title: 'Next.js para experts', imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOT二次wxfDB8MXxyYW5kb218fHx8fHx8fHwxNzE2NTcwMTYwfA&ixlib-rb-4.0.3&q=80&w=400', lessons: [{id: 1, title: 'SSR e SSG', videoId: '1uxY1mr2C3A', description: 'Diferenças e casos de uso para Server-Side Rendering e Static Site Generation.'}]},
            { id: 'nodejs', title: 'Backend com Node.js', imageUrl: 'https://images.unsplash.com/photo-1632292220916-e9c38dd365bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOT二次wxfDB8MXxyYW5kb218fHx8fHx8fHwxNzE2NTcwMTgxfA&ixlib-rb-4.0.3&q=80&w=400', lessons: [{id: 1, title: 'Servidor Express', videoId: 'Jd8Y-L33GQI', description: 'Crie seu primeiro servidor backend com Node.js e Express.'}]},
            { id: 'deploy', title: 'Publicando seu App', imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOT二次wxfDB8MXxyYW5kb218fHx8fHx8fHwxNzE2NTcwMjAxfA&ixlib-rb-4.0.3&q=80&w=400', lessons: [{id: 1, title: 'Vercel', videoId: '5p_Stp3Sj0c', description: 'Faça o deploy da sua aplicação Next.js com facilidade na Vercel.'}]},
        ]
    }
];

const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate, isCollapsed, toggleSidebar, isAdmin, onNavigateToAdmin, onLogout, onOpenProfile, profilePicture }) => {
    const navItems = [
        { icon: <DashboardIcon />, name: 'Dashboard', id: 'dashboard' as ActiveView },
        { icon: <ContentIcon />, name: 'Conteúdo', id: 'conteudo' as ActiveView },
        { icon: <CommunityIcon />, name: 'Comunidade', id: 'comunidade' as ActiveView },
        { icon: <AgentIcon />, name: 'Agentes', id: 'agentes' as ActiveView },
    ];
    
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setIsProfileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <aside className={`bg-black/80 backdrop-blur-lg flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out ${isCollapsed ? 'w-24 p-4 items-center' : 'w-64 p-6'}`}>
            <button
                onClick={toggleSidebar}
                className="flex items-center justify-center w-full h-12 mb-10 rounded-lg hover:bg-neutral-800/50 transition-colors"
                aria-label={isCollapsed ? "Expandir menu" : "Recolher menu"}
            >
                {isCollapsed ? <RocketIcon /> : <h1 className="text-2xl font-bold text-white whitespace-nowrap">R4 Academy</h1>}
            </button>
            <nav className="flex flex-col gap-4 w-full">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        className={`flex items-center gap-4 py-3 rounded-lg text-neutral-300 hover:bg-orange-600 hover:text-white transition-colors duration-200 ${activeView === item.id ? 'bg-orange-600 text-white' : ''} ${isCollapsed ? 'justify-center' : 'px-4'}`}
                        title={isCollapsed ? item.name : undefined}
                    >
                        {item.icon}
                        {!isCollapsed && <span className="font-semibold">{item.name}</span>}
                    </button>
                ))}
                {isAdmin && (
                    <button
                        onClick={onNavigateToAdmin}
                        className={`flex items-center gap-4 py-3 rounded-lg text-neutral-300 hover:bg-orange-600 hover:text-white transition-colors duration-200 ${isCollapsed ? 'justify-center' : 'px-4'}`}
                        title={isCollapsed ? "Admin" : undefined}
                    >
                        <DashboardIcon />
                        {!isCollapsed && <span className="font-semibold">Admin</span>}
                    </button>
                )}
            </nav>
            <div className="mt-auto w-full relative" ref={profileMenuRef}>
                 <button 
                    id="user-menu-button"
                    onClick={() => setIsProfileMenuOpen(prev => !prev)}
                    className={`flex items-center gap-3 w-full rounded-lg text-left transition-colors hover:bg-neutral-800/60 ${isCollapsed ? 'justify-center p-2' : 'p-3 bg-neutral-800/50'}`}
                    aria-expanded={isProfileMenuOpen}
                    aria-haspopup="true"
                 >
                    <div className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                         {profilePicture ? (
                            <img src={profilePicture} alt="Foto de perfil" className="w-full h-full object-cover" />
                         ) : (
                            <UserIcon />
                         )}
                    </div>
                    {!isCollapsed && (
                        <div className="text-white overflow-hidden flex-1">
                            <p className="font-semibold truncate">{isAdmin ? 'Admin' : 'Nome do Usuário'}</p>
                            <p className="text-sm text-neutral-400">{isAdmin ? 'Administrador' : 'Ver Perfil'}</p>
                        </div>
                    )}
                </button>
                <ProfileMenu isOpen={isProfileMenuOpen} onLogout={onLogout} onOpenProfile={onOpenProfile} />
            </div>
        </aside>
    );
};

const ContentCard: React.FC<{ course: Course; onClick: () => void; isAdmin: boolean; onDelete: () => void; onEdit: () => void; }> = ({ course, onClick, isAdmin, onDelete, onEdit }) => (
    <div onClick={onClick} className="group relative aspect-[9/16] w-48 flex-shrink-0 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer">
        <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
            <h3 className="text-white font-bold text-lg">{course.title}</h3>
        </div>
        {isAdmin && (
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="p-2 bg-black/60 rounded-full text-white hover:bg-blue-500 transition-colors" title="Editar"><PencilIcon /></button>
                <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-2 bg-black/60 rounded-full text-white hover:bg-red-600 transition-colors" title="Excluir"><TrashIcon /></button>
            </div>
        )}
    </div>
);


const ContentRow: React.FC<{ 
    section: ContentSection; 
    onCardClick: (course: Course) => void; 
    isAdmin: boolean;
    onAddCard: (sectionId: string) => void;
    onDeleteCard: (sectionId: string, courseId: string) => void;
    onEditCard: (sectionId: string, courseId: string) => void;
}> = ({ section, onCardClick, isAdmin, onAddCard, onDeleteCard, onEditCard }) => (
    <section className="mb-12 animate-fade-in">
        <h2 className="text-2xl font-bold text-white mb-4 px-8">{section.title}</h2>
        <div className="flex overflow-x-auto space-x-6 py-4 px-8 scrollbar-thin scrollbar-thumb-orange-700 scrollbar-track-neutral-950">
            {section.items.map((item) => (
                <ContentCard 
                    key={item.id} 
                    course={item} 
                    onClick={() => onCardClick(item)} 
                    isAdmin={isAdmin} 
                    onDelete={() => onDeleteCard(section.id, item.id)} 
                    onEdit={() => onEditCard(section.id, item.id)} 
                />
            ))}
            {isAdmin && (
                <div 
                    onClick={() => onAddCard(section.id)}
                    className="group relative aspect-[9/16] w-48 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-900/80 border-2 border-dashed border-neutral-700 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 hover:bg-neutral-800 transition-all duration-300"
                >
                    <PlusIcon className="h-10 w-10 text-neutral-500 group-hover:text-orange-400 transition-colors" />
                    <span className="mt-2 font-semibold text-neutral-500 group-hover:text-orange-400 transition-colors">Adicionar Card</span>
                </div>
            )}
        </div>
    </section>
);

function extractYouTubeID(urlOrId: string): string | null {
    if (!urlOrId) return null;
    if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) {
        return urlOrId;
    }
    try {
        const url = new URL(urlOrId);
        if (url.hostname === 'youtu.be') {
            return url.pathname.slice(1).split('?')[0];
        }
        if (url.hostname.includes('youtube.com')) {
            const videoId = url.searchParams.get('v');
            if (videoId) return videoId;
        }
    } catch (e) {
        return null;
    }
    return null;
}

function markdownToHtml(text: string): string {
  if (!text) return '';
  // Convert markdown links to styled <a> tags
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  let html = text.replace(linkRegex, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-orange-400 hover:underline font-semibold">$1</a>');
  // Convert newlines to <br> tags for paragraphs
  html = html.replace(/\n/g, '<br />');
  return html;
}

const VideoLessonPage: React.FC<{ course: Course; onBack: () => void; isAdmin: boolean; onOpenAddLessonModal: () => void; onOpenEditLessonModal: (lessonId: number) => void; onDeleteLesson: (lessonId: number) => void; }> = ({ course, onBack, isAdmin, onOpenAddLessonModal, onOpenEditLessonModal, onDeleteLesson }) => {
    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(course.lessons[0] || null);
    
    useEffect(() => {
        if (!course.lessons.find(l => l.id === currentLesson?.id)) {
            setCurrentLesson(course.lessons[0] || null);
        }
    }, [course.lessons, currentLesson]);
    
    const videoId = currentLesson ? extractYouTubeID(currentLesson.videoId) : null;
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?origin=${window.location.origin}` : '';

    const currentLessonIndex = currentLesson ? course.lessons.findIndex(l => l.id === currentLesson.id) : -1;
    const isLastLesson = currentLessonIndex === -1 || currentLessonIndex === course.lessons.length - 1;

    const handleNextLesson = () => {
        if (currentLessonIndex !== -1 && !isLastLesson) {
            setCurrentLesson(course.lessons[currentLessonIndex + 1]);
        }
    };

    return (
        <div className="animate-fade-in h-full flex flex-col">
            <div className="p-8">
                <button onClick={onBack} className="flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold">
                    <ArrowLeftIcon />
                    Voltar para Conteúdo
                </button>
            </div>
            
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 px-8 pb-8 overflow-hidden">
                <div className="lg:col-span-2 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-950 pr-4">
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-2xl shadow-black/50 bg-black">
                        {videoId ? (
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src={embedUrl}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-neutral-800">
                                <p className="text-neutral-400">
                                    {course.lessons.length > 0 ? "Vídeo indisponível ou link inválido." : "Nenhuma aula adicionada a este curso."}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="mt-6">
                        <span className="text-orange-400 font-semibold text-sm">Módulo 1</span>
                        <h1 className="text-3xl lg:text-4xl font-bold text-white mt-1">{course.title}</h1>
                        <p className="text-lg text-neutral-300 mt-2">
                           {currentLesson ? `Aula ${course.lessons.findIndex(l => l.id === currentLesson.id) + 1}: ${currentLesson.title}` : 'Selecione uma aula'}
                        </p>
                    </div>

                    <div className="mt-8 py-6 border-y border-neutral-800/70">
                         <div className="flex items-center gap-4">
                            <button 
                                onClick={handleNextLesson}
                                disabled={isLastLesson}
                                className="px-6 py-2 bg-orange-600 text-white font-semibold rounded-full hover:bg-orange-500 transition-colors disabled:bg-neutral-700 disabled:cursor-not-allowed disabled:text-neutral-400"
                            >
                                Próxima Aula
                            </button>
                         </div>
                    </div>
                    <div className="mt-6 text-neutral-300 space-y-4">
                        <h2 className="text-2xl font-bold text-white mb-4">Sobre esta aula</h2>
                        <p 
                            className="leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: markdownToHtml(currentLesson?.description || 'Descrição da aula não disponível.') }}
                        />
                    </div>
                </div>

                <div className="bg-neutral-900/70 p-6 rounded-xl flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-orange-700 scrollbar-track-neutral-800">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-bold text-white">Aulas do Módulo</h2>
                        {isAdmin && (
                            <button onClick={onOpenAddLessonModal} title="Adicionar nova aula" className="p-2 text-orange-400 rounded-full hover:bg-orange-600/20 hover:text-orange-300 transition-colors">
                                <PlusIcon className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                    <p className="text-sm text-neutral-400 mb-6">{course.lessons.length} aulas • 2h 30m no total</p>
                    <ul className="space-y-3">
                        {course.lessons.map((lesson, index) => {
                            const isActive = lesson.id === currentLesson?.id;
                            return (
                                 <li 
                                    key={lesson.id} 
                                    onClick={() => setCurrentLesson(lesson)}
                                    className={`group flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all duration-200 ${isActive ? 'bg-orange-600/20 ring-2 ring-orange-500' : 'hover:bg-neutral-800/50'}`}
                                 >
                                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${isActive ? 'bg-orange-500 text-white' : 'bg-neutral-700 text-neutral-300'}`}>
                                        {isActive ? <PlayIcon className="h-3 w-3 text-white" /> : index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-semibold ${isActive ? 'text-orange-200' : 'text-white'}`}>
                                            Aula {index + 1}: {lesson.title}
                                        </h3>
                                    </div>
                                    {isAdmin && (
                                        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); onOpenEditLessonModal(lesson.id); }} 
                                                className="p-1 text-neutral-400 rounded-full hover:bg-neutral-700 hover:text-white"
                                                title="Editar aula"
                                            >
                                                <PencilIcon />
                                            </button>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); onDeleteLesson(lesson.id); }} 
                                                className="p-1 text-neutral-400 rounded-full hover:bg-neutral-700 hover:text-red-500"
                                                title="Excluir aula"
                                            >
                                                <TrashIcon />
                                            </button>
                                        </div>
                                    )}
                                 </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};


const PlatformPage: React.FC<PlatformPageProps> = ({ isAdmin, onNavigateToAdmin, onLogout, contentData, setContentData, profilePicture, setProfilePicture, lastViewedCourseId, setLastViewedCourseId, lastUsedAgentId, setLastUsedAgentId }) => {
    const [activeView, setActiveView] = useState<ActiveView>('dashboard');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [activeAgentWorkspace, setActiveAgentWorkspace] = useState<Agent | null>(null);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState<{isOpen: boolean, type: 'method' | 'card' | 'lesson', sectionId?: string, courseId?: string, lessonId?: number, mode?: 'add' | 'edit'}>({isOpen: false, type: 'card', mode: 'add'});
    const [deleteConfirm, setDeleteConfirm] = useState<{isOpen: boolean, sectionId?: string, courseId?: string, lessonId?: number, type: 'card' | 'lesson' | null}>({isOpen: false, type: null});

    const agents: Agent[] = [
        { id: 'chat', name: 'Chat', description: 'Converse com uma IA para tirar dúvidas.', icon: <ChatIcon />, longDescription: 'Inicie uma conversa com um assistente de IA avançado. Perfeito para brainstorming, redação de código, tradução de textos, ou simplesmente para obter respostas rápidas para perguntas complexas. Otimizado para diálogos naturais e contextuais.' },
        { id: 'image-analyzer', name: 'Analisador de Imagem', description: 'Envie uma imagem e receba uma análise.', icon: <ImageIcon />, longDescription: 'Extraia informações valiosas de imagens. Este agente pode descrever conteúdos, identificar objetos, reconhecer marcos, ler textos e até mesmo detectar emoções. Ideal para análise de mídia e acessibilidade.' },
        { id: 'prompt-generator', name: 'Gerador de Prompt', description: 'Crie prompts eficazes para qualquer modelo.', icon: <SparklesIcon />, longDescription: 'Supere o bloqueio criativo e maximize o potencial dos modelos de IA. Descreva seu objetivo e este agente irá gerar prompts detalhados e estruturados para garantir os melhores resultados possíveis em qualquer tarefa.' },
        { id: 'image-generator', name: 'Gerador de Imagem', description: 'Transforme suas ideias em imagens.', icon: <BrushIcon />, longDescription: 'Dê vida à sua imaginação. Descreva uma cena, um personagem ou um conceito abstrato, e este agente criará imagens impressionantes e únicas, desde fotorrealismo a estilos artísticos variados.' },
        { id: 'watermark-remover', name: 'Removedor de Marca d\'água', description: 'Limpe suas imagens com precisão.', icon: <CleanIcon />, longDescription: 'Remova marcas d\'água, logotipos ou outros objetos indesejados de suas imagens de forma inteligente. A IA analisa o entorno e preenche o espaço de forma natural, preservando a qualidade da imagem original.' },
    ];
    
    const [selectedAgent, setSelectedAgent] = useState<Agent>(agents[0]);

    const handleAddMethod = (title: string) => {
        const newMethod: ContentSection = {
            id: `method-${Date.now()}`,
            title,
            items: []
        };
        setContentData(prev => [...prev, newMethod]);
        setModalConfig({isOpen: false, type: 'card'});
    };

    const handleAddCard = (sectionId: string, card: {title: string, imageUrl: string, description: string}) => {
        const newCard: Course = {
            ...card,
            id: `card-${Date.now()}`,
            lessons: []
        }
        setContentData(prev => prev.map(section => 
            section.id === sectionId ? {...section, items: [newCard, ...section.items]} : section
        ));
        setModalConfig({isOpen: false, type: 'card'});
    };

    const handleEditCard = (sectionId: string, courseId: string, cardUpdates: { title: string, imageUrl: string, description: string }) => {
        setContentData(prev => prev.map(section => {
            if (section.id !== sectionId) return section;
            return {
                ...section,
                items: section.items.map(item => 
                    item.id === courseId ? { ...item, ...cardUpdates } : item
                )
            };
        }));
        setModalConfig({ isOpen: false, type: 'card' });
    };

    const handleDeleteCard = (sectionId: string, courseId: string) => {
        setDeleteConfirm({ isOpen: true, type: 'card', sectionId, courseId });
    }

    const handleAddLesson = (courseId: string, lessonDetails: { title: string, videoId: string, description: string }) => {
        const newLesson: Lesson = {
            id: Date.now(),
            ...lessonDetails,
        };
    
        let updatedCourse: Course | null = null;
    
        const newContentData = contentData.map(section => ({
            ...section,
            items: section.items.map(course => {
                if (course.id === courseId) {
                    const newCourseData = { ...course, lessons: [...course.lessons, newLesson] };
                    updatedCourse = newCourseData;
                    return newCourseData;
                }
                return course;
            })
        }));
    
        setContentData(newContentData);
        if (updatedCourse) {
            setSelectedCourse(updatedCourse);
        }
        setModalConfig({ isOpen: false, type: 'lesson' });
    };

    const handleEditLesson = (courseId: string, lessonId: number, updatedDetails: { title: string; videoId: string; description: string }) => {
        let updatedCourse: Course | null = null;

        const newContentData = contentData.map(section => ({
            ...section,
            items: section.items.map(course => {
                if (course.id === courseId) {
                    const updatedLessons = course.lessons.map(lesson => 
                        lesson.id === lessonId ? { ...lesson, ...updatedDetails } : lesson
                    );
                    const newCourseData = { ...course, lessons: updatedLessons };
                    updatedCourse = newCourseData;
                    return newCourseData;
                }
                return course;
            })
        }));

        setContentData(newContentData);
        if (updatedCourse) {
            setSelectedCourse(updatedCourse);
        }
        setModalConfig({ isOpen: false, type: 'lesson' });
    };

    const handleDeleteLesson = (courseId: string, lessonId: number) => {
        setDeleteConfirm({ isOpen: true, type: 'lesson', courseId, lessonId });
    };

    const confirmDeletion = () => {
        if (!deleteConfirm.type) return;

        if (deleteConfirm.type === 'card' && deleteConfirm.sectionId && deleteConfirm.courseId) {
            const { sectionId, courseId } = deleteConfirm;
            setContentData(prev => prev.map(section => 
                section.id === sectionId ? {...section, items: section.items.filter(item => item.id !== courseId)} : section
            ));
        } else if (deleteConfirm.type === 'lesson' && deleteConfirm.courseId && deleteConfirm.lessonId) {
            const { courseId, lessonId } = deleteConfirm;
            let updatedCourse: Course | null = null;
            const newContentData = contentData.map(section => ({
                ...section,
                items: section.items.map(course => {
                    if (course.id === courseId) {
                        const updatedLessons = course.lessons.filter(lesson => lesson.id !== lessonId);
                        const newCourseData = { ...course, lessons: updatedLessons };
                        updatedCourse = newCourseData;
                        return newCourseData;
                    }
                    return course;
                })
            }));
            setContentData(newContentData);
            if (updatedCourse) {
                setSelectedCourse(updatedCourse);
            }
        }
        
        setDeleteConfirm({isOpen: false, type: null});
    };
    
    const handleCardClick = (course: Course) => {
        setSelectedCourse(course);
        setActiveAgentWorkspace(null); 
        setLastViewedCourseId(course.id);
    }
    
    const handleBackToContent = () => {
        setSelectedCourse(null);
    }

    const handleBackToAgents = () => {
        setActiveAgentWorkspace(null);
    }
    
    const handleNavigate = (view: ActiveView, entityId?: string) => {
        setActiveView(view);
    
        // Reset sub-views first, unless we're about to set one.
        if (!entityId) {
          setSelectedCourse(null);
          setActiveAgentWorkspace(null);
        }
    
        if (entityId) {
            if (view === 'agentes') {
                const agent = agents.find(a => a.id === entityId);
                if (agent) {
                    setActiveAgentWorkspace(agent);
                    setLastUsedAgentId(agent.id);
                    setSelectedCourse(null); // Ensure content is closed
                }
            } else if (view === 'conteudo') {
                const courseToOpen = contentData.flatMap(s => s.items).find(c => c.id === entityId);
                if (courseToOpen) {
                    handleCardClick(courseToOpen);
                }
            }
        }
    };
    
    const lastViewedCourse = useMemo(() => {
        if (!lastViewedCourseId) return null;
        return contentData.flatMap(s => s.items).find(item => item.id === lastViewedCourseId);
    }, [lastViewedCourseId, contentData]);

    const lastUsedAgent = useMemo(() => {
        if (!lastUsedAgentId) return null;
        return agents.find(agent => agent.id === lastUsedAgentId);
    }, [lastUsedAgentId, agents]);

    const defaultCourseForDashboard = contentData[0]?.items[0];

    const AddContentModal: React.FC = () => {
        const isEditMode = modalConfig.mode === 'edit';

        const cardToEdit = useMemo(() => {
            if (isEditMode && modalConfig.sectionId && modalConfig.courseId) {
                const section = contentData.find(s => s.id === modalConfig.sectionId);
                return section?.items.find(c => c.id === modalConfig.courseId);
            }
            return null;
        }, [isEditMode, modalConfig.sectionId, modalConfig.courseId, contentData]);

        const [title, setTitle] = useState('');
        const [description, setDescription] = useState('');
        const [imagePreview, setImagePreview] = useState<string | null>(null);
        const [fileName, setFileName] = useState<string>('');
        
        useEffect(() => {
            if (isEditMode && cardToEdit) {
                setTitle(cardToEdit.title);
                setDescription(cardToEdit.description || '');
                setImagePreview(cardToEdit.imageUrl);
                setFileName(''); 
            } else {
                setTitle('');
                setDescription('');
                setImagePreview(null);
                setFileName('');
            }
        }, [isEditMode, cardToEdit]);

        const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                setFileName(file.name);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result as string);
                };
                reader.readAsDataURL(file);
            }
        };

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            
            if (modalConfig.type === 'method') {
                if(title) handleAddMethod(title);
                return;
            }

            if (!title || !imagePreview) {
                alert("Título e imagem são obrigatórios.");
                return;
            }

            if (isEditMode && modalConfig.sectionId && modalConfig.courseId) {
                handleEditCard(modalConfig.sectionId, modalConfig.courseId, { title, imageUrl: imagePreview, description });
            } else if (modalConfig.type === 'card' && modalConfig.sectionId) {
                handleAddCard(modalConfig.sectionId, {title, imageUrl: imagePreview, description});
            }
        }
        
        const modalTitle = isEditMode
            ? 'Editar Card'
            : modalConfig.type === 'method'
            ? 'Adicionar Novo Método'
            : 'Adicionar Novo Card';
        
        const submitButtonText = isEditMode
            ? 'Salvar Alterações'
            : 'Adicionar';

        return (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" onClick={() => setModalConfig({isOpen: false, type: 'card'})}>
                <div className="bg-neutral-900 rounded-xl shadow-2xl p-8 max-w-md w-full border border-neutral-800/50 animate-scale-in-up" onClick={e => e.stopPropagation()}>
                    <h3 className="text-2xl font-bold text-white mb-6">{modalTitle}</h3>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input value={title} onChange={(e) => setTitle(e.target.value)} name="title" type="text" placeholder="Título" required className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500"/>
                        {modalConfig.type === 'card' && <>
                            <label htmlFor="image-upload" className="w-full h-40 relative bg-neutral-800 border-2 border-dashed border-neutral-700 rounded-lg flex flex-col items-center justify-center text-neutral-500 hover:border-orange-500 hover:bg-neutral-700/50 transition-colors cursor-pointer overflow-hidden">
                                <input id="image-upload" name="imageFile" type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleImageChange} />
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-center">
                                        <ImageIcon />
                                        <p className="mt-2 font-semibold">Enviar Imagem</p>
                                        <p className="text-xs mt-1">Clique para selecionar</p>
                                    </div>
                                )}
                            </label>
                            {fileName && <p className="text-sm text-neutral-400 -mt-2 truncate">Arquivo: {fileName}</p>}
                            
                            <textarea value={description} onChange={e => setDescription(e.target.value)} name="description" placeholder="Descrição" className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none h-24"/>
                        </>}
                        <div className="mt-4 flex justify-end gap-4">
                            <button type="button" onClick={() => setModalConfig({isOpen: false, type: 'card'})} className="px-6 py-2 bg-neutral-700 font-semibold rounded-lg hover:bg-neutral-600 transition-colors">Cancelar</button>
                            <button type="submit" className="px-6 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-500 transition-colors">{submitButtonText}</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    const LessonModal: React.FC = () => {
        const isEditMode = modalConfig.mode === 'edit';
        const [title, setTitle] = useState('');
        const [videoId, setVideoId] = useState('');
        const [description, setDescription] = useState('');

        useEffect(() => {
            if (isEditMode && modalConfig.courseId && modalConfig.lessonId) {
                const course = contentData.flatMap(s => s.items).find(c => c.id === modalConfig.courseId);
                const lesson = course?.lessons.find(l => l.id === modalConfig.lessonId);
                if (lesson) {
                    setTitle(lesson.title);
                    setVideoId(lesson.videoId);
                    setDescription(lesson.description);
                }
            } else {
                setTitle('');
                setVideoId('');
                setDescription('');
            }
        }, [modalConfig]);
        
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            if (title && videoId && description && modalConfig.courseId) {
                 if(isEditMode && modalConfig.lessonId) {
                    handleEditLesson(modalConfig.courseId, modalConfig.lessonId, { title, videoId, description });
                 } else {
                    handleAddLesson(modalConfig.courseId, { title, videoId, description });
                 }
            }
        }
    
        return (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" onClick={() => setModalConfig({isOpen: false, type: 'lesson'})}>
                <div className="bg-neutral-900 rounded-xl shadow-2xl p-8 max-w-md w-full border border-neutral-800/50 animate-scale-in-up" onClick={e => e.stopPropagation()}>
                    <h3 className="text-2xl font-bold text-white mb-6">{isEditMode ? 'Editar Aula' : 'Adicionar Nova Aula'}</h3>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input value={title} onChange={e => setTitle(e.target.value)} name="title" type="text" placeholder="Título da Aula" required className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500"/>
                        <input value={videoId} onChange={e => setVideoId(e.target.value)} name="videoId" type="text" placeholder="Link ou ID do Vídeo do YouTube" required className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500"/>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} name="description" placeholder="Descrição da aula" required className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none h-24"/>
                        <div className="mt-4 flex justify-end gap-4">
                            <button type="button" onClick={() => setModalConfig({isOpen: false, type: 'lesson'})} className="px-6 py-2 bg-neutral-700 font-semibold rounded-lg hover:bg-neutral-600 transition-colors">Cancelar</button>
                            <button type="submit" className="px-6 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-500 transition-colors">{isEditMode ? 'Salvar Alterações' : 'Adicionar'}</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    const ConfirmationModal: React.FC = () => {
        if (!deleteConfirm.isOpen) return null;

        const messages = {
            card: { title: 'Excluir Card', text: 'Tem certeza que deseja excluir este card? Todo o conteúdo e aulas associadas serão removidos permanentemente.'},
            lesson: { title: 'Excluir Aula', text: 'Tem certeza que deseja excluir esta aula? Esta ação não pode ser desfeita.'}
        }
        const config = messages[deleteConfirm.type!];

        return (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
                <div className="bg-neutral-900 rounded-xl shadow-2xl p-8 max-w-md w-full border border-neutral-800/50 animate-scale-in-up">
                    <h3 className="text-2xl font-bold text-white">{config.title}</h3>
                    <p className="text-neutral-300 mt-4">{config.text}</p>
                    <div className="mt-8 flex justify-end gap-4">
                        <button onClick={() => setDeleteConfirm({isOpen: false, type: null})} className="px-6 py-2 bg-neutral-700 font-semibold rounded-lg hover:bg-neutral-600 transition-colors">Cancelar</button>
                        <button onClick={confirmDeletion} className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">Excluir</button>
                    </div>
                </div>
            </div>
        );
    }

    const renderMainContent = () => {
        if (activeAgentWorkspace) {
            return <AgentWorkspace agent={activeAgentWorkspace} onBack={handleBackToAgents} />;
        }
        if (selectedCourse) {
            return <VideoLessonPage 
                course={selectedCourse} 
                onBack={handleBackToContent} 
                isAdmin={isAdmin}
                onOpenAddLessonModal={() => setModalConfig({ isOpen: true, type: 'lesson', courseId: selectedCourse.id, mode: 'add' })}
                onOpenEditLessonModal={(lessonId) => setModalConfig({ isOpen: true, type: 'lesson', courseId: selectedCourse.id, lessonId, mode: 'edit' })}
                onDeleteLesson={(lessonId) => handleDeleteLesson(selectedCourse.id, lessonId)}
            />;
        }
        
        switch (activeView) {
            case 'dashboard':
                return <DashboardView 
                            isAdmin={isAdmin} 
                            onNavigate={handleNavigate} 
                            lastViewedCourse={lastViewedCourse} 
                            defaultCourse={defaultCourseForDashboard}
                            lastUsedAgent={lastUsedAgent}
                        />;
            case 'conteudo':
                return (
                    <div className="flex-1 pt-8 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-700 scrollbar-track-neutral-950">
                        {isAdmin && (
                            <div className="px-8 mb-6 flex justify-end">
                                <button onClick={() => setModalConfig({isOpen: true, type: 'method', mode: 'add'})} className="flex items-center gap-2 px-5 py-2 bg-orange-600 text-white font-semibold rounded-full hover:bg-orange-500 transition-colors">
                                    <PlusIcon /> Adicionar Método
                                </button>
                            </div>
                        )}
                        {contentData.map(section => (
                            <ContentRow 
                                key={section.id} 
                                section={section} 
                                onCardClick={handleCardClick} 
                                isAdmin={isAdmin}
                                onAddCard={(sectionId) => setModalConfig({isOpen: true, type: 'card', sectionId, mode: 'add'})}
                                onDeleteCard={handleDeleteCard}
                                onEditCard={(sectionId, courseId) => setModalConfig({isOpen: true, type: 'card', sectionId, courseId, mode: 'edit'})}
                            />
                        ))}
                    </div>
                );
            case 'comunidade':
                return (
                    <div className="p-8 flex flex-col items-center justify-center text-center h-full animate-fade-in">
                       <div className="bg-neutral-900/80 p-10 rounded-2xl border border-neutral-800/50 max-w-2xl flex flex-col items-center">
                            <div className="mb-6 text-orange-400">
                                <DiscordIcon />
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-4">Junte-se à nossa Comunidade</h2>
                            <p className="text-neutral-300 text-lg mb-8 max-w-lg">
                                Participe de discussões, tire dúvidas, compartilhe seus projetos e conecte-se com outros desenvolvedores e criativos em nosso servidor exclusivo do Discord.
                            </p>
                            <a 
                                href="#" 
                                onClick={(e) => e.preventDefault()}
                                className="px-10 py-4 text-lg font-bold text-white bg-orange-600 rounded-full shadow-2xl shadow-orange-600/40 transform transition-all duration-300 hover:bg-orange-500 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300"
                            >
                                Entrar no Discord
                            </a>
                        </div>
                    </div>
                );
            case 'agentes':
                return (
                    <div className="p-8 animate-fade-in h-full flex flex-col">
                       <h2 className="text-4xl font-bold text-white mb-2">Agentes IA</h2>
                       <p className="text-neutral-400 text-lg mb-8">Ferramentas inteligentes para potencializar seu trabalho.</p>
                       
                       <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8">
                           {/* Agent List */}
                           <div className="md:col-span-1 flex flex-col gap-4">
                               {agents.map((agent) => (
                                   <button 
                                       key={agent.id}
                                       onClick={() => setSelectedAgent(agent)}
                                       className={`p-4 rounded-lg border-2 transition-all duration-300 text-left flex items-center gap-4 ${selectedAgent.id === agent.id ? 'bg-orange-600/20 border-orange-500' : 'bg-neutral-900/80 border-neutral-800/50 hover:bg-neutral-800/70 hover:border-neutral-700'}`}
                                   >
                                       <div className={`flex-shrink-0 w-10 h-10 rounded-md flex items-center justify-center ${selectedAgent.id === agent.id ? 'bg-orange-500/20 text-orange-400' : 'bg-neutral-800 text-neutral-300'}`}>
                                           {agent.icon}
                                       </div>
                                       <div>
                                           <h3 className="font-bold text-white">{agent.name}</h3>
                                           <p className="text-sm text-neutral-400">{agent.description}</p>
                                       </div>
                                   </button>
                               ))}
                           </div>

                           {/* Agent Detail View */}
                           <div className="md:col-span-2 bg-neutral-900/80 rounded-xl border border-neutral-800/50 flex flex-col p-8 animate-fade-in">
                               {selectedAgent && (
                                   <div className="flex flex-col h-full">
                                       <div className="flex items-center gap-4 mb-6">
                                           <div className="w-16 h-16 bg-orange-600/20 text-orange-400 rounded-xl flex items-center justify-center flex-shrink-0">
                                               {React.cloneElement(selectedAgent.icon as React.ReactElement, { className: "h-8 w-8" })}
                                           </div>
                                           <div>
                                               <h3 className="text-3xl font-bold text-white">{selectedAgent.name}</h3>
                                               <p className="text-orange-400 font-semibold">Função do Agente</p>
                                           </div>
                                       </div>
                                       <p className="text-neutral-300 text-lg leading-relaxed flex-1">
                                           {selectedAgent.longDescription}
                                       </p>
                                       <button 
                                            onClick={() => {
                                                setActiveAgentWorkspace(selectedAgent);
                                                setLastUsedAgentId(selectedAgent.id);
                                           }}
                                            className="mt-8 w-full py-4 text-lg font-bold text-white bg-orange-600 rounded-lg shadow-lg shadow-orange-600/30 transform transition-all duration-300 hover:bg-orange-500 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300">
                                           Começar a Usar
                                       </button>
                                   </div>
                               )}
                           </div>
                       </div>
                   </div>
                );
            default:
                return null;
        }
    }

    return (
        <div className="flex h-screen w-full bg-black text-white animate-fade-in overflow-hidden">
            <Sidebar 
                activeView={activeView} 
                onNavigate={handleNavigate} 
                isCollapsed={isSidebarCollapsed}
                toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                isAdmin={isAdmin}
                onNavigateToAdmin={onNavigateToAdmin}
                onLogout={onLogout}
                onOpenProfile={() => setIsProfileModalOpen(true)}
                profilePicture={profilePicture}
            />

            <main className="flex-1 flex flex-col overflow-y-auto bg-neutral-950">
                {renderMainContent()}
            </main>

            {isProfileModalOpen && (
                <ProfileModal 
                    isOpen={isProfileModalOpen} 
                    onClose={() => setIsProfileModalOpen(false)}
                    isAdmin={isAdmin}
                    profilePicture={profilePicture}
                    setProfilePicture={setProfilePicture}
                />
            )}
            
            {modalConfig.isOpen && (modalConfig.type === 'card' || modalConfig.type === 'method') && <AddContentModal />}
            {modalConfig.isOpen && modalConfig.type === 'lesson' && <LessonModal />}
            {deleteConfirm.isOpen && <ConfirmationModal />}

            <style>{`
                @keyframes fade-in {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
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
                .animate-scale-in-up { 
                    animation: scale-in-up 0.2s ease-out forwards;
                }
                .animate-fade-in { animation: fade-in 0.6s ease-in forwards; }
                .scrollbar-thin {
                    scrollbar-width: thin;
                    scrollbar-color: #D97706 #171717;
                }
                .scrollbar-thin::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                .scrollbar-thin::-webkit-scrollbar-track {
                    background: #0a0a0a;
                    border-radius: 4px;
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

export default PlatformPage;