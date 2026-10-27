import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { posts, formatDateRu } from "@/lib/blog";
import { SITE_URL } from "@/lib/services";

export const metadata: Metadata = {
  title: "Блог — подъём домов и замена фундамента: технология, цены и советы",
  description:
    "Отвечаем на вопросы владельцев домов: почему проседает угол и дом, как проходит подъём дома с заменой фундамента, можно ли поднимать дом с печкой, замена венцов и сколько это стоит в Беларуси.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Блог Бетонного Ритма — технология подъёма домов и фундаментов",
    description:
      "Технология работ и цены: просевшие углы, подъём домов домкратами, замена фундамента и венцов. Витебск и Беларусь.",
    url: "/blog",
    type: "website",
    siteName: "Бетонный Ритм",
    locale: "ru_BY",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Блог", item: `${SITE_URL}/blog` },
    ],
  };

  return (
    <main>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="pt-14 bg-[#EDE8DF] grain overflow-hidden relative">
        <div className="absolute left-0 right-0 top-14 h-1 bg-[#C41A1A]" />
        <div className="absolute right-0 top-8 font-display text-stroke select-none pointer-events-none leading-none"
          style={{ fontSize: "clamp(140px, 20vw, 320px)", opacity: 0.06 }}>
          Б
        </div>

        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 pt-16 pb-16 relative z-10">
          <nav aria-label="Хлебные крошки" className="flex items-center gap-2 mb-8 font-sans text-[11px] uppercase tracking-widest text-[#8A8074]">
            <Link href="/" className="hover:text-[#C41A1A] transition-colors">Главная</Link>
            <span>/</span>
            <span className="text-[#C41A1A]">Блог</span>
          </nav>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-16 h-0.5 bg-[#C41A1A]" />
            <span className="font-sans font-bold uppercase tracking-[0.25em] text-[#C41A1A] text-[10px]">
              Технология · Цены · Советы хозяину
            </span>
          </div>

          <h1 className="font-display uppercase leading-[0.9] text-[#111110] mb-6"
            style={{ fontSize: "clamp(38px, 6vw, 92px)" }}>
            Блог о подъёме домов
          </h1>

          <p className="font-serif text-[#2D2B28] text-lg leading-relaxed max-w-2xl mb-8">
            Что делают, когда просел угол дома, как проходит подъём с заменой фундамента, чем меняют венцы и из чего складывается цена. Пишем по опыту 340+ сданных объектов с 2019 года.
          </p>
        </div>
      </section>

      {/* Список статей */}
      <section className="bg-[#111110] py-20 grain relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-[#C41A1A]" />
            <span className="font-sans font-bold uppercase tracking-[0.25em] text-[#C41A1A] text-[10px]">Все статьи</span>
          </div>
          <h2 className="font-display text-[#EDE8DF] uppercase leading-none mb-14"
            style={{ fontSize: "clamp(30px,4.5vw,64px)" }}>
            Читать
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-[#2D2B28] border border-[#2D2B28]">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                className="bg-[#111110] p-8 hover:bg-[#1A1917] transition-colors flex flex-col min-h-[280px] group">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-display text-[#C41A1A] text-[10px] uppercase tracking-widest">{post.tag}</span>
                  <span className="font-sans text-[#8A8074] text-[10px] uppercase tracking-widest">
                    {formatDateRu(post.date)} · {post.readingTime} мин
                  </span>
                </div>
                <h3 className="font-display text-[#EDE8DF] uppercase leading-snug text-lg mb-4 group-hover:text-[#C41A1A] transition-colors">
                  {post.h1}
                </h3>
                <p className="font-serif text-[#8A8074] italic text-sm leading-relaxed mt-auto">
                  {post.description.slice(0, 140)}…
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#EDE8DF] py-20 grain relative">
        <div className="h-2 bg-[#C41A1A] absolute top-0 left-0 right-0" />
        <div className="max-w-[1100px] mx-auto px-8 sm:px-12 relative z-10 pt-6">
          <div className="bg-[#111110] p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="font-display text-[#EDE8DF] uppercase tracking-widest text-xl mb-1">
                Вопрос по вашему дому?
              </div>
              <div className="font-serif text-[#8A8074] italic text-sm">
                Выезд геодезиста бесплатный · Смета за 1 день · Ответим за 60 минут
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
