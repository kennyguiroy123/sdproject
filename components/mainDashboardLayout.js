import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/20/solid';
import Sidebar from './sidebar';

const DashboardLayout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg relative">
        <button
          onClick={toggleDarkMode}
          className="absolute bottom-4 right-4 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-yellow-500"
        >
          {darkMode ? (
            <SunIcon className="w-6 h-6 text-yellow-500" />
          ) : (
            <MoonIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          )}
        </button>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
