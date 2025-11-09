import React from 'react';

interface LandingPageProps {
  onNavigate: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full overflow-hidden bg-neutral-950 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/20 via-neutral-950 to-black">
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-4 animate-fade-in-down">
          Explore a Próxima Geração
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-orange-300 mb-8 animate-fade-in-up">
          Uma plataforma desenhada para inspirar criatividade e impulsionar o seu sucesso.
        </p>
        <button
          onClick={onNavigate}
          className="px-10 py-4 text-lg font-bold text-white bg-orange-600 rounded-full shadow-2xl shadow-orange-600/40 transform transition-all duration-300 hover:bg-orange-500 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-orange-300"
        >
          Acessar Plataforma
        </button>
      </div>
      <style>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;