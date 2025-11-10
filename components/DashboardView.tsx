import React from 'react';
import { ActiveView, Course, Agent } from './PlatformPage';
import { UserIcon } from './icons/UserIcon';
import { ContentIcon } from './icons/ContentIcon';
import { AgentIcon } from './icons/AgentIcon';
import { CommunityIcon } from './icons/CommunityIcon';

interface DashboardViewProps {
    isAdmin: boolean;
    onNavigate: (view: ActiveView, entityId?: string) => void;
    lastViewedCourse: Course | null;
    defaultCourse: Course | undefined;
    lastUsedAgent: Agent | null;
}

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string, onClick?: () => void }> = ({ icon, title, value, onClick }) => (
    <div onClick={onClick} className={`bg-neutral-900/80 p-6 rounded-xl border border-neutral-800/50 flex flex-col gap-4 transition-all duration-300 ${onClick ? 'cursor-pointer hover:bg-neutral-800 hover:border-orange-600/50' : ''}`}>
        <div className="flex items-center justify-between">
            <h3 className="font-semibold text-neutral-400">{title}</h3>
            <div className="text-orange-400">{icon}</div>
        </div>
        <p className="text-3xl font-bold text-white">{value}</p>
    </div>
);

const QuickLinkCard: React.FC<{ title: string; description: string; buttonText: string; onClick: () => void; imageUrl: string }> = ({ title, description, buttonText, onClick, imageUrl }) => (
    <div className="bg-neutral-900/80 rounded-xl border border-neutral-800/50 overflow-hidden flex flex-col md:flex-row group">
        <div onClick={onClick} className="md:w-1/3 h-48 md:h-auto overflow-hidden cursor-pointer">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
        </div>
        <div className="flex-1 p-6 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-neutral-400 mb-4 flex-1">{description}</p>
            <button onClick={onClick} className="self-start px-5 py-2 bg-orange-600 text-white font-semibold rounded-full hover:bg-orange-500 transition-colors">
                {buttonText}
            </button>
        </div>
    </div>
);


const DashboardView: React.FC<DashboardViewProps> = ({ isAdmin, onNavigate, lastViewedCourse, defaultCourse, lastUsedAgent }) => {
    const courseToShow = lastViewedCourse || defaultCourse;
    
    return (
        <div className="p-4 sm:p-8 animate-fade-in h-full overflow-y-auto scrollbar-thin scrollbar-thumb-orange-700 scrollbar-track-neutral-950">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
                Bem-vindo de volta, <span className="text-orange-400">{isAdmin ? 'Admin' : 'Usuário'}!</span>
            </h1>
            <p className="text-lg text-neutral-400 mt-2">Aqui está um resumo da sua atividade na plataforma.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <StatCard icon={<ContentIcon />} title="Cursos Iniciados" value="4" onClick={() => onNavigate('conteudo')} />
                <StatCard icon={<AgentIcon />} title="Agentes Populares" value="3" onClick={() => onNavigate('agentes')} />
                <StatCard icon={<CommunityIcon />} title="Comunidade" value="Ativa" onClick={() => onNavigate('comunidade')} />
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold text-white mb-4">Acesso Rápido</h2>
                <div className="space-y-6">
                    {courseToShow && (
                        <QuickLinkCard 
                            title="Continue de onde parou"
                            description={courseToShow.description || `Mergulhe novamente em ${courseToShow.title} e aprimore suas habilidades.`}
                            buttonText="Ver Conteúdo"
                            onClick={() => onNavigate('conteudo', courseToShow.id)}
                            imageUrl={courseToShow.imageUrl}
                        />
                    )}
                     {lastUsedAgent ? (
                       <QuickLinkCard
                           title="Continue com seu último agente"
                           description={`${lastUsedAgent.name}: ${lastUsedAgent.description}`}
                           buttonText="Usar Agente"
                           onClick={() => onNavigate('agentes', lastUsedAgent.id)}
                           imageUrl="https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=800&auto=format&fit=crop"
                       />
                   ) : (
                       <QuickLinkCard
                           title="Experimente o Gerador de Imagem"
                           description="Transforme suas ideias mais criativas em imagens impressionantes com o poder da IA."
                           buttonText="Usar Agente"
                           onClick={() => onNavigate('agentes', 'image-generator')}
                           imageUrl="https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=800&auto=format&fit=crop"
                       />
                   )}
                </div>
            </div>
        </div>
    );
};

export default DashboardView;