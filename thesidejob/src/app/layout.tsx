import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#EF4444",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "THESIDEJOB — Build. Collaborate. Launch.",
  description:
    "A student-led tech builder community turning ideas into scalable products. Founded by CSE students from Parul University, Vadodara.",
  keywords: [
    "THESIDEJOB",
    "tech community",
    "student builders",
    "Parul University",
    "startup",
    "side projects",
  ],
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "THESIDEJOB — Build. Collaborate. Launch.",
    description:
      "A student-led tech builder community turning ideas into scalable products.",
    type: "website",
    locale: "en_US",
    siteName: "THESIDEJOB",
  },
  twitter: {
    card: "summary_large_image",
    title: "THESIDEJOB — Build. Collaborate. Launch.",
    description:
      "A student-led tech builder community turning ideas into scalable products.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "THESIDEJOB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
