"use client";

import Image from "next/image";
import { useState } from "react";

export default function HeroSection() {
  const [form, setForm] = useState({ name: "", phone: "", service: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          detail: form.service,
          source: "Расчёт стоимости (главная)",
        }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("Не удалось отправить заявку. Позвоните нам: +375 29 240-64-50");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="pt-14 min-h-screen bg-[#EDE8DF] grain overflow-hidden relative">
      {/* Giant background number */}
      <div className="absolute right-0 top-8 font-display text-stroke select-none pointer-events-none leading-none"
        style={{ fontSize: "clamp(180px, 28vw, 420px)", opacity: 0.06 }}>
        7
      </div>

      {/* Red diagonal band */}
      <div className="absolute left-0 right-0 top-14 h-1 bg-[#C41A1A]" />
      <div className="absolute left-0 w-2 top-14 bottom-0 bg-[#C41A1A]" />

      <div className="max-w-[1440px] mx-auto px-8 sm:px-12 pt-16 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-0 lg:gap-16 items-start">
          {/* Left */}
          <div>
            {/* Label */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-16 h-0.5 bg-[#C41A1A]" />
              <span className="font-sans font-bold uppercase tracking-[0.25em] text-[#C41A1A] text-[10px]">
                г. Новолукомль · с 2019 года
              </span>
            </div>

            {/* Headline — constructivist stagger */}
            <div className="mb-4">
              <div className="font-display uppercase leading-[0.88] text-[#111110]"
                style={{ fontSize: "clamp(52px, 9vw, 140px)" }}>
                Подъём
              </div>
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 sm:w-28 sm:h-28 bg-[#C41A1A] shrink-0 flex items-end p-2">
                  <span className="font-display text-white text-[10px] uppercase tracking-widest leading-tight">Фундамент<br />замена</span>
                </div>
                <div className="font-display uppercase leading-[0.88] text-[#111110]"
                  style={{ fontSize: "clamp(52px, 9vw, 140px)" }}>
                  домов
                </div>
              </div>
              <div className="font-display uppercase leading-[0.88] text-stroke-red mt-1"
                style={{ fontSize: "clamp(52px, 9vw, 140px)" }}>
                Бетон
              </div>
            </div>

            {/* Body */}
            <div className="max-w-xl ml-0 lg:ml-4 mt-8">
              <p className="font-serif text-[#2D2B28] text-lg leading-relaxed mb-6 italic">
                Комплексные работы по подъёму, выравниванию и замене фундаментов
                жилых и нежилых строений. Выезд геодезиста и смета — бесплатно.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-[#C41A1A] rotate-45 shrink-0" />
                <span className="font-display uppercase tracking-widest text-[11px] text-[#C41A1A]">
                  Бесплатная геодезия объекта
                </span>
              </div>
            </div>

            {/* Stats row */}
            <div className="mt-12 grid grid-cols-3 border-t-2 border-[#111110] pt-8 gap-px bg-[#C2BAA8]">
              {[
                { n: "7", unit: "лет", sub: "на рынке" },
                { n: "340", unit: "+", sub: "объектов" },
                { n: "50", unit: "лет", sub: "гарантия" },
              ].map((s) => (
                <div key={s.sub} className="bg-[#EDE8DF] pr-6 pb-2">
                  <div className="font-display leading-none" style={{ fontSize: "clamp(40px, 5vw, 72px)" }}>
                    {s.n}<span className="text-[#C41A1A]">{s.unit}</span>
                  </div>
                  <div className="font-sans font-bold uppercase tracking-[0.2em] text-[#8A8074] text-[10px] mt-1">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="mt-12 lg:mt-10 relative">
            {/* Offset shadow */}
            <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[#C41A1A]" />
            <div className="relative bg-[#111110] p-7 sm:p-8">
              <div className="font-display text-white uppercase text-lg tracking-widest mb-1">
                Расчёт стоимости
              </div>
              <div className="font-serif text-[#C2BAA8] text-sm italic mb-6">Ответим за 30 минут</div>

              {sent ? (
                <div className="py-10 text-center">
                  <div className="w-12 h-12 border-2 border-[#C41A1A] flex items-center justify-center mx-auto mb-4">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10l4 4 8-8" stroke="#C41A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="font-display text-white text-base uppercase tracking-wider">Заявка принята</div>
                  <div className="font-serif text-[#8A8074] text-sm italic mt-2">Скоро позвоним</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { key: "name", label: "Имя", placeholder: "Иван Петров", type: "text" },
                    { key: "phone", label: "Телефон", placeholder: "+375 XX XXX-XX-XX", type: "tel" },
                  ].map(({ key, label, placeholder, type }) => (
                    <div key={key}>
                      <label className="font-sans font-bold uppercase tracking-[0.2em] text-[#8A8074] text-[9px] block mb-1.5">{label}</label>
                      <input
                        type={type}
                        required
                        value={form[key as keyof typeof form]}
                        onChange={e => setForm({ ...form, [key]: e.target.value })}
                        placeholder={placeholder}
                        className="w-full bg-transparent border-b-2 border-[#3a3a3a] focus:border-[#C41A1A] text-white placeholder-[#555550] pb-2 text-sm outline-none transition-colors font-sans"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="font-sans font-bold uppercase tracking-[0.2em] text-[#8A8074] text-[9px] block mb-1.5">Вид работ</label>
                    <select
                      value={form.service}
                      onChange={e => setForm({ ...form, service: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-[#3a3a3a] focus:border-[#C41A1A] text-white pb-2 text-sm outline-none transition-colors font-sans appearance-none"
                    >
                      <option value="" className="bg-[#111110]">Выберите</option>
                      <option className="bg-[#111110]">Ленточный фундамент</option>
                      <option className="bg-[#111110]">Столбчатый фундамент</option>
                      <option className="bg-[#111110]">Монолитные работы</option>
                      <option className="bg-[#111110]">Ремонт фундамента</option>
                      <option className="bg-[#111110]">Подъём дома</option>
                    </select>
                  </div>
                  {error && (
                    <div className="border border-[#C41A1A] px-4 py-3 font-sans text-[#C41A1A] text-xs">
                      {error}
                    </div>
                  )}
                  <div className="pt-4">
                    <button type="submit" disabled={sending}
                      className="w-full bg-[#C41A1A] hover:bg-[#9C1515] text-white font-display uppercase tracking-widest text-[11px] py-4 transition-colors disabled:opacity-60">
                      {sending ? "Отправляем..." : "Получить расчёт бесплатно"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom photo strip */}
      <div className="relative h-48 sm:h-64 overflow-hidden mt-0 border-t-4 border-[#111110]">
        <Image

          src="/images/beton-ritm.webp"
          alt="Строительная площадка"
          fill
          sizes="100vw"
          className="w-full h-full object-cover"
          style={{ filter: "grayscale(60%) contrast(1.1)" }}
          priority
        />
        <div className="absolute inset-0 bg-[#EDE8DF]/30 mix-blend-multiply" />
        {/* Overlay text */}
        <div className="hidden-below-1000 absolute bottom-4 left-8 font-display uppercase tracking-widest text-white text-xs opacity-80">
          Новолукомль · Витебская область
        </div>
      </div>
    </section>
  );
}
