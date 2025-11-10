import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import PlatformPage, { ContentSection, initialContentData } from './components/PlatformPage';
import AdminPage from './components/AdminPage';
import AuthPage from './components/AuthPage';

type View = 'landing' | 'platform' | 'admin' | 'auth';

// Lista de e-mails de administradores
const ADMIN_EMAILS = ['admin@r4.com', 'umunsaad090@gmail.com'];
const CONTENT_STORAGE_KEY = 'platformContentData';
const PROFILE_PICTURE_STORAGE_KEY = 'platformProfilePicture';
const LAST_VIEWED_COURSE_ID_KEY = 'lastViewedCourseId';
const LAST_USED_AGENT_ID_KEY = 'lastUsedAgentId';

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [contentData, setContentData] = useState<ContentSection[]>(() => {
    try {
      const storedData = localStorage.getItem(CONTENT_STORAGE_KEY);
      if (storedData) {
        return JSON.parse(storedData);
      }
    } catch (error) {
      console.error("Erro ao carregar dados do localStorage:", error);
    }
    // Se não houver dados ou ocorrer um erro, use os dados iniciais e salve-os.
    localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(initialContentData));
    return initialContentData;
  });
  
  const [profilePicture, setProfilePicture] = useState<string | null>(() => {
    try {
      return localStorage.getItem(PROFILE_PICTURE_STORAGE_KEY);
    } catch (error) {
      console.error("Erro ao carregar foto do perfil do localStorage:", error);
      return null;
    }
  });

  const [lastViewedCourseId, setLastViewedCourseId] = useState<string | null>(() => {
    try {
      return localStorage.getItem(LAST_VIEWED_COURSE_ID_KEY);
    } catch (error) {
      console.error("Erro ao carregar último curso visto do localStorage:", error);
      return null;
    }
  });

  const [lastUsedAgentId, setLastUsedAgentId] = useState<string | null>(() => {
    try {
      return localStorage.getItem(LAST_USED_AGENT_ID_KEY);
    } catch (error) {
      console.error("Erro ao carregar último agente usado do localStorage:", error);
      return null;
    }
  });


  // Salva as alterações no localStorage sempre que o contentData mudar
  useEffect(() => {
    try {
      localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(contentData));
    } catch (error) {
      console.error("Erro ao salvar dados no localStorage:", error);
    }
  }, [contentData]);
  
  // Salva as alterações da foto de perfil no localStorage
  useEffect(() => {
    try {
      if (profilePicture) {
        localStorage.setItem(PROFILE_PICTURE_STORAGE_KEY, profilePicture);
      } else {
        localStorage.removeItem(PROFILE_PICTURE_STORAGE_KEY);
      }
    } catch (error) {
      console.error("Erro ao salvar foto do perfil no localStorage:", error);
    }
  }, [profilePicture]);

  // Salva o último curso visto no localStorage
  useEffect(() => {
    if (isLoggedIn) {
        try {
          if (lastViewedCourseId) {
            localStorage.setItem(LAST_VIEWED_COURSE_ID_KEY, lastViewedCourseId);
          } else {
            localStorage.removeItem(LAST_VIEWED_COURSE_ID_KEY);
          }
        } catch (error) {
          console.error("Erro ao salvar último curso visto no localStorage:", error);
        }
    }
  }, [lastViewedCourseId, isLoggedIn]);

  // Salva o último agente usado no localStorage
  useEffect(() => {
    if (isLoggedIn) {
        try {
          if (lastUsedAgentId) {
            localStorage.setItem(LAST_USED_AGENT_ID_KEY, lastUsedAgentId);
          } else {
            localStorage.removeItem(LAST_USED_AGENT_ID_KEY);
          }
        } catch (error) {
          console.error("Erro ao salvar último agente usado no localStorage:", error);
        }
    }
  }, [lastUsedAgentId, isLoggedIn]);


  // Ouve as alterações no localStorage de outras abas para sincronização em tempo real
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === CONTENT_STORAGE_KEY && event.newValue) {
        try {
          setContentData(JSON.parse(event.newValue));
        } catch (error) {
          console.error("Erro ao sincronizar dados do localStorage:", error);
        }
      }
      if (event.key === PROFILE_PICTURE_STORAGE_KEY) {
        setProfilePicture(event.newValue);
      }
      if (event.key === LAST_VIEWED_COURSE_ID_KEY) {
        setLastViewedCourseId(event.newValue);
      }
      if (event.key === LAST_USED_AGENT_ID_KEY) {
        setLastUsedAgentId(event.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const navigateTo = (newView: View) => {
    setIsFadingOut(true);
    setTimeout(() => {
      setView(newView);
      setIsFadingOut(false);
    }, 500);
  };

  const handleLoginSuccess = (email: string) => {
    const isAdminUser = ADMIN_EMAILS.includes(email.toLowerCase());
    setIsAdmin(isAdminUser);
    setIsLoggedIn(true);
    navigateTo('platform');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setIsLoggedIn(false);
    navigateTo('landing');
  };
  
  const navigateToAdmin = () => navigateTo('admin');
  const navigateToPlatform = () => navigateTo('platform');

  const containerClasses = `transition-opacity duration-500 ease-in-out ${isFadingOut ? 'opacity-0' : 'opacity-100'}`;

  const renderView = () => {
    switch(view) {
        case 'landing':
            return <LandingPage onNavigate={() => navigateTo('auth')} />;
        case 'auth':
            return <AuthPage onNavigateBack={() => navigateTo('landing')} onLoginSuccess={handleLoginSuccess} />;
        case 'platform':
            return <PlatformPage 
                      isLoggedIn={isLoggedIn}
                      isAdmin={isAdmin} 
                      onNavigateToAdmin={navigateToAdmin} 
                      onLogout={handleLogout}
                      contentData={contentData}
                      setContentData={setContentData}
                      profilePicture={profilePicture}
                      setProfilePicture={setProfilePicture}
                      lastViewedCourseId={lastViewedCourseId}
                      setLastViewedCourseId={setLastViewedCourseId}
                      lastUsedAgentId={lastUsedAgentId}
                      setLastUsedAgentId={setLastUsedAgentId}
                    />;
        case 'admin':
            return <AdminPage 
                      onExitAdmin={navigateToPlatform} 
                      contentData={contentData}
                      setContentData={setContentData}
                    />;
        default:
            return <LandingPage onNavigate={() => navigateTo('auth')} />;
    }
  }

  return (
    <div className={containerClasses}>
      {renderView()}
    </div>
  );
};

export default App;