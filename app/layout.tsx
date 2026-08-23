import type { Metadata } from "next";
import { Anton, Bricolage_Grotesque, Pacifico, Caveat } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Best Namkeen — Crunch That Feels Like Home",
  description:
    "Small-batch Indian namkeen from Gwalior — a legacy of taste since 1960. Ratlami Sev, Khatta Meetha, Kadipatta Mix and more, plus four stores across Gwalior. Order on Zomato.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${anton.variable} ${bricolage.variable} ${pacifico.variable} ${caveat.variable} grain antialiased`}
      >
        <Preloader />
        {children}
      </body>
    </html>
  );
}
