import type { Metadata } from "next";
import { Anton, Bricolage_Grotesque, Pacifico, Caveat, Kaushan_Script } from "next/font/google";
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

const kaushan = Kaushan_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-kaushan",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Best Bites Namkeen — from the house of Best Namkeen, Gwalior",
  description:
    "Best Bites Namkeen — packed since 1997 by Best Namkeen, Gwalior's namkeen makers since 1960. Ratlami Sev, Khatta Meetha, Kadipatta Mix and more, plus four stores across Gwalior.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${anton.variable} ${bricolage.variable} ${pacifico.variable} ${caveat.variable} ${kaushan.variable} grain antialiased`}
      >
        <Preloader />
        {children}
      </body>
    </html>
  );
}
