import { useParams, Link, useNavigate } from 'react-router-dom';
import tripData from '../data/trip.json';
import LocationCard from '../components/LocationCard';

export default function DayView({ lang }) {
  const { cityId, dayId } = useParams();
  const navigate = useNavigate();
  
  // 1. 尋找城市
  const city = tripData.trip.cities.find(c => c.id === cityId);
  
  // 2. 尋找天數 (如果沒有 dayId，預設顯示第一天)
  const currentDayId = dayId || city?.days[0]?.id;
  const day = city?.days.find(d => d.id === currentDayId);

  // 安全檢查：如果找不到數據，顯示錯誤訊息而不是白屏
  if (!city || !day) {
    return (
      <div className="p-10 text-center">
        <p>找不到數據 (City: {cityId}, Day: {dayId})</p>
        <Link to="/" className="text-blue-500 underline">返回首頁</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* 頂部導航：Chip Tabs */}
      <div className="sticky top-0 bg-white/90 backdrop-blur z-20 border-b">
        <div className="flex overflow-x-auto p-4 gap-2 no-scrollbar">
          {city.days.map((d) => (
            <button
              key={d.id}
              onClick={() => navigate(`/city/${cityId}/day/${d.id}`)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all ${
                currentDayId === d.id 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-500'
              }`}
            >
              {/* 注意這裡：day.id 通常是 "day-1"，我們只取數字 */}
              {lang === 'zh' ? `第 ${d.id.split('-')[1]} 天` : `Day ${d.id.split('-')[1]}`}
            </button>
          ))}
        </div>
      </div>

      {/* 當前天數標題 */}
      <div className="p-6">
        <h1 className="text-2xl font-black text-gray-900">
          {day.title[lang]} {/* 這裡要用 [lang] 因為現在是物件 */}
        </h1>
        <p className="text-gray-400 text-sm font-medium">{day.date}</p>
      </div>

      {/* 地點列表 */}
      <div className="flex flex-col">
        {day.locations.map(loc => (
          <LocationCard key={loc.id} location={loc} lang={lang} />
        ))}
      </div>
    </div>
  );
}