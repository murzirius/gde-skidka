import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";

export default function StorePage() {
  return (
    <main className="min-h-screen bg-bg p-4 pb-20">
      {/* Навигация */}
      <nav className="flex items-center mb-6 pt-4">
        <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-surface text-text-muted">
          <ArrowLeft className="w-6 h-6" />
        </Link>
      </nav>

      {/* Шапка магазина */}
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold text-white">Пятёрочка</h1>
        <div className="flex items-center text-text-muted gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          <span>ул. Ленина, 12, Москва</span>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Акции в магазине</h2>
        
        {/* Карточка акции */}
        <Link href="/discount?id=1" className="block bg-surface p-3 rounded-2xl border border-white/5 shadow-sm active:scale-[0.98] transition-transform">
          <div className="flex gap-4">
            {/* Фото товара */}
            <div className="w-24 h-24 bg-[#2a2a2a] rounded-xl shrink-0 overflow-hidden relative">
              <img src="https://placehold.co/100x100/2a2a2a/ffffff?text=Кофе" alt="Кофе" className="w-full h-full object-cover" />
            </div>
            
            {/* Инфо товара */}
            <div className="flex-1 flex flex-col justify-between py-1">
              <h3 className="font-medium text-white line-clamp-2 leading-snug">Кофе растворимый Nescafe Gold 190г</h3>
              
              <div className="flex items-end gap-2 mt-2">
                <span className="text-2xl font-bold text-primary">349 ₽</span>
                <span className="text-sm text-text-muted line-through mb-1">699 ₽</span>
                <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-0.5 rounded-md mb-1 ml-auto">
                  -50%
                </span>
              </div>
            </div>
          </div>

          {/* Рейтинг наличия */}
          <div className="mt-4 pt-3 border-t border-white/5">
            <div className="flex justify-between text-xs text-text-muted mb-1.5">
              <span>Вероятность наличия</span>
              <span className="text-primary font-medium">85%</span>
            </div>
            <div className="h-1.5 w-full bg-[#2a2a2a] rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "85%" }}></div>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}
