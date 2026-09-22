"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const PHONE = "+375 29 240-64-50";
const PHONE_CLEAN = "+375292406450";

const NAV = [
  ["/uslugi", "Услуги"],
  ["#advantage", "Подъём домов"],
  ["#portfolio", "Портфолио"],
  ["#contacts", "Контакты"],
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#EDE8DF]/96 backdrop-blur-sm border-b-4 border-[#111110]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-0 shrink-0">
          <Image
            src="/images/logo.svg"
            alt="Бетонный Ритм — логотип"
            width={40}
            height={40}
            priority
            unoptimized
            className="mr-3 shrink-0"
          />
          <div>
            <div className="font-display text-[#111110] text-sm leading-none tracking-wider uppercase">Бетонный</div>
            <div className="font-display text-[#C41A1A] text-sm leading-none tracking-wider uppercase">Ритм</div>
          </div>
        </a>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-8 font-sans font-bold uppercase tracking-[0.15em] text-[11px] text-[#8A8074]">
          {NAV.map(([href, label]) => (
            <Link key={href} href={href} className="hover:text-[#C41A1A] transition-colors border-b border-transparent hover:border-[#C41A1A] pb-0.5">
              {label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">
          <a href={`tel:${PHONE_CLEAN}`} className="hidden sm:block font-display text-[#111110] text-sm tracking-wide hover:text-[#C41A1A] transition-colors">
            {PHONE}
          </a>
          <a href="#contacts" className="bg-[#C41A1A] hover:bg-[#9C1515] text-white font-display uppercase tracking-widest text-[10px] px-4 py-2.5 transition-colors">
            Звонок
          </a>
          <button className="md:hidden p-1" onClick={() => setOpen(!open)} aria-label="Меню">
            <div className="w-5 h-0.5 bg-[#111110] mb-1.5" />
            <div className="w-5 h-0.5 bg-[#111110] mb-1.5" />
            <div className="w-5 h-0.5 bg-[#111110]" />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-[#EDE8DF] border-t-2 border-[#111110] px-6 py-5 space-y-4">
          <a href={`tel:${PHONE_CLEAN}`} className="block font-display text-[#C41A1A] text-lg">{PHONE}</a>
          {NAV.map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} className="block font-display uppercase tracking-widest text-sm text-[#111110] hover:text-[#C41A1A]">{label}</Link>
          ))}
        </div>
      )}
    </header>
  );
}
