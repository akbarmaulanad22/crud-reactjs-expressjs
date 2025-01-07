import { useState } from 'react';
import { MdPerson, MdLogout, MdNotifications } from 'react-icons/md';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.replace('/login');
  };

  return (
    <header className="bg-white shadow-md px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-800">
            <MdNotifications className="h-6 w-6" />
          </button>

          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white cursor-pointer hover:bg-blue-600 transition-colors">
                <MdPerson className="h-5 w-5" />
              </div>
            </button>

            {isDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                ></div>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-gray-900">Admin</p>
                    <p className="text-sm text-gray-500">Administrator</p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <MdLogout className="h-5 w-5" />
                    <span>Keluar</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;