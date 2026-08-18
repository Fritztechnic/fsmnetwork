import type { Metadata } from "next";
import { Rajdhani, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "FSM Network",
    template: "%s · FSM Network",
  },
  description:
    "FSM Network — Dein Server für CreateMine, LifeStealDupe & GHG SMP. Jetzt joinen!",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${rajdhani.variable} ${inter.variable} scroll-smooth`}
    >
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
