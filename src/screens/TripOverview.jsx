import { Link } from 'react-router-dom';
import tripData from '../data/trip.json';

export default function TripOverview({ lang }) {
  const { trip } = tripData;

  // Safety check: If trip data hasn't loaded
  if (!trip) return <div className="p-10 text-center">Loading Trip...</div>;

  return (
    <div className="p-6 max-w-md mx-auto">
      {/* Notice the [lang] here */}
      <h1 className="text-3xl font-bold mb-2">{trip.title[lang]}</h1>
      <p className="text-gray-500 mb-8">{trip.startDate} — {trip.endDate}</p>
      
      <h2 className="text-xl font-semibold mb-4">
        {lang === 'en' ? 'Itinerary' : '行程規劃'}
      </h2>

      <div className="space-y-4">
        {trip.cities.map(city => (
          <Link 
            key={city.id} 
            to={`/city/${city.id}`} 
            className="block p-4 border rounded-xl hover:bg-gray-50 transition-colors"
          >
            {/* Notice the [lang] here */}
            <h3 className="font-bold text-lg">✈️ {city.name[lang]}</h3>
            <span className="text-sm text-gray-500">
              {city.days.length} {lang === 'en' ? 'Days' : '天'}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}