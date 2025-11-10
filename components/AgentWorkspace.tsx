import React, { useMemo } from 'react';
import { Agent } from './PlatformPage';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import ChatAgentUI from './ChatAgentUI';
import ImageAgentUI from './ImageAgentUI';
import PromptGeneratorAgentUI from './PromptGeneratorAgentUI';
import ImageGeneratorAgentUI from './ImageGeneratorAgentUI';

interface AgentWorkspaceProps {
    agent: Agent;
    onBack: () => void;
}

const AgentWorkspace: React.FC<AgentWorkspaceProps> = ({ agent, onBack }) => {

    const agentUI = useMemo(() => {
        switch (agent.id) {
            case 'chat':
                return <ChatAgentUI />;
            case 'image-analyzer':
            case 'watermark-remover':
                return <ImageAgentUI agent={agent} />;
            case 'prompt-generator':
                return <PromptGeneratorAgentUI />;
            case 'image-generator':
                return <ImageGeneratorAgentUI />;
            default:
                return <p className="p-8">Funcionalidade para este agente ainda não implementada.</p>;
        }
    }, [agent]);

    return (
        <div className="p-4 lg:p-8 animate-fade-in h-full flex flex-col">
            <div className="hidden lg:flex items-center gap-4 mb-8">
                <button onClick={onBack} className="flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold">
                    <ArrowLeftIcon />
                    Voltar
                </button>
                <div className="w-px h-6 bg-neutral-700" />
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-600/20 text-orange-400 rounded-lg flex items-center justify-center flex-shrink-0">
                        {React.cloneElement(agent.icon as React.ReactElement, { className: "h-6 w-6" })}
                    </div>
                    <h2 className="text-2xl font-bold text-white">{agent.name}</h2>
                </div>
            </div>
            <div className="flex-1 bg-neutral-900/80 rounded-xl border border-neutral-800/50 flex flex-col overflow-hidden">
                {agentUI}
            </div>
        </div>
    );
};

export default AgentWorkspace;