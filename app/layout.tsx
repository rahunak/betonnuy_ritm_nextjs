import type { Metadata } from "next";
import { Russo_One, Source_Serif_4, Montserrat } from "next/font/google";
import "./globals.css";
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
  title: {
    default: "Бетонный Ритм — подъём домов и замена фундаментов в Новолукомле",
    template: "%s",
  },
  description:
    "Комплексные работы по подъёму, выравниванию и замене фундаментов жилых и нежилых строений. Выезд геодезиста и смета — бесплатно. г. Новолукомль, Витебская область.",
  openGraph: {
    type: "website",
    locale: "ru_BY",
    url: SITE_URL,
    siteName: "Бетонный Ритм",
    title: "Бетонный Ритм — подъём домов и замена фундаментов в Витебске и Беларуси",
    description:
      "Подъём домов домкратами, замена фундамента, замена нижних венцов, ремонт и усиление фундамента, монолитные работы. Выезд геодезиста и смета — бесплатно.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      className={`${russo.variable} ${sourceSerif.variable} ${montserrat.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
