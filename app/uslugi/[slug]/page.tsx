import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { services, getService, SITE_URL } from "@/lib/services";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.description,
    keywords: service.keywords,
    alternates: {
      canonical: `/uslugi/${service.slug}`,
    },
    openGraph: {
      title: service.title,
      description: service.description,
      url: `/uslugi/${service.slug}`,
      type: "website",
      siteName: "Бетонный Ритм",
      locale: "ru_BY",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: service.h1 }],
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const relatedServices = service.related
    .map((r) => getService(r))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.h1,
      description: service.description,
      url: `${SITE_URL}/uslugi/${service.slug}`,
      areaServed: [
        { "@type": "City", name: "Витебск" },
        { "@type": "AdministrativeArea", name: "Витебская область" },
        { "@type": "Country", name: "Беларусь" },
      ],
      provider: {
        "@type": "LocalBusiness",
        name: "Бетонный Ритм",
        telephone: "+375292406450",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Новолукомль",
          addressRegion: "Витебская область",
          addressCountry: "BY",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faq.map((item) => ({
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
        { "@type": "ListItem", position: 2, name: "Услуги", item: `${SITE_URL}/uslugi` },
        { "@type": "ListItem", position: 3, name: service.h1, item: `${SITE_URL}/uslugi/${service.slug}` },
      ],
    },
  ];

  return (
    <main>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="pt-14 bg-[#EDE8DF] grain overflow-hidden relative">
        <div className="absolute left-0 right-0 top-14 h-1 bg-[#C41A1A]" />
        <div className="absolute right-0 top-8 font-display text-stroke select-none pointer-events-none leading-none"
          style={{ fontSize: "clamp(140px, 20vw, 320px)", opacity: 0.06 }}>
          {service.num}
        </div>

        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 pt-16 pb-16 relative z-10">
          <nav aria-label="Хлебные крошки" className="flex items-center gap-2 mb-8 font-sans text-[11px] uppercase tracking-widest text-[#8A8074]">
            <Link href="/" className="hover:text-[#C41A1A] transition-colors">Главная</Link>
            <span>/</span>
            <Link href="/uslugi" className="hover:text-[#C41A1A] transition-colors">Услуги</Link>
            <span>/</span>
            <span className="text-[#C41A1A]">{service.h1}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-0.5 bg-[#C41A1A]" />
                <span className="font-sans font-bold uppercase tracking-[0.25em] text-[#C41A1A] text-[10px]">
                  Услуга {service.num} · Витебск и Беларусь
                </span>
              </div>

              <h1 className="font-display uppercase leading-[0.9] text-[#111110] mb-6"
                style={{ fontSize: "clamp(38px, 6vw, 92px)" }}>
                {service.h1}
              </h1>

              <p className="font-serif text-[#2D2B28] text-lg leading-relaxed max-w-2xl mb-8">
                {service.lead}
              </p>

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

            {/* Price mini-table */}
            <div className="relative">
              <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[#C41A1A]" />
              <div className="relative bg-[#111110] p-7">
                <div className="font-display text-white uppercase text-lg tracking-widest mb-1">
                  Цены
                </div>
                <div className="font-serif text-[#C2BAA8] text-sm italic mb-6">
                  Точная смета — после бесплатного выезда
                </div>
                <div className="space-y-3">
                  {service.priceRows.map((row) => (
                    <div key={row.name} className="flex items-baseline justify-between gap-4 border-b border-[#2D2B28] pb-3">
                      <span className="font-sans text-[#D9D2C5] text-sm leading-snug">{row.name}</span>
                      <span className="font-display text-[#C41A1A] text-sm whitespace-nowrap">{row.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scope */}
      <section className="bg-[#111110] py-20 grain relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-[#C41A1A]" />
            <span className="font-sans font-bold uppercase tracking-[0.25em] text-[#C41A1A] text-[10px]">Как мы работаем</span>
          </div>
          <h2 className="font-display text-[#EDE8DF] uppercase leading-none mb-14"
            style={{ fontSize: "clamp(30px,4.5vw,64px)" }}>
            Что входит в работу
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-px bg-[#2D2B28]">
            {service.scope.map((item, i) => (
              <div key={item.title} className="bg-[#111110] p-8 hover:bg-[#1A1917] transition-colors">
                <div className="font-display text-[#C41A1A] leading-none mb-5" style={{ fontSize: "clamp(36px,3vw,52px)" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="border-t border-[#2D2B28] pt-5">
                  <h3 className="font-display text-[#EDE8DF] uppercase leading-tight text-sm tracking-wide mb-3">
                    {item.title}
                  </h3>
                  <p className="font-serif text-[#8A8074] italic text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Facts */}
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 border-t-2 border-[#EDE8DF] pt-8 gap-px bg-[#2D2B28]">
            {service.facts.map((f) => (
              <div key={f.l} className="bg-[#111110] pr-6">
                <div className="font-display text-[#EDE8DF] leading-none" style={{ fontSize: "clamp(28px,3.5vw,48px)" }}>
                  {f.n}
                </div>
                <div className="font-sans font-bold uppercase tracking-[0.2em] text-[#8A8074] text-[10px] mt-2">{f.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#EDE8DF] py-20 grain relative">
        <div className="h-2 bg-[#C41A1A] absolute top-0 left-0 right-0" />
        <div className="max-w-[1100px] mx-auto px-8 sm:px-12 relative z-10 pt-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-[#C41A1A]" />
            <span className="font-sans font-bold uppercase tracking-[0.25em] text-[#C41A1A] text-[10px]">FAQ</span>
          </div>
          <h2 className="font-display text-[#111110] uppercase leading-none mb-12"
            style={{ fontSize: "clamp(30px,4.5vw,64px)" }}>
            Частые вопросы
          </h2>

          <div className="space-y-px bg-[#C2BAA8] border border-[#C2BAA8]">
            {service.faq.map((item) => (
              <details key={item.q} className="bg-[#EDE8DF] group">
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
        </div>
      </section>

      {/* Geo + related */}
      <section className="bg-[#D9D2C5] py-20 grain">
        <div className="max-w-[1440px] mx-auto px-8 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-0.5 bg-[#C41A1A]" />
                <span className="font-sans font-bold uppercase tracking-[0.25em] text-[#C41A1A] text-[10px]">География работ</span>
              </div>
              <h2 className="font-display text-[#111110] uppercase leading-tight mb-6"
                style={{ fontSize: "clamp(26px,3.5vw,44px)" }}>
                Работаем по Витебской области<br />и всей Беларуси
              </h2>
              <p className="font-serif text-[#2D2B28] italic leading-relaxed max-w-lg">
                {service.geo}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-0.5 bg-[#C41A1A]" />
                <span className="font-sans font-bold uppercase tracking-[0.25em] text-[#C41A1A] text-[10px]">С этим часто заказывают</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#8A8074] border border-[#8A8074]">
                {relatedServices.map((r) => (
                  <Link key={r.slug} href={`/uslugi/${r.slug}`}
                    className="bg-[#D9D2C5] p-5 hover:bg-[#EDE8DF] transition-colors group">
                    <div className="font-display text-[#C41A1A] text-xs mb-2">{r.num}</div>
                    <div className="font-display text-[#111110] uppercase text-xs leading-snug group-hover:text-[#C41A1A] transition-colors">
                      {r.h1}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 bg-[#111110] p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="font-display text-[#EDE8DF] uppercase tracking-widest text-xl mb-1">
                Нужен расчёт {service.h1.toLowerCase()}?
              </div>
              <div className="font-serif text-[#8A8074] italic text-sm">
                Выезд геодезиста бесплатный · Смета за 1 день · Ответим за 30 минут
              </div>
            </div>
            <Link href="/#contacts"
              className="shrink-0 bg-[#C41A1A] hover:bg-[#9C1515] text-white font-display uppercase tracking-widest text-[11px] px-8 py-4 transition-colors">
              Оставить заявку
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
