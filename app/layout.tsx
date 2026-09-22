import type { Metadata } from "next";
import { Russo_One, Source_Serif_4, Montserrat } from "next/font/google";
import "./globals.css";

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
  title: "Бетонный Ритм — подъём домов и замена фундаментов в Новолукомле",
  description:
    "Комплексные работы по подъёму, выравниванию и замене фундаментов жилых и нежилых строений. Выезд геодезиста и смета — бесплатно. г. Новолукомль, Витебская область.",
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
