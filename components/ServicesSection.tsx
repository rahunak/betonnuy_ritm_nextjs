import Link from "next/link";
import { services } from "@/lib/services";

export default function ServicesSection() {
  return (
    <section id="services" className="bg-[#111110] py-24 grain relative overflow-hidden">
      {/* Big BG number */}
      <div className="absolute right-8 top-0 font-display leading-none select-none pointer-events-none text-stroke"
           style={{ fontSize: "clamp(200px,30vw,450px)", opacity: 0.04, WebkitTextStrokeColor: "#EDE8DF" }}>
        04
      </div>

      <div className="max-w-[1440px] mx-auto px-8 sm:px-12 relative z-10">
        {/* Section header */}
        <div className="flex items-end gap-8 mb-16 border-b border-[#2D2B28] pb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-0.5 bg-[#C41A1A]" />
              <span className="font-sans font-bold uppercase tracking-[0.25em] text-[#C41A1A] text-[10px]">Услуги и цены</span>
            </div>
            <h2 className="font-display text-[#EDE8DF] uppercase leading-none"
                style={{ fontSize: "clamp(36px,6vw,80px)" }}>
              Что мы<br />строим
            </h2>
          </div>
          <p className="hidden md:block font-serif text-[#8A8074] italic text-base max-w-xs ml-auto mb-2 leading-relaxed">
            Точная стоимость — после выезда геодезиста. Замер и смета бесплатно.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-px bg-[#2D2B28]">
          {services.map((s) => (
            <Link key={s.slug} href={`/uslugi/${s.slug}`}
              className="bg-[#111110] p-8 flex flex-col group hover:bg-[#1A1917] transition-colors relative">
              {s.tag && (
                <div className="absolute top-0 right-0 bg-[#C41A1A] text-white font-display uppercase tracking-widest text-[9px] px-3 py-1.5">
                  {s.tag}
                </div>
              )}
              {/* Number */}
              <div className="font-display text-[#2D2B28] group-hover:text-[#C41A1A]/20 leading-none mb-6 transition-colors"
                   style={{ fontSize: "clamp(56px, 5vw, 80px)" }}>
                {s.num}
              </div>

              <div className="border-t border-[#2D2B28] pt-6 flex-1 flex flex-col gap-4">
                <h3 className="font-display text-[#EDE8DF] uppercase leading-tight text-base tracking-wide">
                  {s.h1}
                </h3>
                <p className="font-serif text-[#8A8074] italic text-sm leading-relaxed flex-1">
                  {s.short}
                </p>
                <div>
                  <span className="font-display text-[#C41A1A]" style={{ fontSize: "clamp(28px,3vw,40px)" }}>
                    {s.price}
                  </span>
                  <span className="font-sans text-[#8A8074] text-xs ml-2 uppercase tracking-wider">{s.unit}</span>
                </div>
                <span
                   className="mt-2 border border-[#2D2B28] group-hover:border-[#C41A1A] text-[#8A8074] group-hover:text-[#C41A1A] font-display uppercase tracking-widest text-[10px] py-3 text-center transition-all">
                  Подробнее
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
