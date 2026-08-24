import Link from "next/link";
import { ArrowLeft, Store, Flag, Check, X } from "lucide-react";

export default function DiscountPage() {
  return (
    <main className="min-h-screen bg-bg pb-24">
      {/* Шапка с фото */}
      <div className="relative h-72 bg-[#2a2a2a] w-full">
        <Link href="/store?id=1" className="absolute top-4 left-4 z-10 p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <img src="https://placehold.co/600x400/2a2a2a/ffffff?text=Фото+Скидки" alt="Скидка" className="w-full h-full object-cover" />
      </div>

      <div className="p-5 space-y-6 -mt-6 relative bg-bg rounded-t-3xl">
        {/* Цена и размер скидки */}
        <div className="flex items-center gap-3">
          <span className="text-4xl font-extrabold text-primary">349 ₽</span>
          <div className="flex flex-col">
            <span className="text-lg text-text-muted line-through leading-none">699 ₽</span>
            <span className="bg-primary/20 text-primary text-sm font-bold px-2 py-0.5 rounded mt-1 w-fit">
              Выгода 50%
            </span>
          </div>
        </div>

        {/* Название */}
        <h1 className="text-2xl font-bold text-white leading-tight">
          Кофе растворимый Nescafe Gold 190г
        </h1>

        {/* Информация */}
        <div className="space-y-4 py-4 border-y border-white/5">
          <Link href="/store?id=1" className="flex items-center gap-3 p-3 bg-surface rounded-xl text-white">
            <div className="bg-[#2a2a2a] p-2 rounded-lg">
              <Store className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Пятёрочка</p>
              <p className="text-sm text-text-muted">ул. Ленина, 12 • ~200 м</p>
            </div>
          </Link>
          
          <div className="text-sm text-text-muted space-y-2">
            <p>• Требуется карта клиента: <span className="text-white">Да</span></p>
            <p>• Добавлено: <span className="text-white">Сегодня в 10:00</span></p>
          </div>
        </div>

        {/* Жалоба */}
        <button className="flex items-center gap-2 text-text-muted hover:text-white transition-colors text-sm mx-auto pt-2">
          <Flag className="w-4 h-4" />
          Пожаловаться
        </button>

        {/* Голосование (прибито к низу на мобилках) */}
        <div className="fixed bottom-0 left-0 w-full p-4 bg-bg/80 backdrop-blur-xl border-t border-white/10">
          <div className="flex gap-3 max-w-md mx-auto">
            <button className="flex-1 bg-surface hover:bg-[#2a2a2a] text-white py-4 rounded-2xl flex flex-col items-center gap-1 transition-colors border border-white/5">
              <X className="w-6 h-6 text-red-500" />
              <span className="font-medium text-sm">Уже нет</span>
            </button>
            <button className="flex-1 bg-primary hover:bg-primary-dark text-white py-4 rounded-2xl flex flex-col items-center gap-1 transition-colors">
              <Check className="w-6 h-6" />
              <span className="font-medium text-sm">Ещё есть</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
