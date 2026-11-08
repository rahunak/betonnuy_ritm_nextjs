import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cities, getCity } from "@/lib/geo";
import { services, SITE_URL } from "@/lib/services";

type Props = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};

  return {
    title: city.title,
    description: city.description,
    keywords: city.keywords,
    alternates: {
      canonical: `/goroda/${city.slug}`,
    },
    openGraph: {
      title: `${city.title} | Бетонный Ритм`,
      description: city.description,
      url: `/goroda/${city.slug}`,
      type: "website",
      siteName: "Бетонный Ритм",
      locale: "ru_BY",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: city.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${city.title} | Бетонный Ритм`,
      description: city.description,
      images: ["/opengraph-image"],
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const relatedCities = city.relatedCities
    .map((s) => getCity(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: city.h1,
      description: city.description,
      url: `${SITE_URL}/goroda/${city.slug}`,
      image: `${SITE_URL}/opengraph-image`,
      areaServed: [
        { "@type": "City", name: city.name },
        { "@type": "AdministrativeArea", name: city.area },
        { "@type": "Country", name: "Беларусь" },
      ],
      provider: { "@id": `${SITE_URL}/#organization` },
      offers: {
        "@type": "Offer",
        price: 120,
        priceCurrency: "BYN",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/goroda/${city.slug}`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: city.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "География работ", item: `${SITE_URL}/goroda` },
        { "@type": "ListItem", position: 3, name: city.name, item: `${SITE_URL}/goroda/${city.slug}` },
      ],
    },
  ];

  return (
    <main>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="pt-14 bg-[#EDE8DF] grain overflow-hidden relative">
        <div className="absolute left-0 right-0 top-14 h-1 bg-[#C41A1A]" />
        <div className="absolute right-0 top-8 font-display text-stroke select-none pointer-events-none leading-none"
          style={{ fontSize: "clamp(120px, 18vw, 300px)", opacity: 0.06 }}>
          {city.name.slice(0, 1)}
        </div>

        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 pt-16 pb-16 relative z-10">
          <nav aria-label="Хлебные крошки" className="flex items-center gap-2 mb-8 font-sans text-[11px] uppercase tracking-widest text-[#8A8074] flex-wrap">
            <Link href="/" className="hover:text-[#C41A1A] transition-colors">Главная</Link>
            <span>/</span>
            <Link href="/goroda" className="hover:text-[#C41A1A] transition-colors">География</Link>
            <span>/</span>
            <span className="text-[#C41A1A]">{city.name}</span>
          </nav>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-16 h-0.5 bg-[#C41A1A]" />
            <span className="font-sans font-bold uppercase tracking-[0.25em] text-[#C41A1A] text-[10px]">
              {city.area}
            </span>
          </div>

          <h1 className="font-display uppercase leading-[0.92] text-[#111110] mb-8"
            style={{ fontSize: "clamp(34px, 5.5vw, 82px)" }}>
            {city.h1}
          </h1>

          <div className="max-w-2xl space-y-5 mb-10">
            {city.intro.map((text) => (
              <p key={text.slice(0, 24)} className="font-serif text-[#2D2B28] text-lg leading-relaxed">
                {text}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/#contacts"
              className="bg-[#C41A1A] hover:bg-[#9C1515] text-white font-display uppercase tracking-widest text-[11px] px-8 py-4 transition-colors">
              Бесплатный расчёт
            </Link>
            <a href="tel:+375292406450"
              className="border-2 border-[#111110] hover:border-[#C41A1A] hover:text-[#C41A1A] font-display uppercase tracking-widest text-[11px] px-8 py-4 transition-colors">
              +375 29 240-64-50
            </a>
          </div>
        </div>
      </section>

      {/* Услуги в городе */}
      <section className="bg-[#111110] py-20 grain relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-[#C41A1A]" />
            <span className="font-sans font-bold uppercase tracking-[0.25em] text-[#C41A1A] text-[10px]">
              Услуги {city.nameIn}
            </span>
          </div>
          <h2 className="font-display text-[#EDE8DF] uppercase leading-none mb-12"
            style={{ fontSize: "clamp(30px,4.5vw,60px)" }}>
            Что делаем
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-px bg-[#2D2B28]">
            {services.map((s) => (
              <Link key={s.slug} href={`/uslugi/${s.slug}`}
                className="bg-[#111110] p-7 flex flex-col group hover:bg-[#1A1917] transition-colors">
                <div className="font-display text-[#2D2B28] group-hover:text-[#C41A1A]/20 leading-none mb-5 transition-colors"
                  style={{ fontSize: "clamp(40px,4vw,60px)" }}>
                  {s.num}
                </div>
                <div className="border-t border-[#2D2B28] pt-5 flex-1 flex flex-col gap-3">
                  <h3 className="font-display text-[#EDE8DF] uppercase leading-tight text-sm tracking-wide">
                    {s.h1}
                  </h3>
                  <div className="mt-auto">
                    <span className="font-display text-[#C41A1A] text-lg">{s.price}</span>
                    <span className="font-sans text-[#8A8074] text-[10px] ml-2 uppercase tracking-wider">{s.unit}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Как работаем */}
      <section className="bg-[#EDE8DF] py-20 grain relative">
        <div className="max-w-[1100px] mx-auto px-8 sm:px-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-[#C41A1A]" />
            <span className="font-sans font-bold uppercase tracking-[0.25em] text-[#C41A1A] text-[10px]">
              Состав работ
            </span>
          </div>
          <h2 className="font-display text-[#111110] uppercase leading-tight mb-8"
            style={{ fontSize: "clamp(26px,3.5vw,44px)" }}>
            С чем приезжаем {city.nameIn}
          </h2>

          <ul className="space-y-4 max-w-3xl">
            {city.work.map((item) => (
              <li key={item} className="flex gap-4 font-serif text-[#2D2B28] leading-relaxed">
                <span className="w-2 h-2 bg-[#C41A1A] rotate-45 shrink-0 mt-2" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="font-serif text-[#8A8074] italic text-sm mt-8">
            Работаем также в {city.nearby.slice(0, 3).join(", ")} и других населённых пунктах района.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#D9D2C5] py-20 grain relative">
        <div className="h-2 bg-[#C41A1A] absolute top-0 left-0 right-0" />
        <div className="max-w-[1100px] mx-auto px-8 sm:px-12 relative z-10 pt-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-[#C41A1A]" />
            <span className="font-sans font-bold uppercase tracking-[0.25em] text-[#C41A1A] text-[10px]">FAQ</span>
          </div>
          <h2 className="font-display text-[#111110] uppercase leading-none mb-10"
            style={{ fontSize: "clamp(30px,4.5vw,56px)" }}>
            Частые вопросы
          </h2>

          <div className="space-y-px bg-[#8A8074] border border-[#8A8074]">
            {city.faq.map((item) => (
              <details key={item.q} className="bg-[#D9D2C5] group">
                <summary className="flex items-center justify-between gap-6 px-6 py-5 cursor-pointer list-none">
                  <h3 className="font-display text-[#111110] text-sm sm:text-base uppercase tracking-wide leading-snug">
                    {item.q}
                  </h3>
                  <span className="w-8 h-8 shrink-0 border-2 border-[#C41A1A] text-[#C41A1A] flex items-center justify-center font-display text-lg group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="px-6 pb-6 font-serif text-[#2D2B28] italic leading-relaxed max-w-3xl">
                  {item.a}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-12">
            <div className="font-display text-[#8A8074] uppercase tracking-widest text-[10px] mb-3">
              Другие города
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {relatedCities.map((c) => (
                <Link key={c.slug} href={`/goroda/${c.slug}`}
                  className="font-serif italic text-[#111110] underline underline-offset-4 decoration-[#C41A1A] hover:text-[#C41A1A] text-sm transition-colors">
                  {c.name}
                </Link>
              ))}
              <Link href="/goroda"
                className="font-serif italic text-[#8A8074] hover:text-[#C41A1A] text-sm transition-colors">
                Все города
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
