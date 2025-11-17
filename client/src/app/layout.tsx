import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "./layout.css";
import Navbar from "@/components/layout/Navbar";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-spaceGrotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Player Props",
  description: "Player stats for sports betting and fantasy sports",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${spaceGrotesk.variable}`}>
        <div className="layout">
          <Navbar />
          <div className="content">{children}</div>
          <footer>Hi im footer</footer>
        </div>
      </body>
    </html>
  );
}
