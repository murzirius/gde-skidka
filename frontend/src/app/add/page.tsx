"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Camera, Upload } from "lucide-react";

export default function AddDiscountPage() {
  const [needsCard, setNeedsCard] = useState(false);
  const [minItemsRequired, setMinItemsRequired] = useState(false);

  return (
    <main className="min-h-screen bg-bg p-4 pb-24">
      <nav className="flex items-center gap-4 mb-6 pt-4">
        <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-surface text-text-muted">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold text-white">Добавить скидку</h1>
      </nav>

      <form className="space-y-6">
        {/* Загрузка фото */}
        <div className="w-full aspect-video bg-surface rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-2 text-text-muted cursor-pointer hover:border-primary/50 hover:text-primary transition-colors">
          <Camera className="w-8 h-8" />
          <span className="font-medium">Загрузить фото товара</span>
        </div>

        {/* Название и категория */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Название товара</label>
            <input 
              type="text" 
              placeholder="Например, Кофе Nescafe Gold 190г" 
              className="w-full bg-surface text-white rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary border border-white/5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Категория</label>
            <select className="w-full bg-surface text-white rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary border border-white/5 appearance-none">
              <option value="">Выберите категорию...</option>
              <option value="food">Продукты питания</option>
              <option value="alcohol">Алкоголь</option>
              <option value="chemistry">Бытовая химия</option>
              <option value="pets">Для животных</option>
            </select>
          </div>
        </div>

        {/* Цены */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Цена со скидкой, ₽</label>
            <input 
              type="number" 
              placeholder="0" 
              className="w-full bg-surface text-primary font-bold text-lg rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary border border-white/5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Старая цена, ₽</label>
            <input 
              type="number" 
              placeholder="0" 
              className="w-full bg-surface text-text-muted text-lg rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary border border-white/5 line-through decoration-gray-500"
            />
          </div>
        </div>

        {/* Галочки (Условия) */}
        <div className="space-y-4 bg-surface p-4 rounded-2xl border border-white/5">
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              checked={needsCard}
              onChange={(e) => setNeedsCard(e.target.checked)}
              className="w-5 h-5 rounded border-white/20 text-primary focus:ring-primary bg-[#2a2a2a] accent-primary"
            />
            <span className="text-white">Нужна карта клиента магазина?</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              checked={minItemsRequired}
              onChange={(e) => setMinItemsRequired(e.target.checked)}
              className="w-5 h-5 rounded border-white/20 text-primary focus:ring-primary bg-[#2a2a2a] accent-primary"
            />
            <span className="text-white">Скидка от определенного кол-ва?</span>
          </label>

          {/* Поле для ввода кол-ва, если включена вторая галочка */}
          {minItemsRequired && (
            <div className="pl-8 pt-2 animate-in fade-in slide-in-from-top-2">
              <label className="block text-sm text-text-muted mb-1.5">Минимальное кол-во товаров в чеке</label>
              <input 
                type="number" 
                min="2"
                placeholder="Например, 3" 
                className="w-full max-w-[150px] bg-[#2a2a2a] text-white rounded-xl py-2 px-4 outline-none focus:ring-2 focus:ring-primary border border-white/10"
              />
            </div>
          )}
        </div>

        {/* Кнопка отправки (фиксированная снизу) */}
        <div className="fixed bottom-0 left-0 w-full p-4 bg-bg/90 backdrop-blur-md border-t border-white/10">
          <button type="button" className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold text-lg py-4 rounded-2xl transition-colors shadow-lg shadow-primary/20">
            <Upload className="w-5 h-5" />
            Опубликовать скидку
          </button>
        </div>
      </form>
    </main>
  );
}
