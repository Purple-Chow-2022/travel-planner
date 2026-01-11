import { Link, useParams } from 'react-router-dom';
import tripData from '../data/trip.json';

export default function CityView({ lang }) {
  const { cityId } = useParams();
  
  // Look up the city based on the ID in the URL
  const city = tripData.trip.cities.find(c => c.id === cityId);

  // If the ID in the URL doesn't match the JSON, show an error
  if (!city) {
    return <div className="p-10">City "{cityId}" not found. Check your JSON IDs!</div>;
  }

  return (
    <div className="p-6">
      <Link to="/" className="text-blue-600 text-sm mb-4 block">
        ← {lang === 'zh' ? '返回' : 'Back'}
      </Link>
      
      <h1 className="text-3xl font-bold mb-6">{city.name[lang]}</h1>
      
      <div className="space-y-3">
        {city.days.map(day => (
          <Link 
            key={day.id} 
            to={`/city/${cityId}/day/${day.id}`} 
            className="block p-4 border rounded-xl hover:bg-gray-50"
          >
            <h3 className="font-bold">{day.title[lang]}</h3>
            <p className="text-sm text-gray-500">{day.date}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}