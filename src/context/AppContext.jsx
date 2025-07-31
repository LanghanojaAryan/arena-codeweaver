import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [theme, setTheme] = useState('light');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  // Mock login function - in real app this would call an API
  const login = (credentials) => {
    // Mock authentication
    const mockUser = {
      id: '1',
      fullName: 'Alex Johnson',
      username: 'alexj_dev',
      enrollmentNo: 'CS2021001',
      email: 'alex.johnson@university.edu',
      profilePhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      rating: 1847,
      badges: [
        { id: 1, name: 'Problem Solver', icon: '🏆', earned: true },
        { id: 2, name: 'Speed Demon', icon: '⚡', earned: true },
        { id: 3, name: 'Contest Warrior', icon: '⚔️', earned: true },
        { id: 4, name: 'Debug Master', icon: '🐛', earned: false },
      ],
      stats: {
        totalProblems: 342,
        totalSubmissions: 1256,
        acceptedSubmissions: 892,
        streakDays: 47,
        contestsParticipated: 23,
        currentRank: 156
      }
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    return { success: true, user: mockUser };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentView('dashboard');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const navigateTo = (view) => {
    setCurrentView(view);
  };

  const value = {
    currentView,
    setCurrentView,
    theme,
    toggleTheme,
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    login,
    logout,
    navigateTo,
    sidebarCollapsed,
    setSidebarCollapsed
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};