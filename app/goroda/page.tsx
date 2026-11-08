import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cities } from "@/lib/geo";
import { SITE_URL } from "@/lib/services";

export const metadata: Metadata = {
  title: "Подъём домов и ремонт фундамента по Витебской области",
  description:
    "Работаем в Новолукомле, Чашниках, Орше, Полоцке, Новополоцке, Лепеле и по всей Витебской области. Подъём домов, замена и ремонт фундамента.",
  alternates: {
    canonical: "/goroda",
  },
  openGraph: {
    title: "Подъём домов и ремонт фундамента по Витебской области | Бетонный Ритм",
    description:
      "Новолукомль, Чашники, Орша, Полоцк, Новополоцк, Лепель и вся Витебская область. Выезд геодезиста и смета бесплатно.",
    url: "/goroda",
    type: "website",
    siteName: "Бетонный Ритм",
    locale: "ru_BY",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Подъём домов и ремонт фундамента по Витебской области | Бетонный Ритм",
    description:
      "Новолукомль, Чашники, Орша, Полоцк, Новополоцк, Лепель и вся Витебская область.",
    images: ["/opengraph-image"],
  },
};

export default function CitiesPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "География работ", item: `${SITE_URL}/goroda` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Города работ: Бетонный Ритм",
      itemListElement: cities.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        url: `${SITE_URL}/goroda/${c.slug}`,
      })),
    },
  ];

  return (
    <main>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="pt-14 bg-[#EDE8DF] grain overflow-hidden relative">
        <div className="absolute left-0 right-0 top-14 h-1 bg-[#C41A1A]" />
        <div className="absolute right-0 top-8 font-display text-stroke select-none pointer-events-none leading-none"
          style={{ fontSize: "clamp(140px, 20vw, 320px)", opacity: 0.06 }}>
          BY
        </div>

        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 pt-16 pb-16 relative z-10">
          <nav aria-label="Хлебные крошки" className="flex items-center gap-2 mb-8 font-sans text-[11px] uppercase tracking-widest text-[#8A8074]">
            <Link href="/" className="hover:text-[#C41A1A] transition-colors">Главная</Link>
            <span>/</span>
            <span className="text-[#C41A1A]">География</span>
          </nav>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-16 h-0.5 bg-[#C41A1A]" />
            <span className="font-sans font-bold uppercase tracking-[0.25em] text-[#C41A1A] text-[10px]">
              Витебская область · Беларусь
            </span>
          </div>

          <h1 className="font-display uppercase leading-[0.9] text-[#111110] mb-6"
            style={{ fontSize: "clamp(38px, 6vw, 92px)" }}>
            Подъём домов<br /><span className="text-stroke-red">по городам</span>
          </h1>

          <p className="font-serif text-[#2D2B28] text-lg leading-relaxed max-w-2xl">
            База бригады в Новолукомле. Работаем по всей Витебской области: подъём домов домкратами,
            замена и ремонт фундамента, замена нижних венцов, монолитные работы. По остальной
            Беларуси выезжаем по договорённости.
          </p>
        </div>
      </section>

      <section className="bg-[#111110] py-20 grain relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 relative z-10">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-0.5 bg-[#C41A1A]" />
            <span className="font-sans font-bold uppercase tracking-[0.25em] text-[#C41A1A] text-[10px]">Города</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-[#2D2B28] border border-[#2D2B28]">
            {cities.map((city) => (
              <Link key={city.slug} href={`/goroda/${city.slug}`}
                className="bg-[#111110] p-8 hover:bg-[#1A1917] transition-colors flex flex-col min-h-[260px] group">
                <div className="font-display text-[#C41A1A] text-[10px] uppercase tracking-widest mb-4">
                  {city.area}
                </div>
                <h2 className="font-display text-[#EDE8DF] uppercase leading-tight text-2xl mb-4 group-hover:text-[#C41A1A] transition-colors">
                  {city.name}
                </h2>
                <p className="font-serif text-[#8A8074] italic text-sm leading-relaxed mt-auto">
                  Подъём домов, ремонт и замена фундамента, замена венцов. Выезд геодезиста бесплатно.
                </p>
              </Link>
            ))}
          </div>

          <p className="font-serif text-[#8A8074] italic text-sm mt-8 max-w-2xl">
            Нет вашего города в списке? Позвоните: <a href="tel:+375292406450" className="text-[#C41A1A] hover:opacity-80">+375 29 240-64-50</a>,
            скажем, выезжаем ли на объект и в какие сроки.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
