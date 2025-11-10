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
import { MenuIcon } from './icons/MenuIcon';
import { CloseIcon } from './icons/CloseIcon';
import { PencilIcon } from './icons/PencilIcon';
import { PlusIcon } from './icons/PlusIcon';
import PremiumModal from './PremiumModal';

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
    isFree?: boolean;
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
    isLoggedIn: boolean;
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
    isLoggedIn: boolean;
    isAdmin: boolean;
    onNavigateToAdmin: () => void;
    onLogout: () => void;
    onOpenProfile: () => void;
    profilePicture: string | null;
    onClose?: () => void; // For mobile
}

export const initialContentData: ContentSection[] = [
    {
        id: 'recentes',
        title: 'Aulas Recentes',
        items: [
            { id: 'ui-ux', title: 'Fundamentos de UI/UX', imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOT二次wxfDB8MXxyYW5kb218fHx8fHx8fHwxNzE2NTY5OTM0fA&ixlib=rb-4.0.3&q=80&w=400', lessons: [{id: 1, title: 'Introdução', videoId: 'Jd8Y-L33GQI', description: 'Nesta primeira aula, vamos mergulhar nos conceitos essenciais de UI e UX.'}, {id: 2, title: 'Pesquisa', videoId: '1uxY1mr2C3A', description: 'Aprenda a realizar pesquisas eficazes com usuários para informar seu design.'}], description: 'Aprenda os princípios essenciais de User Interface e User Experience para criar produtos digitais que as pessoas amam usar.', isFree: true },
            { id: 'react-avancado', title: 'React Avançado', imageUrl: 'https://images.unsplash.com/photo-1561883088-039e53143d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOT二次wxfDB8MXxyYW5kb218fHx8fHx8fHwxNzE2NTcwMDE3fA&ixlib=rb-4.0.3&q=80&w=400', lessons: [{id: 1, title: 'Hooks', videoId: 'N3AkSS5hXMA', description: 'Domine os React Hooks para um código mais limpo e funcional.'}, {id: 2, title: 'Context API', videoId: '5p_Stp3Sj0c', description: 'Gerencie o estado global da sua aplicação de forma eficiente com a Context API.'}]},
            { id: 'state-management', title: 'State Management', imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOT二次wxfDB8MXxyYW5kb218fHx8fHx8fHwxNzE2NTcwMDQ0fA&ixlib=rb-4.0.3&q=80&w=400', lessons: [{id: 1, title: 'Redux', videoId: 'N3AkSS5hXMA', description: 'Introdução ao Redux para gerenciamento de estado complexo.'}]},
            { id: 'design-systems', title: 'Design Systems', imageUrl: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOT二次wxfDB8MXxyYW5kb218fHx8fHx8fHwxNzE2NTcwMDY3fA&ixlib=rb-4.0.3&q=80&w=400', lessons: [{id: 1, title: 'Tokens', videoId: '1uxY1mr2C3A', description: 'O que são design tokens e como eles podem otimizar seu sistema de design.'}]},
            { id: 'css-animacoes', title: 'Animações com CSS', imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOT二次wxfDB8MXxyYW5kb218fHx8fHx8fHwxNzE2NTcwMDkxfA&ixlib=rb-4.0.3&q=80&w=400', lessons: [{id: 1, title: 'Transitions', videoId: 'Jd8Y-L33GQI', description: 'Crie animações suaves e elegantes usando apenas transições CSS.'}]},
            { id: 'apis', title: 'APIs e Integrações', imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOT二次wxfDB8MXxyYW5kb218fHx8fHx8fHwxNzE2NTcwMTE0fA&ixlib=rb-4.0.3&q=80&w=400', lessons: [{id: 1, title: 'REST vs GraphQL', videoId: '5p_Stp3Sj0c', description: 'Entenda as diferenças, vantagens e desvantagens entre REST e GraphQL.'}]},
        ]
    },
    {
        id: 'populares',
        title: 'Populares na Comunidade',
        items: [
            { id: 'typescript', title: 'Introdução ao TypeScript', imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOT二次wxfDB8MXxyYW5kb218fHx8fHx8fHwxNzE2NTcwMTM4fA&ixlib=rb-4.0.3&q=80&w=400', lessons: [{id: 1, title: 'Tipagem Básica', videoId: 'N3AkSS5hXMA', description: 'Comece com TypeScript aprendendo os tipos básicos.'}], description: 'Saia do JavaScript vanilla e entre no mundo da tipagem estática com TypeScript. Evite bugs e melhore a manutenibilidade do seu código.'},
            { id: 'nextjs', title: 'Next.js para experts', imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOT二次wxfDB8MXxyYW5kb218fHx8fHx8fHwxNzE2NTcwMTYwfA&ixlib-rb-4.0.3&q=80&w=400', lessons: [{id: 1, title: 'SSR e SSG', videoId: '1uxY1mr2C3A', description: 'Diferenças e casos de uso para Server-Side Rendering e Static Site Generation.'}]},
            { id: 'nodejs', title: 'Backend com Node.js', imageUrl: 'https://images.unsplash.com/photo-1632292220916-e9c38dd365bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOT二次wxfDB8MXxyYW5kb218fHx8fHx8fHwxNzE2NTcwMTgxfA&ixlib-rb-4.0.3&q=80&w=400', lessons: [{id: 1, title: 'Servidor Express', videoId: 'Jd8Y-L33GQI', description: 'Crie seu primeiro servidor backend com Node.js e Express.'}]},
            { id: 'deploy', title: 'Publicando seu App', imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOT二次wxfDB8MXxyYW5kb218fHx8fHx8fHwxNzE2NTcwMjAxfA&ixlib-rb-4.0.3&q=80&w=400', lessons: [{id: 1, title: 'Vercel', videoId: '5p_Stp3Sj0c', description: 'Faça o deploy da sua aplicação Next.js com facilidade na Vercel.'}]},
        ]
    }
];

const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate, isCollapsed, toggleSidebar, isLoggedIn, isAdmin, onNavigateToAdmin, onLogout, onOpenProfile, profilePicture, onClose }) => {
    const navItems = [
        { icon: <DashboardIcon />, name: 'Dashboard', id: 'dashboard' as ActiveView },
        { icon: <ContentIcon />, name: 'Conteúdo', id: 'conteudo' as ActiveView },
        { icon: <CommunityIcon />, name: 'Comunidade', id: 'comunidade' as ActiveView },
        { icon: <AgentIcon />, name: 'Agentes', id: 'agentes' as ActiveView },
    ];
    
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef<HTMLDivElement>(null);

    const handleNavItemClick = (viewId: ActiveView) => {
        onNavigate(viewId);
    };

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
        <aside className={`bg-black/80 backdrop-blur-lg flex-shrink-0 flex flex-col h-full transition-all duration-300 ease-in-out ${isCollapsed ? 'w-24 p-4 items-center' : 'w-64 p-6'}`}>
            <div className={`flex items-center mb-10 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                 <button
                    onClick={toggleSidebar}
                    className="flex items-center justify-center h-12 rounded-lg hover:bg-neutral-800/50 transition-colors flex-grow"
                    aria-label={isCollapsed ? "Expandir menu" : "Recolher menu"}
                >
                    {isCollapsed ? <RocketIcon /> : <h1 className="text-2xl font-bold text-white whitespace-nowrap">R4 Academy</h1>}
                </button>
                {onClose && (
                    <button onClick={onClose} className={`p-2 -mr-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-700/50 ${isCollapsed ? 'hidden' : ''}`}>
                        <CloseIcon />
                    </button>
                )}
            </div>
            <nav className="flex flex-col gap-4 w-full">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleNavItemClick(item.id)}
                        className={`flex items-center gap-4 py-3 rounded-lg text-neutral-300 hover:bg-orange-600 hover:text-white transition-colors duration-200 ${activeView === item.id ? 'bg-orange-600 text-white' : ''} ${isCollapsed ? 'justify-center' : 'px-4'}`}
                        title={isCollapsed ? item.name : undefined}
                    >
                        {item.icon}
                        {!isCollapsed && <span className="font-semibold">{item.name}</span>}
                    </button>
                ))}
                {isLoggedIn && isAdmin && (
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
                 {isLoggedIn && (
                    <>
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
                    </>
                 )}
            </div>
        </aside>
    );
};

const ContentCard: React.FC<{ course: Course; onClick: () => void; }> = ({ course, onClick }) => (
    <div onClick={onClick} className="group relative aspect-[9/16] w-48 flex-shrink-0 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer">
        <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover pointer-events-none" />
        {course.isFree && (
            <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg z-10">
                GRATUITO
            </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
            <h3 className="text-white font-bold text-lg">{course.title}</h3>
        </div>
    </div>
);


const ContentRow: React.FC<{ 
    section: ContentSection; 
    onCardClick: (course: Course) => void; 
}> = ({ section, onCardClick }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const hasDragged = useRef(false);

    useEffect(() => {
        const el = scrollContainerRef.current;
        if (!el) return;

        const startDrag = (pageX: number) => {
            isDown.current = true;
            hasDragged.current = false;
            el.style.cursor = 'grabbing';
            el.style.userSelect = 'none';
            startX.current = pageX - el.offsetLeft;
            scrollLeft.current = el.scrollLeft;
        };

        const endDrag = () => {
            if (!isDown.current) return;
            isDown.current = false;
            el.style.cursor = 'grab';
            el.style.userSelect = 'auto';
            setTimeout(() => {
              hasDragged.current = false;
            }, 50);
        };

        const onDrag = (pageX: number) => {
            if (!isDown.current) return;
            const x = pageX - el.offsetLeft;
            const walk = x - startX.current;
            if (Math.abs(walk) > 5) {
                hasDragged.current = true;
            }
            el.scrollLeft = scrollLeft.current - walk;
        };
        
        const handleMouseDown = (e: MouseEvent) => startDrag(e.pageX);
        const handleMouseMove = (e: MouseEvent) => {
            if (isDown.current) e.preventDefault();
            onDrag(e.pageX);
        };
        
        const handleMouseUp = () => endDrag();

        const handleTouchStart = (e: TouchEvent) => startDrag(e.touches[0].pageX);
        const handleTouchMove = (e: TouchEvent) => onDrag(e.touches[0].pageX);

        el.addEventListener('mousedown', handleMouseDown);
        el.addEventListener('mouseleave', endDrag);
        el.addEventListener('mouseup', handleMouseUp);
        el.addEventListener('mousemove', handleMouseMove);
        
        el.addEventListener('touchstart', handleTouchStart, { passive: true });
        el.addEventListener('touchend', endDrag);
        el.addEventListener('touchmove', handleTouchMove, { passive: true });

        return () => {
            el.removeEventListener('mousedown', handleMouseDown);
            el.removeEventListener('mouseleave', endDrag);
            el.removeEventListener('mouseup', handleMouseUp);
            el.removeEventListener('mousemove', handleMouseMove);
            el.removeEventListener('touchstart', handleTouchStart);
            el.removeEventListener('touchend', endDrag);
            el.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    return (
        <section className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-white mb-4 px-4 sm:px-8">{section.title}</h2>
            <div 
                ref={scrollContainerRef}
                className="flex overflow-x-auto space-x-6 py-4 px-4 sm:px-8 scrollbar-thin scrollbar-thumb-orange-700 scrollbar-track-neutral-950 cursor-grab select-none"
            >
                {section.items.map((item) => (
                    <ContentCard 
                        key={item.id} 
                        course={item} 
                        onClick={() => {
                            if (!hasDragged.current) onCardClick(item);
                        }} 
                    />
                ))}
            </div>
        </section>
    );
};

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
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  let html = text.replace(linkRegex, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-orange-400 hover:underline font-semibold">$1</a>');
  html = html.replace(/\n/g, '<br />');
  return html;
}

const LessonModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (lessonData: { title: string; videoId: string; description: string; }) => void;
    lessonToEdit?: Lesson | null;
}> = ({ isOpen, onClose, onSave, lessonToEdit }) => {
    if (!isOpen) return null;

    const [title, setTitle] = useState(lessonToEdit?.title || '');
    const [videoId, setVideoId] = useState(lessonToEdit?.videoId || '');
    const [description, setDescription] = useState(lessonToEdit?.description || '');

    const handleSaveClick = () => {
        if (title.trim() && videoId.trim()) {
            onSave({ title, videoId, description });
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-neutral-900 rounded-xl shadow-2xl p-8 max-w-lg w-full border border-neutral-800/50">
                <h3 className="text-2xl font-bold text-white mb-6">{lessonToEdit ? 'Editar Aula' : 'Adicionar Nova Aula'}</h3>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="lesson-title" className="block text-sm font-medium text-neutral-400 mb-1">Título da Aula</label>
                        <input id="lesson-title" type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500" />
                    </div>
                    <div>
                        <label htmlFor="lesson-video-id" className="block text-sm font-medium text-neutral-400 mb-1">ID ou URL do Vídeo do YouTube</label>
                        <input id="lesson-video-id" type="text" value={videoId} onChange={e => setVideoId(e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500" />
                    </div>
                     <div>
                        <label htmlFor="lesson-description" className="block text-sm font-medium text-neutral-400 mb-1">Descrição da Aula</label>
                        <textarea id="lesson-description" value={description} onChange={e => setDescription(e.target.value)} rows={5} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none" />
                    </div>
                </div>
                <div className="mt-8 flex justify-end gap-4">
                    <button onClick={onClose} className="px-6 py-2 bg-neutral-700 font-semibold rounded-lg hover:bg-neutral-600 transition-colors">Cancelar</button>
                    <button onClick={handleSaveClick} className="px-6 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-500 transition-colors">Salvar</button>
                </div>
            </div>
        </div>
    );
};

const VideoLessonPage: React.FC<{
    course: Course;
    onBack: () => void;
    isLoggedIn: boolean;
    isAdmin: boolean;
    setContentData: React.Dispatch<React.SetStateAction<ContentSection[]>>;
}> = ({ course, onBack, isLoggedIn, isAdmin, setContentData }) => {
    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(course.lessons[0] || null);
    const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
    const [lessonToEdit, setLessonToEdit] = useState<Lesson | null>(null);

    useEffect(() => {
        if (currentLesson && !course.lessons.find(l => l.id === currentLesson.id)) {
            setCurrentLesson(course.lessons[0] || null);
        } else if (!currentLesson && course.lessons.length > 0) {
            setCurrentLesson(course.lessons[0]);
        }
    }, [course.lessons, currentLesson]);

    const handleOpenAddModal = () => {
        setLessonToEdit(null);
        setIsLessonModalOpen(true);
    };

    const handleOpenEditModal = (lesson: Lesson) => {
        setLessonToEdit(lesson);
        setIsLessonModalOpen(true);
    };
    
    const handleLessonSelect = (lesson: Lesson) => {
        setCurrentLesson(lesson);
    };

    const handleSaveLesson = (lessonData: { title: string; videoId: string; description: string; }) => {
        setContentData(prevContent => {
            const newContent = JSON.parse(JSON.stringify(prevContent));
            for (const section of newContent) {
                const courseToUpdate = section.items.find((c: Course) => c.id === course.id);
                if (courseToUpdate) {
                    if (lessonToEdit) {
                        const lessonIndex = courseToUpdate.lessons.findIndex((l: Lesson) => l.id === lessonToEdit.id);
                        if (lessonIndex > -1) {
                            courseToUpdate.lessons[lessonIndex] = { ...courseToUpdate.lessons[lessonIndex], ...lessonData };
                        }
                    } else {
                        courseToUpdate.lessons.push({ ...lessonData, id: Date.now() });
                    }
                    break;
                }
            }
            if (lessonToEdit && currentLesson?.id === lessonToEdit.id) {
                setCurrentLesson(prev => prev ? { ...prev, ...lessonData } : null);
            }
            return newContent;
        });
        setIsLessonModalOpen(false);
        setLessonToEdit(null);
    };

    const videoId = currentLesson ? extractYouTubeID(currentLesson.videoId) : null;
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?origin=${window.location.origin}` : '';
    const currentLessonIndex = currentLesson ? course.lessons.findIndex(l => l.id === currentLesson.id) : -1;
    const isLastLesson = currentLessonIndex === -1 || currentLessonIndex === course.lessons.length - 1;

    const handleNextLesson = () => {
        if (currentLessonIndex !== -1 && !isLastLesson) {
            setCurrentLesson(course.lessons[currentLessonIndex + 1]);
        }
    };
    
    const LessonListUI = () => (
        <div className="bg-neutral-900/70 p-6 rounded-xl lg:bg-transparent lg:p-0">
             <div className="flex justify-between items-center mb-2 flex-shrink-0">
                <h2 className="text-xl font-bold text-white">Aulas do Módulo</h2>
                {isAdmin && (
                    <button onClick={handleOpenAddModal} className="flex items-center gap-2 px-3 py-1.5 text-sm bg-orange-600/80 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors">
                        <PlusIcon /> Adicionar
                    </button>
                )}
            </div>
            <p className="text-sm text-neutral-400 mb-6 flex-shrink-0">{course.lessons.length} aulas • 2h 30m no total</p>
            <ul className="space-y-3">
                {course.lessons.map((lesson, index) => {
                    const isActive = lesson.id === currentLesson?.id;
                    return (
                         <li 
                            key={lesson.id} 
                            onClick={() => handleLessonSelect(lesson)}
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
                                <button onClick={(e) => { e.stopPropagation(); handleOpenEditModal(lesson); }} className="p-2 text-neutral-400 opacity-0 group-hover:opacity-100 hover:text-white transition-opacity" aria-label={`Editar aula ${lesson.title}`}>
                                    <PencilIcon />
                                </button>
                            )}
                         </li>
                    )
                })}
            </ul>
        </div>
    );

    return (
        <div className="animate-fade-in flex flex-col h-full">
            <div className="p-8 hidden lg:flex items-center flex-shrink-0">
                <button onClick={onBack} className="flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold">
                    <ArrowLeftIcon />
                    Voltar para Conteúdo
                </button>
            </div>
            
            <div className="flex-1 lg:grid lg:grid-cols-3 lg:gap-8 lg:px-8 lg:pb-8 lg:overflow-hidden">
                <div className="lg:col-span-2 lg:overflow-y-auto scrollbar-thin scrollbar-thumb-orange-700 scrollbar-track-neutral-950">
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-2xl shadow-black/50 bg-black flex-shrink-0 mx-auto max-w-full lg:max-w-none">
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

                    <div className="mt-6 px-4 lg:px-0">
                        <span className="text-orange-400 font-semibold text-sm">Módulo 1</span>
                        <h1 className="text-3xl lg:text-4xl font-bold text-white mt-1">{course.title}</h1>
                        <p className="text-lg text-neutral-300 mt-2">
                           {currentLesson ? `Aula ${course.lessons.findIndex(l => l.id === currentLesson.id) + 1}: ${currentLesson.title}` : 'Selecione uma aula'}
                        </p>
                    </div>

                    <div className="mt-8 py-6 border-y border-neutral-800/70 mx-4 lg:mx-0">
                         <div className="flex items-center gap-4">
                            <button 
                                onClick={handleNextLesson}
                                disabled={isLoggedIn && isLastLesson}
                                className="px-6 py-2 bg-orange-600 text-white font-semibold rounded-full hover:bg-orange-500 transition-colors disabled:bg-neutral-700 disabled:cursor-not-allowed disabled:text-neutral-400"
                            >
                                Próxima Aula
                            </button>
                         </div>
                    </div>
                    <div className="mt-6 text-neutral-300 space-y-4 px-4 lg:px-0 pb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Sobre esta aula</h2>
                        <p 
                            className="leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: markdownToHtml(currentLesson?.description || 'Descrição da aula não disponível.') }}
                        />
                    </div>
                    
                    <div className="lg:hidden px-4 pb-8">
                       <LessonListUI />
                    </div>
                </div>

                <div className="hidden lg:flex flex-col lg:overflow-y-auto scrollbar-thin scrollbar-thumb-orange-700 scrollbar-track-neutral-950">
                    <LessonListUI />
                </div>
            </div>
             <LessonModal 
                isOpen={isLessonModalOpen}
                onClose={() => setIsLessonModalOpen(false)}
                onSave={handleSaveLesson}
                lessonToEdit={lessonToEdit}
            />
        </div>
    );
};

const PlatformPage: React.FC<PlatformPageProps> = ({ isLoggedIn, isAdmin, onNavigateToAdmin, onLogout, contentData, setContentData, profilePicture, setProfilePicture, lastViewedCourseId, setLastViewedCourseId, lastUsedAgentId, setLastUsedAgentId }) => {
    const [activeView, setActiveView] = useState<ActiveView>('dashboard');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [activeAgentWorkspace, setActiveAgentWorkspace] = useState<Agent | null>(null);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
    const [premiumModalContent, setPremiumModalContent] = useState({ title: '', description: '' });

    useEffect(() => {
        if (selectedCourse) {
            const updatedCourse = contentData
                .flatMap(section => section.items)
                .find(item => item.id === selectedCourse.id);
            if (updatedCourse) {
                if (JSON.stringify(updatedCourse) !== JSON.stringify(selectedCourse)) {
                    setSelectedCourse(updatedCourse);
                }
            } else {
                setSelectedCourse(null);
            }
        }
    }, [contentData, selectedCourse]);

    const agents: Agent[] = [
        { id: 'chat', name: 'Chat', description: 'Converse com uma IA para tirar dúvidas.', icon: <ChatIcon />, longDescription: 'Inicie uma conversa com um assistente de IA avançado. Perfeito para brainstorming, redação de código, tradução de textos, ou simplesmente para obter respostas rápidas para perguntas complexas. Otimizado para diálogos naturais e contextuais.' },
        { id: 'image-analyzer', name: 'Analisador de Imagem', description: 'Envie uma imagem e receba uma análise.', icon: <ImageIcon />, longDescription: 'Extraia informações valiosas de imagens. Este agente pode descrever conteúdos, identificar objetos, reconhecer marcos, ler textos e até mesmo detectar emoções. Ideal para análise de mídia e acessibilidade.' },
        { id: 'prompt-generator', name: 'Gerador de Prompt', description: 'Crie prompts eficazes para qualquer modelo.', icon: <SparklesIcon />, longDescription: 'Supere o bloqueio criativo e maximize o potencial dos modelos de IA. Descreva seu objetivo e este agente irá gerar prompts detalhados e estruturados para garantir os melhores resultados possíveis em qualquer tarefa.' },
        { id: 'image-generator', name: 'Gerador de Imagem', description: 'Transforme suas ideias em imagens.', icon: <BrushIcon />, longDescription: 'Dê vida à sua imaginação. Descreva uma cena, um personagem ou um conceito abstrato, e este agente criará imagens impressionantes e únicas, desde fotorrealismo a estilos artísticos variados.' },
        { id: 'watermark-remover', name: 'Removedor de Marca d\'água', description: 'Limpe suas imagens com precisão.', icon: <CleanIcon />, longDescription: 'Remova marcas d\'água, logotipos ou outros objetos indesejados de suas imagens de forma inteligente. A IA analisa o entorno e preenche o espaço de forma natural, preservando a qualidade da imagem original.' },
    ];
    
    const [selectedAgent, setSelectedAgent] = useState<Agent>(agents[0]);
    
    const handleCardClick = (course: Course) => {
        if (course.isFree || isAdmin) {
            setSelectedCourse(course);
            setActiveAgentWorkspace(null); 
            setLastViewedCourseId(course.id);
        } else {
            setPremiumModalContent({
                title: 'Desbloqueie este Curso',
                description: 'Este conteúdo é exclusivo para membros premium. Faça o upgrade para ter acesso a este e todos os outros cursos da plataforma.'
            });
            setIsPremiumModalOpen(true);
        }
    }

    const handleStartUsingAgent = (agent: Agent) => {
        if (isLoggedIn && !isAdmin) {
             setPremiumModalContent({
                title: 'Acesso Premium Necessário',
                description: 'As ferramentas dos Agentes de IA são exclusivas para membros premium. Faça o upgrade para desbloquear todo o potencial da plataforma.'
            });
            setIsPremiumModalOpen(true);
        } else {
            setActiveAgentWorkspace(agent);
            setLastUsedAgentId(agent.id);
        }
    };
    
    const handleBackToContent = () => {
        setSelectedCourse(null);
    }

    const handleBackToAgents = () => {
        setActiveAgentWorkspace(null);
    }
    
    const handleNavigate = (view: ActiveView, entityId?: string) => {
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
        
        setActiveView(view);
        setSelectedCourse(null);
        setActiveAgentWorkspace(null);
    
        if (entityId && isLoggedIn) {
            if (view === 'agentes') {
                const agent = agents.find(a => a.id === entityId);
                if (agent) {
                    handleStartUsingAgent(agent);
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
    }, [lastUsedAgentId]);

    const defaultCourseForDashboard = contentData[0]?.items[0];

    const handleClosePremiumModal = () => setIsPremiumModalOpen(false);
    
    const handleConfirmPremium = () => {
        alert("Redirecionando para a página de pagamento! (Simulação)");
        handleClosePremiumModal();
    };


    const renderMainContent = () => {
        if (selectedCourse) {
            return <VideoLessonPage 
                course={selectedCourse} 
                onBack={handleBackToContent} 
                isLoggedIn={isLoggedIn}
                isAdmin={isAdmin}
                setContentData={setContentData}
            />;
        }
        if (activeAgentWorkspace) {
            return <AgentWorkspace agent={activeAgentWorkspace} onBack={handleBackToAgents} />;
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
                        {contentData.map(section => (
                            <ContentRow 
                                key={section.id} 
                                section={section} 
                                onCardClick={handleCardClick}
                            />
                        ))}
                    </div>
                );
            case 'comunidade':
                return (
                    <div className="p-4 sm:p-8 flex flex-col items-center justify-center text-center h-full animate-fade-in">
                       <div className="bg-neutral-900/80 p-6 sm:p-10 rounded-2xl border border-neutral-800/50 max-w-2xl flex flex-col items-center">
                            <div className="mb-6 text-orange-400">
                                <DiscordIcon />
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Junte-se à nossa Comunidade</h2>
                            <p className="text-neutral-300 text-base sm:text-lg mb-8 max-w-lg">
                                Participe de discussões, tire dúvidas, compartilhe seus projetos e conecte-se com outros desenvolvedores e criativos em nosso servidor exclusivo do Discord.
                            </p>
                            <a 
                                href="#" 
                                onClick={(e) => e.preventDefault()}
                                className="px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold text-white bg-orange-600 rounded-full shadow-2xl shadow-orange-600/40 transform transition-all duration-300 hover:bg-orange-500 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300"
                            >
                                Entrar no Discord
                            </a>
                        </div>
                    </div>
                );
            case 'agentes':
                return (
                    <div className="p-4 sm:p-8 animate-fade-in h-full flex flex-col">
                       <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Agentes IA</h2>
                       <p className="text-neutral-400 text-lg mb-8">Ferramentas inteligentes para potencializar seu trabalho.</p>
                       
                       <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
                           <div className="lg:col-span-1 flex flex-col gap-4">
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

                           <div className="lg:col-span-2 bg-neutral-900/80 rounded-xl border border-neutral-800/50 flex flex-col p-8 animate-fade-in">
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
                                            onClick={() => handleStartUsingAgent(selectedAgent)}
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

    const viewTitles: Record<ActiveView, string> = {
        dashboard: 'Dashboard',
        conteudo: 'Conteúdo',
        comunidade: 'Comunidade',
        agentes: 'Agentes'
    };
    
    const isDeepView = !!(selectedCourse || activeAgentWorkspace);

    const handleMobileBack = () => {
        if (selectedCourse) handleBackToContent();
        else if (activeAgentWorkspace) handleBackToAgents();
    };

    const getMobileHeaderTitle = () => {
        if (selectedCourse) return selectedCourse.title;
        if (activeAgentWorkspace) return activeAgentWorkspace.name;
        return viewTitles[activeView];
    };

    return (
        <div className="flex h-screen w-full bg-black text-white animate-fade-in overflow-hidden">
            <div className="hidden lg:flex">
                <Sidebar 
                    activeView={activeView} 
                    onNavigate={handleNavigate} 
                    isCollapsed={isSidebarCollapsed}
                    toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    isLoggedIn={isLoggedIn}
                    isAdmin={isAdmin}
                    onNavigateToAdmin={onNavigateToAdmin}
                    onLogout={onLogout}
                    onOpenProfile={() => setIsProfileModalOpen(true)}
                    profilePicture={profilePicture}
                />
            </div>
            
            <div className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                 <div className="absolute inset-0 bg-black/60" onClick={() => setIsMobileMenuOpen(false)}></div>
                 <div className={`relative h-full transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                      <Sidebar
                          activeView={activeView}
                          onNavigate={handleNavigate}
                          isCollapsed={false}
                          toggleSidebar={() => {}}
                          isLoggedIn={isLoggedIn}
                          isAdmin={isAdmin}
                          onNavigateToAdmin={onNavigateToAdmin}
                          onLogout={onLogout}
                          onOpenProfile={() => setIsProfileModalOpen(true)}
                          profilePicture={profilePicture}
                          onClose={() => setIsMobileMenuOpen(false)}
                      />
                 </div>
            </div>


            <main className="flex-1 flex flex-col overflow-y-auto bg-neutral-950">
                 <header className="lg:hidden grid grid-cols-3 items-center p-4 bg-neutral-950/80 backdrop-blur-sm sticky top-0 z-30 border-b border-neutral-800">
                     <div className="flex justify-start">
                         {isDeepView && (
                             <button onClick={handleMobileBack} className="p-1 text-white" aria-label="Voltar">
                               <ArrowLeftIcon />
                             </button>
                         )}
                     </div>
                     <h1 className="text-lg font-bold text-white truncate text-center">{getMobileHeaderTitle()}</h1>
                     <div className="flex justify-end">
                        <button onClick={() => setIsMobileMenuOpen(true)} className="p-1" aria-label="Abrir menu">
                          <MenuIcon />
                        </button>
                     </div>
                </header>
                {renderMainContent()}
            </main>

            {isLoggedIn && isProfileModalOpen && (
                <ProfileModal 
                    isOpen={isProfileModalOpen} 
                    onClose={() => setIsProfileModalOpen(false)}
                    isAdmin={isAdmin}
                    profilePicture={profilePicture}
                    setProfilePicture={setProfilePicture}
                />
            )}

            {isPremiumModalOpen && (
                <PremiumModal
                    isOpen={isPremiumModalOpen}
                    onClose={handleClosePremiumModal}
                    onConfirm={handleConfirmPremium}
                    title={premiumModalContent.title}
                    description={premiumModalContent.description}
                />
            )}
            
            <style>{`
                @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
                @keyframes scale-in-up { 0% { opacity: 0; transform: scale(0.95) translateY(10px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
                .animate-scale-in-up { animation: scale-in-up 0.2s ease-out forwards; }
                .animate-fade-in { animation: fade-in 0.6s ease-in forwards; }
                .scrollbar-thin { scrollbar-width: thin; scrollbar-color: #D97706 #171717; }
                .scrollbar-thin::-webkit-scrollbar { width: 8px; height: 8px; }
                .scrollbar-thin::-webkit-scrollbar-track { background: #0a0a0a; border-radius: 4px; }
                .scrollbar-thin::-webkit-scrollbar-thumb { background-color: #B45309; border-radius: 4px; }
                .scrollbar-thin::-webkit-scrollbar-thumb:hover { background-color: #D97706; }
            `}</style>
        </div>
    );
};

export default PlatformPage;