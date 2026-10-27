import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { posts, getPost, formatDateRu, type BlogBlock } from "@/lib/blog";
import { getService, SITE_URL } from "@/lib/services";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      siteName: "Бетонный Ритм",
      locale: "ru_BY",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: post.h1 }],
    },
  };
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "answer":
      return (
        <div className="relative my-10">
          <div className="absolute inset-0 translate-x-2 translate-y-2 bg-[#C41A1A]" />
          <div className="relative bg-[#111110] p-7">
            <div className="font-display text-[#C41A1A] uppercase tracking-widest text-[10px] mb-3">
              Коротко
            </div>
            <p className="font-serif text-[#EDE8DF] text-base sm:text-lg leading-relaxed">
              {block.text}
            </p>
          </div>
        </div>
      );
    case "h2":
      return (
        <h2 className="font-display text-[#111110] uppercase leading-tight mt-14 mb-5"
          style={{ fontSize: "clamp(24px,3vw,40px)" }}>
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="font-display text-[#111110] uppercase text-base leading-snug mt-8 mb-3">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p className="font-serif text-[#2D2B28] leading-relaxed max-w-3xl mb-5">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul className="font-serif text-[#2D2B28] leading-relaxed max-w-3xl mb-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="w-2 h-2 bg-[#C41A1A] rotate-45 shrink-0 mt-2" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="font-serif text-[#2D2B28] leading-relaxed max-w-3xl mb-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-4">
              <span className="font-display text-[#C41A1A] shrink-0 w-8">{String(i + 1).padStart(2, "0")}</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <figure className="mb-8 max-w-3xl">
          <div className="border-2 border-[#111110] overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {block.caption && (
                <caption className="caption-top font-display text-[#8A8074] uppercase text-[10px] tracking-widest pt-2 pb-2">
                  {block.caption}
                </caption>
              )}
              <thead>
                <tr className="bg-[#111110]">
                  {block.head.map((cell) => (
                    <th key={cell} className="font-display text-[#EDE8DF] uppercase text-[11px] tracking-wide px-4 py-3 whitespace-nowrap">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, i) => (
                  <tr key={i} className={i % 2 ? "bg-[#E4DDCF]" : "bg-[#EDE8DF]"}>
                    {row.map((cell, j) => (
                      <td key={j} className={`px-4 py-3 font-serif text-sm text-[#2D2B28] ${j > 0 ? "whitespace-nowrap font-display text-[#111110]" : ""}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </figure>
      );
    case "note":
      return (
        <div className="border-l-4 border-[#C41A1A] bg-[#E4DDCF] p-5 mb-8 max-w-3xl">
          <p className="font-serif italic text-[#2D2B28] text-sm leading-relaxed">{block.text}</p>
        </div>
      );
    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const relatedServices = post.relatedServices
    .map((r) => getService(r))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const relatedPosts = post.relatedPosts
    .map((r) => getPost(r))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.h1,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      url: `${SITE_URL}/blog/${post.slug}`,
      inLanguage: "ru",
      author: {
        "@type": "Organization",
        name: "Бетонный Ритм",
        url: SITE_URL,
      },
      publisher: {
        "@type": "Organization",
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
      mainEntity: post.faq.map((item) => ({
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
        { "@type": "ListItem", position: 2, name: "Блог", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: post.h1, item: `${SITE_URL}/blog/${post.slug}` },
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

      {/* Hero статьи */}
      <section className="pt-14 bg-[#EDE8DF] grain overflow-hidden relative">
        <div className="absolute left-0 right-0 top-14 h-1 bg-[#C41A1A]" />

        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 pt-16 pb-14 relative z-10">
          <nav aria-label="Хлебные крошки" className="flex items-center gap-2 mb-8 font-sans text-[11px] uppercase tracking-widest text-[#8A8074] flex-wrap">
            <Link href="/" className="hover:text-[#C41A1A] transition-colors">Главная</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#C41A1A] transition-colors">Блог</Link>
            <span>/</span>
            <span className="text-[#C41A1A]">{post.shortTitle}</span>
          </nav>

          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <div className="w-16 h-0.5 bg-[#C41A1A]" />
            <span className="font-sans font-bold uppercase tracking-[0.25em] text-[#C41A1A] text-[10px]">
              {post.tag} · {formatDateRu(post.date)} · {post.readingTime} мин чтения
            </span>
          </div>

          <h1 className="font-display uppercase leading-[0.95] text-[#111110] mb-8"
            style={{ fontSize: "clamp(32px,5vw,72px)" }}>
            {post.h1}
          </h1>
        </div>
      </section>

      {/* Текст статьи */}
      <section className="bg-[#EDE8DF] pb-16 relative">
        <div className="max-w-[1100px] mx-auto px-8 sm:px-12 relative z-10">
          {post.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
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
          <h2 className="font-display text-[#111110] uppercase leading-none mb-12"
            style={{ fontSize: "clamp(30px,4.5vw,64px)" }}>
            Частые вопросы
          </h2>

          <div className="space-y-px bg-[#8A8074] border border-[#8A8074]">
            {post.faq.map((item) => (
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
        </div>
      </section>

      {/* Перелинковка: услуги + статьи */}
      <section className="bg-[#EDE8DF] py-20 grain">
        <div className="max-w-[1440px] mx-auto px-8 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-0.5 bg-[#C41A1A]" />
                <span className="font-sans font-bold uppercase tracking-[0.25em] text-[#C41A1A] text-[10px]">Услуги по теме</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#8A8074] border border-[#8A8074]">
                {relatedServices.map((s) => (
                  <Link key={s.slug} href={`/uslugi/${s.slug}`}
                    className="bg-[#EDE8DF] p-5 hover:bg-[#E4DDCF] transition-colors group">
                    <div className="font-display text-[#C41A1A] text-xs mb-2">{s.num}</div>
                    <div className="font-display text-[#111110] uppercase text-xs leading-snug group-hover:text-[#C41A1A] transition-colors">
                      {s.h1}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-0.5 bg-[#C41A1A]" />
                <span className="font-sans font-bold uppercase tracking-[0.25em] text-[#C41A1A] text-[10px]">Читать дальше</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#8A8074] border border-[#8A8074]">
                {relatedPosts.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`}
                    className="bg-[#EDE8DF] p-5 hover:bg-[#E4DDCF] transition-colors group">
                    <div className="font-display text-[#C41A1A] text-xs mb-2">{p.tag}</div>
                    <div className="font-display text-[#111110] uppercase text-xs leading-snug group-hover:text-[#C41A1A] transition-colors">
                      {p.shortTitle}
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
                Нужна консультация по вашему дому?
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
