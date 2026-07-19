import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Droplets, User, LogOut, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Check authentication status on mount and when location changes
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          const user = JSON.parse(userData);
          setIsLoggedIn(true);
          setUserName(user.name || user.username || 'User');
        } catch (error) {
          console.error('Error parsing user data:', error);
          setIsLoggedIn(false);
          setUserName('');
        }
      } else {
        setIsLoggedIn(false);
        setUserName('');
      }
    };

    checkAuthStatus();
  }, [location.pathname]); 

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName('');
    setShowDropdown(false);
    navigate('/login');
  };

  const isActive = (path) => 
    location.pathname === path 
      ? 'text-blue-600 font-bold whitespace-nowrap' 
      : 'text-slate-600 hover:text-blue-600 whitespace-nowrap';

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center gap-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-slate-800 flex items-center shrink-0">
          <Droplets className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-lg font-bold text-blue-800 hidden sm:inline">
            ရေဘေးအန္တရာယ်ကြိုတင်ပြင်ဆင်ရေး
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-4 md:gap-5 font-medium text-xs md:text-sm overflow-x-auto no-scrollbar">
          <Link to="/" className={isActive('/')}>ပင်မ</Link>
          <Link to="/knowledge-hub" className={isActive('/knowledge-hub')}>ဗဟုသုတစင်တာ</Link>
          <Link to="/checklist" className={isActive('/checklist')}>စစ်ဆေးရန်စာရင်း</Link>
          <Link to="/risk-assessment" className={isActive('/risk-assessment')}>အန္တရာယ်ဆန်းစစ်ချက်</Link>
          <Link to="/ai-assistant" className={isActive('/ai-assistant')}>AI လက်ထောက်</Link>
        </div>

        {/* Auth Section */}
        {isLoggedIn ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 bg-slate-100 text-slate-700 px-3 py-2 rounded-lg font-semibold hover:bg-slate-200 transition shrink-0"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <span className="hidden md:inline text-sm max-w-[100px] truncate">
                {userName}
              </span>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-sm font-medium text-slate-800 truncate">{userName}</p>
                  <p className="text-xs text-slate-500">အကောင့်ဝင်ထားသည်</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  ထွက်ရန်
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 text-white text-xs px-3 py-2 rounded-lg font-semibold hover:bg-blue-700 transition shrink-0"
          >
            အကောင့်ဖွင့်မည်
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;