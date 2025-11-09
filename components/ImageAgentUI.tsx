import React, { useState, useRef } from 'react';
import { Agent } from './PlatformPage';
import { ImageIcon } from './icons/ImageIcon';
import { PencilIcon } from './icons/PencilIcon';
import { TrashIcon } from './icons/TrashIcon';

interface ImageAgentUIProps {
    agent: Agent;
}

const ImageAgentUI: React.FC<ImageAgentUIProps> = ({ agent }) => {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [analysisResult, setAnalysisResult] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setUploadedImage(event.target?.result as string);
                setAnalysisResult('');
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const triggerFileUpload = () => {
        fileInputRef.current?.click();
    };

    const handleRemoveImage = () => {
        setUploadedImage(null);
        setAnalysisResult('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleAnalysis = () => {
        setAnalysisResult('Analisando...');
        setTimeout(() => {
            setAnalysisResult('Análise simulada: A imagem parece conter elementos de design de interface do usuário, com foco em cores escuras e realces em laranja, sugerindo um aplicativo de tecnologia moderna.');
        }, 1500);
    }
    
    const handleRemoveWatermark = () => {
        alert("Marca d'água removida (simulação)!");
    }

    return (
        <div className="p-8 flex flex-col items-center justify-center h-full gap-8">
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageUpload} 
            />

             {!uploadedImage ? (
                <button 
                    onClick={triggerFileUpload}
                    className="w-full max-w-lg h-64 border-2 border-dashed border-neutral-700 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-800/50 hover:border-orange-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-orange-500"
                >
                    <ImageIcon />
                    <span className="mt-2 font-semibold text-neutral-400">Clique para enviar uma imagem</span>
                </button>
             ) : (
                 <div className="w-full max-w-lg">
                    <div className="relative group rounded-xl overflow-hidden">
                        <img src={uploadedImage} alt="Uploaded" className="shadow-lg w-full" />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                             <button onClick={triggerFileUpload} className="p-3 bg-black/70 rounded-full text-white hover:bg-orange-500 transition-colors" title="Alterar Imagem">
                                <PencilIcon />
                            </button>
                            <button onClick={handleRemoveImage} className="p-3 bg-black/70 rounded-full text-white hover:bg-red-600 transition-colors" title="Remover Imagem">
                                <TrashIcon />
                            </button>
                        </div>
                    </div>
                    {analysisResult && agent.id === 'image-analyzer' && <div className="mt-4 p-4 bg-neutral-800 rounded-lg text-neutral-300">{analysisResult}</div>}
                 </div>
             )}
             <div className="flex gap-4">
                {uploadedImage && agent.id === 'image-analyzer' && <button onClick={handleAnalysis} disabled={!!analysisResult} className="px-6 py-3 bg-orange-600 rounded-lg font-bold hover:bg-orange-500 transition-colors disabled:bg-neutral-600">Analisar Imagem</button>}
                {uploadedImage && agent.id === 'watermark-remover' && <button onClick={handleRemoveWatermark} className="px-6 py-3 bg-orange-600 rounded-lg font-bold hover:bg-orange-500 transition-colors">Remover Marca d'água</button>}
             </div>
        </div>
     );
}

export default React.memo(ImageAgentUI);