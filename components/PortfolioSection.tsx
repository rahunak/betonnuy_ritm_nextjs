import Image from "next/image";

const portfolio = [
  { img: "/images/grid/lentochnyi_fundament.jpg", title: "Ленточный фундамент", sub: "д. Подберёзье, 2024" },
  { img: "/images/grid/upping.jpg", title: "Замена фундамента", sub: "г. Новолукомль, 2024" },
  { img: "/images/grid/monolytnye_works.jpg", title: "Монолитные работы", sub: "Витебская обл., 2023" },
  { img: "/images/grid/podyem.jpg", title: "Столбчатый фундамент под баню", sub: "д. Лукомль, 2023" },
  { img: "/images/grid/podiem_doma.jpg", title: "Подъём дома", sub: "Чашникский р-н, 2023" },
  { img: "/images/grid/repair_and_gidroisolyation.jpg", title: "Ремонт и гидроизоляция", sub: "г. Чашники, 2022" },
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="bg-[#D9D2C5] py-24 grain">
      <div className="max-w-[1440px] mx-auto px-8 sm:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-end mb-14">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-0.5 bg-[#C41A1A]" />
              <span className="font-sans font-bold uppercase tracking-[0.25em] text-[#C41A1A] text-[10px]">Портфолио</span>
            </div>
            <h2 className="font-display text-[#111110] uppercase leading-none"
              style={{ fontSize: "clamp(36px,6vw,80px)" }}>
              Готовые<br />объекты
            </h2>
          </div>
          <div className="text-right">
            <div className="font-display text-[#C41A1A]" style={{ fontSize: "clamp(48px,5vw,80px)" }}>340+</div>
            <div className="font-sans font-bold uppercase tracking-[0.2em] text-[#8A8074] text-[10px]">объектов сдано</div>
          </div>
        </div>

        {/* Grid — asymmetric */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#8A8074]">
          {portfolio.map((item, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden bg-[#C2BAA8] ${i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}
              style={{ aspectRatio: i === 0 ? "16/9" : "4/3" }}
            >
              <Image
                src={item.img}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                style={{ filter: "grayscale(50%) contrast(1.05)" }}
              />
              {/* Number badge */}
              <div className="absolute top-4 left-4 bg-[#EDE8DF] w-8 h-8 flex items-center justify-center">
                <span className="font-display text-[#C41A1A] text-xs leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#111110]/90 px-5 py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="font-display text-white uppercase tracking-wide text-sm">{item.title}</div>
                <div className="font-serif text-[#8A8074] italic text-xs mt-0.5">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
