import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { services, SITE_URL } from "@/lib/services";

export const metadata: Metadata = {
  title: "Услуги — подъём домов, замена фундамента, монолитные работы в Витебске и Беларуси",
  description:
    "Все услуги Бетонного Ритма: подъём домов домкратами, подъём с заменой фундамента, выравнивание аварийных домов, замена венцов, ремонт и усиление фундамента, монолитные работы, фундаменты под ключ. Витебск и вся Беларусь.",
  alternates: {
    canonical: "/uslugi",
  },
  openGraph: {
    title: "Услуги Бетонного Ритма — фундаменты и подъём домов",
    description:
      "Подъём домов, замена фундамента, усиление фундамента, монолитные работы. Витебск, Витебская область, Беларусь.",
    url: "/uslugi",
    type: "website",
    siteName: "Бетонный Ритм",
    locale: "ru_BY",
  },
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Услуги", item: `${SITE_URL}/uslugi` },
    ],
  };

  return (
    <main>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="pt-14 bg-[#EDE8DF] grain overflow-hidden relative">
        <div className="absolute left-0 right-0 top-14 h-1 bg-[#C41A1A]" />
        <div className="absolute right-0 top-8 font-display text-stroke select-none pointer-events-none leading-none"
          style={{ fontSize: "clamp(140px, 20vw, 320px)", opacity: 0.06 }}>
          07
        </div>

        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 pt-16 pb-16 relative z-10">
          <nav aria-label="Хлебные крошки" className="flex items-center gap-2 mb-8 font-sans text-[11px] uppercase tracking-widest text-[#8A8074]">
            <Link href="/" className="hover:text-[#C41A1A] transition-colors">Главная</Link>
            <span>/</span>
            <span className="text-[#C41A1A]">Услуги</span>
          </nav>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-16 h-0.5 bg-[#C41A1A]" />
            <span className="font-sans font-bold uppercase tracking-[0.25em] text-[#C41A1A] text-[10px]">
              Витебск · Витебская область · Беларусь
            </span>
          </div>

          <h1 className="font-display uppercase leading-[0.9] text-[#111110] mb-6"
            style={{ fontSize: "clamp(40px, 7vw, 104px)" }}>
            Услуги<br /><span className="text-stroke-red">Бетонного Ритма</span>
          </h1>

          <p className="font-serif text-[#2D2B28] text-lg leading-relaxed max-w-2xl">
            Подъём и выравнивание домов, замена фундаментов под старыми строениями, ремонт
            и усиление фундаментов, все виды монолитных работ. Выезд геодезиста и смета —
            бесплатно, работаем по всей Беларуси.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="bg-[#111110] py-20 grain relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-px bg-[#2D2B28]">
            {services.map((s) => (
              <Link key={s.slug} href={`/uslugi/${s.slug}`}
                className="bg-[#111110] p-8 flex flex-col group hover:bg-[#1A1917] transition-colors relative">
                {s.tag && (
                  <div className="absolute top-0 right-0 bg-[#C41A1A] text-white font-display uppercase tracking-widest text-[9px] px-3 py-1.5">
                    {s.tag}
                  </div>
                )}
                <div className="font-display text-[#2D2B28] group-hover:text-[#C41A1A]/20 leading-none mb-6 transition-colors"
                  style={{ fontSize: "clamp(56px, 5vw, 80px)" }}>
                  {s.num}
                </div>
                <div className="border-t border-[#2D2B28] pt-6 flex-1 flex flex-col gap-4">
                  <h2 className="font-display text-[#EDE8DF] uppercase leading-tight text-base tracking-wide">
                    {s.h1}
                  </h2>
                  <p className="font-serif text-[#8A8074] italic text-sm leading-relaxed flex-1">
                    {s.short}
                  </p>
                  <div>
                    <span className="font-display text-[#C41A1A]" style={{ fontSize: "clamp(28px,3vw,40px)" }}>
                      {s.price}
                    </span>
                    <span className="font-sans text-[#8A8074] text-xs ml-2 uppercase tracking-wider">{s.unit}</span>
                  </div>
                  <span className="mt-2 border border-[#2D2B28] group-hover:border-[#C41A1A] text-[#8A8074] group-hover:text-[#C41A1A] font-display uppercase tracking-widest text-[10px] py-3 text-center transition-all">
                    Подробнее
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO text */}
      <section className="bg-[#EDE8DF] py-20 grain relative">
        <div className="h-2 bg-[#C41A1A] absolute top-0 left-0 right-0" />
        <div className="max-w-[900px] mx-auto px-8 sm:px-12 relative z-10 pt-6">
          <h2 className="font-display text-[#111110] uppercase leading-tight mb-6"
            style={{ fontSize: "clamp(24px,3.5vw,40px)" }}>
            Фундаментные и монолитные работы в Витебске и по всей Беларуси
          </h2>
          <div className="font-serif text-[#2D2B28] leading-relaxed space-y-4 [&_a]:text-[#C41A1A] [&_a]:underline [&_a]:underline-offset-4">
            <p>
              Бригада «Бетонный Ритм» с 2019 года выполняет <Link href="/uslugi/podem-domov">подъём домов
              домкратами</Link> в Витебске, Орше, Полоцке, Новолукомле и по всей Витебской области.
              Поднимаем деревянные срубы, бани, дачные и кирпичные дома весом до 250 тонн —
              целиком, с печкой и пристройками, без повреждения стен и отделки.
            </p>
            <p>
              Самое востребованное направление — <Link href="/uslugi/podem-doma-s-zamenoy-fundamenta">подъём
              дома с заменой фундамента</Link> под ключ: дом аккуратно приподнимается, ветхое основание
              демонтируется, а на его месте заливается новая лента, столбчатый или свайно-ростверковый
              фундамент. Полный цикл занимает один рабочий сезон — снос дома не требуется.
            </p>
            <p>
              Работаем и с <Link href="/uslugi/avariynye-doma-vyravnivanie">аварийными и покосившимися
              домами</Link>: выравниваем просевшие углы и стены, устраняем причину перекоса, укрепляем
              основание. Отдельно выполняем <Link href="/uslugi/zamena-vencov">замену нижних венцов</Link> брусом
              без разборки сруба и <Link href="/uslugi/remont-i-usilenie-fundamenta">ремонт и усиление
              фундаментов</Link> обоймами, инъектированием и цементацией.
            </p>
            <p>
              Все виды <Link href="/uslugi/monolitnye-raboty">монолитных работ</Link> — плиты, перекрытия,
              армопояса, лестницы, подпорные стены — и <Link href="/uslugi/fundamenty-pod-klyuch">фундаменты
              под ключ</Link> для домов, бань, пристроек и заборов. Марки бетона М250–М350, своя опалубка,
              гарантия до 50 лет.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
