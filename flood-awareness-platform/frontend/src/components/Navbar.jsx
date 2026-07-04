import { Link, useLocation } from 'react-router-dom';
import { Droplets } from 'lucide-react';

function Navbar() {
  const location = useLocation();

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

        {/* Guest Login/Register Button Placeholder */}
        <button className="bg-blue-600 text-white text-xs px-3 py-2 rounded-lg font-semibold hover:bg-blue-700 transition shrink-0">
          အကောင့်ဖွင့်မည်
        </button>
      </div>
    </nav>
  );
}

export default Navbar;