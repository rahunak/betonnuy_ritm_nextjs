"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const WORK_TYPES = [
  "Ленточный фундамент",
  "Столбчатый фундамент",
  "Монолитные работы",
  "Ремонт фундамента",
  "Подъём дома",
];

export default function HeroSection() {
  const [form, setForm] = useState<{ name: string; phone: string; services: string[] }>({
    name: "",
    phone: "",
    services: [],
  });
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  // Закрытие дропдауна по клику вне и по Escape
  useEffect(() => {
    if (!servicesOpen) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [servicesOpen]);

  const toggleService = (value: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(value)
        ? prev.services.filter((s) => s !== value)
        : [...prev.services, value],
    }));
  };

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
          detail: form.services.length ? `Виды работ: ${form.services.join(", ")}` : "",
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
              <div className="font-serif text-[#C2BAA8] text-sm italic mb-6">Ответим за 60 минут</div>

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
                  <div ref={servicesRef} className="relative">
                    <label className="font-sans font-bold uppercase tracking-[0.2em] text-[#8A8074] text-[9px] block mb-1.5">Виды работ</label>
                    <button
                      type="button"
                      onClick={() => setServicesOpen(open => !open)}
                      aria-haspopup="listbox"
                      aria-expanded={servicesOpen}
                      className="w-full flex items-center justify-between gap-3 bg-transparent border-b-2 border-[#3a3a3a] focus:border-[#C41A1A] text-left text-white pb-2 text-sm outline-none transition-colors font-sans cursor-pointer"
                    >
                      <span className={form.services.length ? "" : "text-[#555550]"}>
                        {form.services.length === 0
                          ? "Выберите (можно несколько)"
                          : form.services.length === 1
                            ? form.services[0]
                            : `Выбрано: ${form.services.length}`}
                      </span>
                      <svg
                        width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"
                        className={`shrink-0 text-[#8A8074] transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                      >
                        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {servicesOpen && (
                      <ul
                        role="listbox"
                        aria-multiselectable="true"
                        aria-label="Виды работ"
                        className="absolute left-0 right-0 top-full mt-2 z-20 bg-[#111110] border border-[#3a3a3a] shadow-[4px_4px_0_#C41A1A]"
                      >
                        {WORK_TYPES.map(work => {
                          const checked = form.services.includes(work);
                          return (
                            <li key={work} role="option" aria-selected={checked}>
                              <button
                                type="button"
                                onClick={() => toggleService(work)}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-sans transition-colors cursor-pointer ${checked ? "text-[#C41A1A]" : "text-white hover:bg-[#1d1c1a]"}`}
                              >
                                <span
                                  aria-hidden="true"
                                  className={`w-4 h-4 shrink-0 border flex items-center justify-center transition-colors ${
                                    checked ? "bg-[#C41A1A] border-[#C41A1A]" : "border-[#555550]"
                                  }`}
                                >
                                  {checked && (
                                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                      <path d="M1 4l2.5 2.5L9 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  )}
                                </span>
                                {work}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
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
