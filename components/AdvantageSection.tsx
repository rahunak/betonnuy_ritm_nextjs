import Image from "next/image";

export default function AdvantageSection() {
  return (
    <section id="advantage" className="bg-[#EDE8DF] grain relative overflow-hidden">
      {/* Top red bar */}
      <div className="h-2 bg-[#C41A1A]" />

      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left: text */}
          <div className="px-8 sm:px-12 py-20 relative">
            {/* Vertical label */}
            <div className="hidden lg:flex absolute left-0 top-0 bottom-0 w-10 bg-[#C41A1A] items-center justify-center">
              <span className="rotate-text font-display text-white uppercase tracking-[0.3em] text-[9px] whitespace-nowrap">
                Ключевое преимущество
              </span>
            </div>

            <div className="lg:pl-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-[#C41A1A] rotate-45" />
                <span className="font-sans font-bold uppercase tracking-[0.25em] text-[#C41A1A] text-[10px]">Полный цикл</span>
              </div>

              <h2 className="font-display text-[#111110] uppercase leading-[0.9] mb-8"
                style={{ fontSize: "clamp(37px,5.5vw,85px)" }}>
                Подъём<br />
                дома<br />
                <span className="text-stroke-red">с заменой</span><br />
                фундамента
              </h2>

              <p className="font-serif text-[#2D2B28] italic text-lg leading-relaxed mb-10 max-w-md">
                Работаем с аварийными домами любой сложности.
                Производим выравнивание прогнивших углов с заменой венцов и фундамента.
                Звоните — поможем сохранить ваш дом, либо память о ваших родных и близких.
                Строим как для своих!
                С нами — без шума и пыли!
              </p>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-px bg-[#C2BAA8] border border-[#C2BAA8]">
                {[
                  { n: "250 т", l: "Макс. вес строения" },
                  { n: "1 сезон", l: "Срок полного цикла" },
                  { n: "0 мм", l: "Допустимый перекос" },
                  { n: "50 лет", l: "Гарантийный срок" },
                ].map(item => (
                  <div key={item.l} className="bg-[#EDE8DF] p-5">
                    <div className="font-display text-[#C41A1A]" style={{ fontSize: "clamp(24px,3vw,36px)" }}>{item.n}</div>
                    <div className="font-sans text-[#8A8074] text-[10px] uppercase tracking-widest mt-1">{item.l}</div>
                  </div>
                ))}
              </div>

              <a href="#contacts"
                className="inline-block mt-8 bg-[#111110] hover:bg-[#C41A1A] text-white font-display uppercase tracking-widest text-[11px] px-8 py-4 transition-colors">
                Узнать стоимость
              </a>
            </div>
          </div>

          {/* Right: photo */}
          <div className="relative min-h-[400px] lg:min-h-0">
            <Image
              src="/images/hero.jpeg"
              alt="Подъём дома"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              style={{ filter: "grayscale(40%) contrast(1.05)" }}
            />
            {/* Red overlay stripe */}
            <div className="absolute top-0 bottom-0 left-0 w-2 bg-[#C41A1A]" />
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-[#111110]/80 px-6 py-4">
              <div className="font-display text-white uppercase tracking-widest text-xs">
                Объект: деревянный дом 120 м², д. Подберёзье
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
