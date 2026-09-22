"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { services } from "@/lib/services";

const PHONE = "+375 29 240-64-50";
const PHONE_CLEAN = "+375292406450";

export default function Footer() {
  const [form, setForm] = useState({ name: "", phone: "", msg: "" });
  const [sent, setSent] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };

  return (
    <footer id="contacts" className="bg-[#111110] grain">
      {/* Red phone bar */}
      <div className="bg-[#C41A1A]">
        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-5 flex flex-wrap items-center justify-between gap-4">
          <span className="font-display text-white uppercase tracking-[0.2em] text-sm">Готовы обсудить проект?</span>
          <a href={`tel:${PHONE_CLEAN}`} className="font-display text-white text-2xl hover:opacity-80 transition-opacity">
            {PHONE}
          </a>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-16">
          {/* Left */}
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10">
              <Image
                src="/images/logo-light.svg"
                alt="Бетонный Ритм — логотип"
                width={48}
                height={48}
                unoptimized
                className="shrink-0"
              />
              <div>
                <div className="font-display text-[#EDE8DF] uppercase tracking-widest text-lg">Бетонный Ритм</div>
                <div className="font-sans text-[#8A8074] uppercase tracking-[0.2em] text-[9px]">Фундаменты · Подъём домов</div>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6 border-l-2 border-[#C41A1A] pl-6 mb-10">
              <div>
                <div className="font-display text-[#C41A1A] uppercase tracking-widest text-[10px] mb-1">Адрес</div>
                <div className="font-serif text-[#D9D2C5] italic">г. Новолукомль, Витебская область, Республика Беларусь</div>
              </div>
              <div>
                <div className="font-display text-[#C41A1A] uppercase tracking-widest text-[10px] mb-1">Телефон</div>
                <a href={`tel:${PHONE_CLEAN}`} className="font-display text-[#EDE8DF] text-lg hover:text-[#C41A1A] transition-colors">
                  {PHONE}
                </a>
              </div>
              <div>
                <div className="font-display text-[#C41A1A] uppercase tracking-widest text-[10px] mb-1">Режим работы</div>
                <div className="font-serif text-[#D9D2C5] italic">Понедельник–Суббота: 8:00–19:00</div>
              </div>
              <div>
                <div className="font-display text-[#C41A1A] uppercase tracking-widest text-[10px] mb-2">Соцсети</div>
                <div className="flex flex-wrap gap-5">
                  <a
                    href="https://t.me/artem_shlaxtenok"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-display text-[#EDE8DF] hover:text-[#C41A1A] transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M21.9 4.3 19 19.4c-.2 1-.8 1.2-1.6.8l-4.5-3.3-2.2 2.1c-.2.2-.4.4-.9.4l.3-4.6L18.7 7c.4-.3-.1-.5-.6-.2L7.7 13.4l-4.4-1.4c-1-.3-1-1 .2-1.4l17-6.6c.8-.3 1.5.2 1.4 1.3Z"/>
                    </svg>
                    @artem_shlaxtenok
                  </a>
                  <a
                    href="https://www.instagram.com/shlaxtenok_artem/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-display text-[#EDE8DF] hover:text-[#C41A1A] transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <rect x="2.5" y="2.5" width="19" height="19" rx="5"/>
                      <circle cx="12" cy="12" r="4.5"/>
                      <circle cx="17.8" cy="6.2" r="1.2" fill="currentColor" stroke="none"/>
                    </svg>
                    @shlaxtenok_artem
                  </a>
                </div>
              </div>
            </div>

            {/* Services links (SEO) */}
            <div className="mb-10">
              <div className="font-display text-[#8A8074] uppercase tracking-widest text-[10px] mb-3">Услуги</div>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {services.map((s) => (
                  <Link key={s.slug} href={`/uslugi/${s.slug}`}
                    className="font-serif italic text-[#8A8074] hover:text-[#C41A1A] text-xs transition-colors">
                    {s.h1}
                  </Link>
                ))}
                <Link href="/uslugi"
                  className="font-serif italic text-[#8A8074] hover:text-[#C41A1A] text-xs transition-colors">
                  Все услуги
                </Link>
              </div>
            </div>

            {/* Payment */}
            <div>
              <div className="font-display text-[#8A8074] uppercase tracking-widest text-[10px] mb-3">Форма оплаты</div>
              <div className="flex gap-3 flex-wrap">
                {["Наличные", "Безналичный расчёт (р/с)"].map(label => (
                  <div key={label} className="flex items-center gap-2 border border-[#2D2B28] px-4 py-2">
                    <div className="w-2 h-2 bg-[#C41A1A] rotate-45 shrink-0" />
                    <span className="font-sans text-[#8A8074] text-xs">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <div className="font-display text-[#EDE8DF] uppercase tracking-widest text-xl mb-1">Написать нам</div>
            <div className="font-serif text-[#8A8074] italic text-sm mb-8">Опишите задачу — сделаем бесплатный расчёт</div>

            {sent ? (
              <div className="py-12 text-center border border-[#2D2B28]">
                <div className="w-12 h-12 border border-[#C41A1A] flex items-center justify-center mx-auto mb-4">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10l4 4 8-8" stroke="#C41A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="font-display text-[#EDE8DF] uppercase tracking-wider">Сообщение отправлено</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { key: "name", label: "Имя", placeholder: "Иван Петров", type: "text" },
                  { key: "phone", label: "Телефон", placeholder: "+375 XX XXX-XX-XX", type: "tel" },
                ].map(({ key, label, placeholder, type }) => (
                  <div key={key}>
                    <label className="font-display uppercase tracking-[0.25em] text-[#8A8074] text-[9px] block mb-2">{label}</label>
                    <input
                      type={type}
                      required
                      value={form[key as keyof typeof form]}
                      onChange={e => setForm({...form, [key]: e.target.value})}
                      placeholder={placeholder}
                      className="w-full bg-transparent border-b border-[#2D2B28] focus:border-[#C41A1A] text-[#EDE8DF] placeholder-[#3a3a3a] pb-2 text-sm outline-none transition-colors font-serif italic"
                    />
                  </div>
                ))}
                <div>
                  <label className="font-display uppercase tracking-[0.25em] text-[#8A8074] text-[9px] block mb-2">Сообщение</label>
                  <textarea
                    value={form.msg}
                    onChange={e => setForm({...form, msg: e.target.value})}
                    placeholder="Опишите объект и задачу..."
                    rows={4}
                    className="w-full bg-transparent border-b border-[#2D2B28] focus:border-[#C41A1A] text-[#EDE8DF] placeholder-[#3a3a3a] pb-2 text-sm outline-none transition-colors font-serif italic resize-none"
                  />
                </div>
                <button type="submit"
                  className="w-full bg-[#C41A1A] hover:bg-[#9C1515] text-white font-display uppercase tracking-widest text-[11px] py-4 transition-colors mt-2">
                  Отправить заявку
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#1A1917] px-8 sm:px-12 py-5 max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-3">
        <span className="font-sans text-[#3a3a3a] text-[10px] uppercase tracking-widest">© 2024 Бетонный Ритм</span>
        <span className="font-sans text-[#3a3a3a] text-[10px] uppercase tracking-widest">Новолукомль · Беларусь</span>
      </div>
    </footer>
  );
}
