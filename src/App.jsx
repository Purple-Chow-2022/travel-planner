import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import TripOverview from './screens/TripOverview';
import CityView from './screens/CityView';
import DayView from './screens/DayView';

function App() {
  // Logic: Check phone memory for 'lang', otherwise default to 'en'
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'zh');

  // Logic: Save to phone memory whenever lang changes
  useEffect(() => {
    localStorage.setItem('appLang', lang);
  }, [lang]);

  return (
    <HashRouter>
      <div className="min-h-screen bg-white font-sans text-slate-900">
        {/* Simple Top Navigation */}
        <nav className="flex justify-between items-center p-4 border-b sticky top-0 bg-white/80 backdrop-blur-md z-50">
          <Link to="/" className="font-bold text-lg tracking-tight">TRAVELER</Link>
          
          <button 
            onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
            className="bg-slate-100 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-slate-200 transition-colors"
          >
            {lang === 'en' ? '繁體中文' : 'English'}
          </button>
        </nav>

        {/* Pass 'lang' to every screen */}
        <main className="max-w-md mx-auto">
<Routes>
  <Route path="/" element={<TripOverview lang={lang} />} />
  
  {/* If user goes to /city/tokyo, it will still load DayView */}
  <Route path="/city/:cityId" element={<DayView lang={lang} />} />
  
  {/* Specific day view */}
  <Route path="/city/:cityId/day/:dayId" element={<DayView lang={lang} />} />
</Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;