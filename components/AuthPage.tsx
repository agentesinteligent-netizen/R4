import React, { useState, useRef, forwardRef } from 'react';
import { UserIcon } from './icons/UserIcon';
import { MailIcon } from './icons/MailIcon';
import { LockIcon } from './icons/LockIcon';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface AuthPageProps {
  onNavigateBack: () => void;
  onLoginSuccess: (email: string) => void;
}

type AuthMode = 'login' | 'register';

const InputField = forwardRef<HTMLInputElement, {
    icon: React.ReactNode;
    type: string;
    placeholder: string;
    id: string;
  }>(({ icon, type, placeholder, id }, ref) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        ref={ref}
        type={type}
        id={id}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
        required
      />
    </div>
));
InputField.displayName = "InputField";


const AuthPage: React.FC<AuthPageProps> = ({ onNavigateBack, onLoginSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  
  // Use refs for form fields to avoid re-renders on typing
  const loginEmailRef = useRef<HTMLInputElement>(null);
  const loginPasswordRef = useRef<HTMLInputElement>(null);
  const registerNameRef = useRef<HTMLInputElement>(null);
  const registerEmailRef = useRef<HTMLInputElement>(null);
  const registerPasswordRef = useRef<HTMLInputElement>(null);

  // States for messages
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setError('');
    setSuccessMessage('');
  };

  const TabButton: React.FC<{
    currentMode: AuthMode;
    targetMode: AuthMode;
    children: React.ReactNode;
  }> = ({ currentMode, targetMode, children }) => {
    const isActive = currentMode === targetMode;
    return (
      <button
        onClick={() => switchMode(targetMode)}
        className={`w-1/2 py-3 text-center font-semibold rounded-t-lg transition-colors duration-300 ${
          isActive
            ? 'bg-neutral-800 text-white'
            : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-700'
        }`}
      >
        {children}
      </button>
    );
  };
  
  const FormContainer: React.FC<{children: React.ReactNode; onSubmit: (e: React.FormEvent) => void}> = ({children, onSubmit}) => (
     <form onSubmit={onSubmit} className="flex flex-col gap-4 p-8">
        {children}
     </form>
  )

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const email = loginEmailRef.current?.value;
    const password = loginPasswordRef.current?.value;

    if (!email || !password) {
        setError('Por favor, preencha todos os campos.');
        return;
    }
    onLoginSuccess(email);
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const name = registerNameRef.current?.value;
    const email = registerEmailRef.current?.value;
    const password = registerPasswordRef.current?.value;

    if (!name || !email || !password) {
        setError('Por favor, preencha todos os campos para se cadastrar.');
        return;
    }
    // Simulate registration success
    setSuccessMessage(`Conta para ${name} criada! Redirecionando...`);
    setTimeout(() => {
        onLoginSuccess(email);
    }, 1500);
  }

  const Message: React.FC<{text: string; type: 'error' | 'success'}> = ({text, type}) => {
    if (!text) return null;
    const colors = type === 'error' ? 'text-red-400' : 'text-green-400';
    return (
        <p className={`text-sm text-center -mt-2 mb-2 ${colors}`}>{text}</p>
    )
  }

  return (
    <div className="relative flex items-center justify-center h-screen w-full bg-gradient-to-br from-neutral-950 via-black to-orange-900/20 px-4">
      <button
        onClick={onNavigateBack}
        className="absolute top-6 left-6 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800/50 transition-colors z-10"
        aria-label="Voltar para a página inicial"
      >
        <ArrowLeftIcon className="h-6 w-6" />
      </button>

      <div className="w-full max-w-md bg-neutral-900/60 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden animate-fade-in">
        <div 
          className="p-4 pt-10 text-center text-2xl font-bold text-white"
        >
          R4 Academy
        </div>

        <div className="flex">
          <TabButton currentMode={mode} targetMode="login">
            Login
          </TabButton>
          <TabButton currentMode={mode} targetMode="register">
            Cadastro
          </TabButton>
        </div>

        {mode === 'login' ? (
          <FormContainer onSubmit={handleLogin}>
            <InputField 
              ref={loginEmailRef}
              icon={<MailIcon />} 
              type="email" 
              placeholder="Email" 
              id="login-email"
            />
            <InputField 
                ref={loginPasswordRef}
                icon={<LockIcon />} 
                type="password" 
                placeholder="Senha" 
                id="login-password"
            />
            <Message text={error} type="error" />
            <button type="submit" className="w-full mt-2 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors duration-300">
              Entrar
            </button>
          </FormContainer>
        ) : (
          <FormContainer onSubmit={handleRegister}>
            <InputField 
                ref={registerNameRef}
                icon={<UserIcon />} 
                type="text" 
                placeholder="Nome Completo" 
                id="register-name"
            />
             <InputField
              ref={registerEmailRef}
              icon={<MailIcon />} 
              type="email" 
              placeholder="Email" 
              id="register-email"
            />
            <InputField 
                ref={registerPasswordRef}
                icon={<LockIcon />} 
                type="password" 
                placeholder="Senha" 
                id="register-password"
            />
            <Message text={error} type="error" />
            <Message text={successMessage} type="success" />
            <button type="submit" className="w-full mt-2 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors duration-300 disabled:bg-neutral-600" disabled={!!successMessage}>
              Criar Conta
            </button>
          </FormContainer>
        )}
      </div>
       <style>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AuthPage;