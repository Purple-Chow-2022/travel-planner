// src/App.jsx
import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import TripOverview from './pages/TripOverview';
import DayView from './pages/DayView';
import TodoView from './pages/TodoView';

function App() {
  const [lang, setLang] = useState('zh');

  return (
    // 使用 HashRouter 後，不需要再設定 basename
    <Router>
      <div className="max-w-md mx-auto bg-white min-h-screen relative shadow-2xl">
        
        {/* 語言切換按鈕 */}
        <button 
          onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
          className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur shadow-lg px-3 py-1 rounded-full text-sm font-bold border"
        >
          {lang === 'zh' ? 'EN' : '繁'}
        </button>

        <div className="pb-24">
          <Routes>
            <Route path="/" element={<TripOverview lang={lang} />} />
            <Route path="/city/:cityId/day/:dayId" element={<DayView lang={lang} />} />
            <Route path="/todo" element={<TodoView lang={lang} />} />
            {/* 捕捉所有錯誤路徑並導回首頁 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* 底部導航 */}
        <nav className="fixed bottom-0 w-full max-w-md bg-white/90 backdrop-blur-md border-t flex justify-around py-3 pb-6 z-50">
          <Link to="/" className="flex flex-col items-center">
            <span className="text-xl">🗺️</span>
            <span className="text-[10px] font-bold text-gray-500">{lang === 'zh' ? '行程' : 'Trip'}</span>
          </Link>
          <Link to="/todo" className="flex flex-col items-center">
            <span className="text-xl">✅</span>
            <span className="text-[10px] font-bold text-gray-500">{lang === 'zh' ? '準備' : 'Prep'}</span>
          </Link>
        </nav>
      </div>
    </Router>
  );
}

export default App;