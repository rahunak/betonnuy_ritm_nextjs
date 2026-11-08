import type { Metadata } from "next";
import { Russo_One, Source_Serif_4, Montserrat } from "next/font/google";
import "./globals.css";
import YandexMetrika from "@/components/YandexMetrika";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import PhoneClickTracker from "@/components/PhoneClickTracker";
import { SITE_URL } from "@/lib/services";

const russo = Russo_One({
  weight: "400",
  subsets: ["latin", "cyrillic"],
  variable: "--font-russo",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin", "cyrillic"],
  variable: "--font-source-serif",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // %s подставляет title дочерних страниц; default — если дочерний не задан
  // Бренд в хвосте добавляется шаблоном: title остаются уникальными на всех
  // страницах, а новые страницы не требуют ручной дописки бренда.
  title: {
    default: "Подъём домов и замена фундамента в Витебске | Бетонный Ритм",
    template: "%s | Бетонный Ритм",
  },
  description:
    "Подъём домов домкратами, замена и ремонт фундамента, монолитные работы в Витебске и по Беларуси. Выезд геодезиста и смета бесплатно.",
  applicationName: "Бетонный Ритм",
  openGraph: {
    type: "website",
    locale: "ru_BY",
    url: SITE_URL,
    siteName: "Бетонный Ритм",
    title: "Подъём домов и замена фундамента в Витебске | Бетонный Ритм",
    description:
      "Подъём домов домкратами, замена и ремонт фундамента, монолитные работы в Витебске и по Беларуси. Выезд геодезиста и смета бесплатно.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Бетонный Ритм — ремонт фундамента и подъём домов в Витебске и Беларуси",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Подъём домов и замена фундамента в Витебске | Бетонный Ритм",
    description:
      "Подъём домов, замена и ремонт фундамента, монолитные работы. Витебск и вся Беларусь.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

/** Сайтовые JSON-LD: организация (LocalBusiness) + WebSite — на всех страницах */
const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "HomeAndConstructionBusiness"],
      "@id": `${SITE_URL}/#organization`,
      name: "Бетонный Ритм",
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.svg`,
      image: `${SITE_URL}/opengraph-image`,
      telephone: "+375292406450",
      priceRange: "от 120 BYN",
      foundingDate: "2019",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Новолукомль",
        addressRegion: "Витебская область",
        addressCountry: "BY",
      },
      areaServed: [
        { "@type": "City", name: "Витебск" },
        { "@type": "City", name: "Орша" },
        { "@type": "City", name: "Полоцк" },
        { "@type": "City", name: "Новополоцк" },
        { "@type": "City", name: "Новолукомль" },
        { "@type": "City", name: "Лепель" },
        { "@type": "AdministrativeArea", name: "Витебская область" },
        { "@type": "Country", name: "Беларусь" },
      ],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "19:00",
      },
      sameAs: [
        "https://www.instagram.com/shlaxtenok_artem/",
        "https://t.me/artem_shlaxtenok",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Бетонный Ритм",
      inLanguage: "ru",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <html
      lang="ru"
      className={`${russo.variable} ${sourceSerif.variable} ${montserrat.variable} antialiased`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        {children}

        {/* Яндекс.Метрика — поведенческие факторы Яндекса. Отложенная загрузка,
            не влияет на TBT. Номер счётчика вписать в components/YandexMetrika.tsx. */}
        {isProduction && <YandexMetrika enabled={isProduction} />}

        {/* GA4 — отложенная загрузка. ID вписать в components/GoogleAnalytics.tsx */}
        {isProduction && <GoogleAnalytics enabled={isProduction} />}

        {/* Глобальный трекер кликов по телефонным ссылкам → GA4 tel_click */}
        {isProduction && <PhoneClickTracker />}
      </body>
    </html>
  );
}
