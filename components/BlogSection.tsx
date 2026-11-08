import Link from "next/link";
import { posts, formatDateRu } from "@/lib/blog";

export default function BlogSection() {
  const latest = posts.slice(0, 3);

  return (
    <section className="bg-[#EDE8DF] py-20 grain">
      <div className="max-w-[1440px] mx-auto px-8 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-end mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-0.5 bg-[#C41A1A]" />
              <span className="font-sans font-bold uppercase tracking-[0.25em] text-[#C41A1A] text-[10px]">
                Блог
              </span>
            </div>
            <h2 className="font-display text-[#111110] uppercase leading-none"
              style={{ fontSize: "clamp(32px, 5vw, 64px)" }}>
              Статьи о фундаменте
            </h2>
          </div>
          <Link href="/blog"
            className="font-display uppercase tracking-widest text-[10px] text-[#111110] underline underline-offset-4 decoration-[#C41A1A] hover:text-[#C41A1A] transition-colors">
            Все статьи
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#C2BAA8] border border-[#C2BAA8]">
          {latest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}
              className="bg-[#EDE8DF] p-7 flex flex-col hover:bg-[#E4DED2] transition-colors group">
              <div className="font-display text-[#C41A1A] text-[10px] uppercase tracking-widest mb-4">
                {post.tag} · {formatDateRu(post.date)}
              </div>
              <h3 className="font-display text-[#111110] uppercase leading-tight text-lg mb-4 group-hover:text-[#C41A1A] transition-colors">
                {post.h1}
              </h3>
              <p className="font-serif text-[#2D2B28] text-sm leading-relaxed mb-6">
                {post.description}
              </p>
              <div className="mt-auto font-sans font-bold uppercase tracking-[0.2em] text-[10px] text-[#8A8074]">
                {post.readingTime} мин чтения
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
