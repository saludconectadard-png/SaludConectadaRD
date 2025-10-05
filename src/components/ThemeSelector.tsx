'use client';
import { useEffect, useState } from 'react';

export default function ThemePopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    const count = Number(sessionStorage.getItem('reloadCount') || 0) + 1;
    sessionStorage.setItem('reloadCount', count.toString());
    setReloadCount(count);

    if (count >= 3) setShowPopup(true);

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
  }, []);

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme);
    // el popup sigue abierto hasta que el usuario haga click en la X
  };

  const handleClose = () => {
    setShowPopup(false);
    sessionStorage.setItem('reloadCount', '0'); // reset para volver a contar
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Fondo difuminado */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500"
            onClick={handleClose}
          />
          {/* Popup */}
          <div className="relative z-50 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-80 max-w-[90%] transition-transform duration-500 ease-out">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white text-lg font-bold"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
              ¿Quieres activar el modo oscuro?
            </h2>

            {/* Toggle con emoji y rebote */}
            <div className="flex items-center justify-center mt-2">
              <div
                className={`relative w-20 h-10 rounded-full cursor-pointer transition-colors duration-700 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900'
                    : 'bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-400'
                }`}
                onClick={() =>
                  handleThemeChange(theme === 'light' ? 'dark' : 'light')
                }
              >
                <span
                  className={`absolute top-1 w-8 h-8 bg-white rounded-full flex items-center justify-center text-lg shadow-md transform transition-transform duration-500 ease-out ${
                    theme === 'dark'
                      ? 'translate-x-10 animate-bounce-toggle'
                      : 'translate-x-0 animate-bounce-toggle'
                  }`}
                >
                  {theme === 'dark' ? '🌙' : '☀️'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes bounce-toggle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        .animate-bounce-toggle {
          animation: bounce-toggle 0.4s ease-out;
        }
      `}</style>
    </>
  );
}   