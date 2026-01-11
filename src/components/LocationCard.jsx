export default function LocationCard({ location, lang }) {
  return (
    <div className="flex gap-4 p-4 border-b border-gray-100 items-start bg-white">
      
      {/* Photo from Link */}
      <div className="w-24 h-24 shrink-0 overflow-hidden rounded-xl bg-gray-100">
        <img 
          src={location.image} 
          alt={location.name[lang]} 
          className="w-full h-full object-cover"
          // This handles broken links gracefully
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = "https://placehold.co/200x200?text=No+Photo";
          }}
        />
      </div>

      {/* Text Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-gray-900 truncate">
          {location.name[lang]}
        </h3>
        
        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-bold uppercase">
            {location.category === 'restaurant' ? '🍜' : '📍'} 
            {lang === 'zh' ? (location.category === 'restaurant' ? '餐廳' : '景點') : location.category}
          </span>
        </div>

        <ul className="mt-2 space-y-1">
          {location.notes[lang].map((note, index) => (
            <li key={index} className="text-sm text-gray-500 flex items-start gap-2">
              <span className="text-gray-300 mt-1">•</span>
              <span className="leading-tight">{note}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}