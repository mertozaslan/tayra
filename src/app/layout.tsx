import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tayra Interactive - Her işte bir iz, her izde bir hikaye",
  description: "Tayra Interactive - Yaratıcı çözümler ve etkileşimli deneyimler sunan dijital ajans. Her işte bir iz, her izde bir hikaye.",
  keywords: "tayra, interactive, dijital ajans, web tasarım, yaratıcı çözümler, etkileşimli deneyimler",
  authors: [{ name: "Tayra Interactive" }],
  creator: "Tayra Interactive",
  publisher: "Tayra Interactive",
  robots: "index, follow",
  openGraph: {
    title: "Tayra Interactive - Her işte bir iz, her izde bir hikaye",
    description: "Tayra Interactive - Yaratıcı çözümler ve etkileşimli deneyimler sunan dijital ajans.",
    type: "website",
    locale: "tr_TR",
    siteName: "Tayra Interactive",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tayra Interactive - Her işte bir iz, her izde bir hikaye",
    description: "Tayra Interactive - Yaratıcı çözümler ve etkileşimli deneyimler sunan dijital ajans.",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
