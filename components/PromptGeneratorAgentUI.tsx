import React, { useState, useRef } from 'react';

const PromptGeneratorAgentUI: React.FC = () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [generatedPrompt, setGeneratedPrompt] = useState('');

    const handleGeneratePrompt = () => {
        const promptGoal = textareaRef.current?.value;
        if (!promptGoal || !promptGoal.trim()) return;

        setGeneratedPrompt('Gerando prompt...');
        setTimeout(() => {
            setGeneratedPrompt(`Prompt Otimizado: "Crie um diálogo envolvente entre um mentor experiente em IA e um estudante curioso. O mentor deve explicar o conceito de 'aprendizagem por reforço' usando uma analogia simples e cotidiana. O tom deve ser encorajador e inspirador." para o objetivo: "${promptGoal}"`);
        }, 1500);
    }

    return (
        <div className="p-8 flex flex-col h-full gap-6">
            <h3 className="text-xl font-semibold text-white">Qual é o seu objetivo?</h3>
            <textarea
                ref={textareaRef}
                defaultValue=""
                placeholder="Ex: Quero um post para o Instagram sobre o lançamento de um novo produto..."
                className="w-full flex-1 p-4 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            />
             {generatedPrompt && <div className="p-4 bg-neutral-800 rounded-lg text-neutral-300">{generatedPrompt}</div>}
            <button onClick={handleGeneratePrompt} className="w-full py-3 bg-orange-600 rounded-lg font-bold hover:bg-orange-500 transition-colors">Gerar Prompt</button>
        </div>
    );
};

export default React.memo(PromptGeneratorAgentUI);