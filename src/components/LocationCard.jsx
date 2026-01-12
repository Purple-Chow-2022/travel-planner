import { useState } from 'react';

export default function LocationCard({ location, lang }) {
  const [isOpen, setIsOpen] = useState(false);

  // 安全檢查：如果 location 不存在，不渲染任何內容
  if (!location) return null;

  // 修正座標與地圖連結
  const lat = location.coordinates?.lat || 31.2304;
  const lng = location.coordinates?.lng || 121.4737;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <>
      {/* 列表卡片 */}
      <div 
        onClick={() => setIsOpen(true)}
        className="flex gap-4 p-4 border-b border-gray-100 items-start bg-white active:bg-gray-50 cursor-pointer"
      >
        <div className="w-20 h-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
          <img 
            src={location.image} 
            className="w-full h-full object-cover" 
            onError={(e) => { e.target.src = 'https://placehold.co/200?text=No+Image'; }}
            alt=""
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-gray-900 truncate">
              {location.name?.[lang] || location.name}
            </h3>
            <span className="text-blue-500 text-[10px] font-bold border border-blue-200 px-1.5 py-0.5 rounded">MORE</span>
          </div>
          
          <div className="flex gap-1 mt-1 overflow-hidden">
            {location.tags?.map((tag, i) => (
              <span key={i} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded whitespace-nowrap">{tag}</span>
            ))}
          </div>

          <p className="text-xs text-gray-400 mt-2 truncate italic">
            {location.notes?.[lang]?.[0] || ""}
          </p>
        </div>
      </div>

      {/* 詳細資訊彈窗 (Modal) */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center">
          {/* 黑色背景遮罩 */}
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          
          {/* 彈窗主體 */}
          <div className="relative bg-white w-full max-w-md rounded-t-[32px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="h-48 w-full relative">
              <img src={location.image} className="w-full h-full object-cover" alt="" />
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 bg-black/40 text-white w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md"
              >✕</button>
            </div>

            <div className="p-6 pb-10">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1 pr-4">
                  <h2 className="text-2xl font-black text-gray-900 leading-tight">
                    {location.name?.[lang] || location.name}
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    {/* 修正：加上 [lang] */}
                    {location.address?.[lang] || location.address}
                  </p>
                </div>
                <a href={mapUrl} target="_blank" rel="noreferrer" className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 text-xl">
                  📍
                </a>
              </div>

              {/* 交通與筆記 */}
              <div className="space-y-4">
                {location.transport && (
                  <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
                    <p className="text-[10px] font-black text-orange-400 uppercase tracking-wider mb-1">Transport</p>
                    <div className="text-gray-700 text-sm font-bold flex items-center gap-2">
                      <span>{location.transport.mode === 'walk' ? '🚶' : '🚆'}</span>
                      {/* 修正：加上 [lang] */}
                      <span>{location.transport.notes?.[lang] || location.transport.notes}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-wider">Notes</p>
                  {location.notes?.[lang]?.map((note, i) => (
                    <div key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                      <span className="text-blue-300">•</span>
                      <span>{note}</span>
                    </div>
                  )) || (
                    <p className="text-sm text-gray-400">No notes available.</p>
                  )}
                </div>
              </div>

              <button 
                onClick={() => setIsOpen(false)}
                className="w-full mt-8 bg-gray-900 text-white py-4 rounded-2xl font-bold active:scale-95 transition-transform"
              >
                {lang === 'zh' ? '關閉' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}