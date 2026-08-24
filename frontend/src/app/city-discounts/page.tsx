import Link from "next/link";
import { ArrowLeft, Search, MapPin, Tag } from "lucide-react";

export default function CityDiscountsPage() {
  return (
    <main className="min-h-screen bg-bg p-4 pb-20">
      <nav className="flex items-center gap-4 mb-6 pt-4">
        <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-surface text-text-muted">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold text-white">Акции рядом</h1>
      </nav>

      {/* Поиск и переход к магазину */}
      <div className="space-y-4 mb-8">
        <Link href="/" className="w-full flex items-center justify-center gap-2 bg-surface hover:bg-[#2a2a2a] text-primary border border-primary/20 font-medium py-3 rounded-xl transition-colors">
          <MapPin className="w-5 h-5" />
          Перейти к поиску магазина
        </Link>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Найдите товар по названию..." 
            className="w-full bg-surface text-white rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary transition-all border border-white/5"
          />
        </div>
      </div>

      {/* Категории */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-white mb-4">Лучшие предложения в категориях</h2>
        <div className="flex overflow-x-auto gap-3 pb-2 snap-x hide-scrollbar">
          {["Продукты", "Алкоголь", "Бытовая химия", "Для животных"].map((cat) => (
            <button key={cat} className="snap-start shrink-0 bg-surface border border-white/5 px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium text-white hover:border-primary/50 transition-colors">
              <Tag className="w-4 h-4 text-primary" />
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Лучшие акции */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Лучшие акции города</h2>
        
        {[1, 2, 3, 4, 5].map((item) => (
          <Link key={item} href={`/discount?id=${item}`} className="block bg-surface p-3 rounded-2xl border border-white/5 shadow-sm active:scale-[0.98] transition-transform">
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-[#2a2a2a] rounded-xl shrink-0 overflow-hidden relative">
                <img src={`https://placehold.co/100x100/2a2a2a/ffffff?text=Товар+${item}`} alt="Товар" className="w-full h-full object-cover" />
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-bl-lg">
                  -50%
                </div>
              </div>
              
              <div className="flex-1 flex flex-col py-1">
                <h3 className="font-medium text-white text-sm line-clamp-2 leading-snug mb-1">Шоколад Milka молочный 90г</h3>
                
                <p className="text-xs text-text-muted mb-2 flex flex-col gap-0.5">
                  <span className="font-medium text-gray-300">Пятёрочка</span>
                  <span>ул. Ленина, 12 • 200 м</span>
                </p>

                <div className="flex items-end gap-2 mt-auto">
                  <span className="text-lg font-bold text-primary">59 ₽</span>
                  <span className="text-xs text-text-muted line-through mb-0.5">119 ₽</span>
                </div>
              </div>
            </div>
          </Link>
        ))}

        <button className="w-full py-3 mt-2 text-primary font-medium text-sm hover:underline">
          Показать еще 5
        </button>
      </div>
    </main>
  );
}
