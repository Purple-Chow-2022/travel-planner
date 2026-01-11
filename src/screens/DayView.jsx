import { useParams, Link, useNavigate } from 'react-router-dom';
import tripData from '../data/trip.json';
import LocationCard from '../components/LocationCard';

export default function DayView({ lang }) {
  const { cityId, dayId } = useParams();
  const navigate = useNavigate();
  
  const city = tripData.trip.cities.find(c => c.id === cityId);
  
  // Default to Day 1 if the URL is messy
  const currentDayId = dayId || city?.days[0]?.id;
  const day = city?.days.find(d => d.id === currentDayId);

  if (!city || !day) return <div className="p-10 text-center">Data not found</div>;

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Sticky Header with Day Chips */}
      <div className="sticky top-0 bg-white border-b z-20">
        <div className="p-4 pb-2 flex justify-between items-center">
           <Link to="/" className="text-blue-600 text-sm">← {lang === 'zh' ? '行程' : 'Trip'}</Link>
           <h2 className="font-bold text-gray-800">{city.name[lang]}</h2>
           <div className="w-10"></div> {/* Spacer for balance */}
        </div>

        {/* Horizontal Chip Scroll */}
        <div className="flex overflow-x-auto px-4 pb-4 gap-2 no-scrollbar">
          {city.days.map((d) => (
            <button
              key={d.id}
              onClick={() => navigate(`/city/${cityId}/day/${d.id}`)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all ${
                currentDayId === d.id 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {lang === 'zh' ? `第 ${d.id.replace('day-', '')} 天` : `Day ${d.id.replace('day-', '')}`}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Day Title */}
      <div className="px-4 py-6 bg-gray-50">
        <h1 className="text-2xl font-black text-gray-900">{day.title[lang]}</h1>
        <p className="text-gray-500 text-sm">{day.date}</p>
      </div>

      {/* 3. Location List */}
      <div className="flex flex-col">
        {day.locations.map(loc => (
          <LocationCard key={loc.id} location={loc} lang={lang} />
        ))}
      </div>
    </div>
  );
}