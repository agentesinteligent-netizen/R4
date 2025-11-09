import React, { useState, useRef } from 'react';

const ImageGeneratorAgentUI: React.FC = () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);

    const handleGenerateImage = () => {
        const imageGenPrompt = textareaRef.current?.value;
        if (!imageGenPrompt || !imageGenPrompt.trim()) return;
        
        setGeneratedImage('loading');
        setTimeout(() => {
            setGeneratedImage(`https://images.unsplash.com/photo-1683836384083-36359be2f7c0?q=80&w=800&auto=format&fit=crop&prompt=${encodeURIComponent(imageGenPrompt)}`);
        }, 2000);
    }

    return (
        <div className="p-8 flex flex-col h-full gap-6">
            <h3 className="text-xl font-semibold text-white">Descreva a imagem que você quer criar:</h3>
            <textarea
                ref={textareaRef}
                defaultValue=""
                placeholder="Ex: Um astronauta tocando guitarra na lua, estilo arte digital..."
                className="w-full p-4 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows={3}
            />
            <button onClick={handleGenerateImage} className="w-full py-3 bg-orange-600 rounded-lg font-bold hover:bg-orange-500 transition-colors">Gerar Imagem</button>
            <div className="flex-1 bg-neutral-900 rounded-lg flex items-center justify-center">
                {generatedImage === 'loading' && <p className="text-neutral-400">Gerando imagem...</p>}
                {generatedImage && generatedImage !== 'loading' && <img src={generatedImage} alt="Generated" className="rounded-lg shadow-lg max-h-full max-w-full" />}
                {!generatedImage && <p className="text-neutral-500">A imagem gerada aparecerá aqui</p>}
            </div>
        </div>
    );
};

export default React.memo(ImageGeneratorAgentUI);