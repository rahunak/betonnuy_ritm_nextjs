import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Страница не найдена — Бетонный Ритм",
};

export default function NotFound() {
  return (
    <main>
      <Header />
      <section className="pt-14 bg-[#EDE8DF] grain overflow-hidden relative">
        <div className="absolute left-0 right-0 top-14 h-1 bg-[#C41A1A]" />
        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-24 relative z-10 text-center">
          <div
            className="font-display text-stroke select-none pointer-events-none leading-none"
            style={{ fontSize: "clamp(140px, 25vw, 320px)", opacity: 0.12 }}
          >
            404
          </div>
          <h1 className="font-display uppercase text-[#111110] mt-6 mb-4" style={{ fontSize: "clamp(28px, 4vw, 56px)" }}>
            Страница не найдена
          </h1>
          <p className="font-serif text-[#2D2B28] text-lg max-w-xl mx-auto mb-10">
            Такой страницы не существует или она была удалена. Посмотрите наши услуги — возможно, там есть то, что вы искали.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="bg-[#C41A1A] hover:bg-[#9C1515] text-white font-display uppercase tracking-widest text-[11px] px-8 py-4 transition-colors"
            >
              На главную
            </Link>
            <Link
              href="/uslugi"
              className="border-2 border-[#111110] hover:border-[#C41A1A] hover:text-[#C41A1A] font-display uppercase tracking-widest text-[11px] px-8 py-4 transition-colors"
            >
              Все услуги
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
