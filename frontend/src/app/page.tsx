"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin, Search } from "lucide-react";

// Динамический импорт карты, так как Leaflet требует объект window (работает только в браузере)
const MapBackground = dynamic(() => import("./components/MapBackground"), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#121212]" /> // Заглушка, пока карта грузится
});

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Контейнер для Карты (OpenStreetMap) */}
      <div className="absolute inset-0 z-0">
        <MapBackground />
      </div>

      {/* Затемнение/Градиент, чтобы текст читался поверх карты */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-black/80 via-black/40 to-black/80" />

      {/* UI поверх карты */}
      <div className="z-10 flex flex-col items-center justify-center flex-1 w-full max-w-md mx-auto space-y-12 p-6 pointer-events-auto">
        
        {/* Заголовок */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
            Где скидка?
          </h1>
          <p className="text-gray-200 text-lg drop-shadow-md">
            Ваш путеводитель скидок в городе
          </p>
        </div>

        {/* Форма поиска магазина */}
        <div className="w-full bg-surface/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/10 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Введите адрес магазина..." 
              className="w-full bg-black/50 text-white rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary transition-all border border-white/5"
            />
          </div>
          
          <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-xl transition-colors shadow-lg shadow-primary/20">
            <MapPin className="w-5 h-5" />
            Найти на карте
          </button>
        </div>

        {/* Кнопка перехода к списку */}
        <Link 
          href="/city-discounts" 
          className="w-full text-center py-4 rounded-xl border border-primary/50 text-white bg-black/40 hover:bg-primary/20 backdrop-blur-md transition-colors font-medium text-lg shadow-lg"
        >
          Перейти к списку акций
        </Link>
      </div>
    </main>
  );
}
