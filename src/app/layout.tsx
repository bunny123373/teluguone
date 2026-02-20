import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Providers } from "./providers";
import LoadingProvider from "@/components/LoadingProvider";
import PageTransition from "@/components/PageTransition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ["system-ui", "sans-serif"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "TeluguDB - Stream & Download Telugu Movies & Web Series",
    template: "%s | TeluguDB",
  },
  description:
    "Your ultimate destination for Telugu movies and web series. Stream and download the latest content in high quality. Watch Telugu, Hindi, Tamil, Malayalam movies online.",
  keywords: [
    "Telugu movies",
    "Telugu web series",
    "stream movies",
    "download movies",
    "Telugu cinema",
    "Hindi dubbed",
    "Tamil movies",
    "Malayalam movies",
    "online streaming",
  ],
  authors: [{ name: "TeluguDB" }],
  creator: "TeluguDB",
  publisher: "TeluguDB",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://teluguone.vercel.app",
    siteName: "TeluguDB",
    title: "TeluguDB - Stream & Download Telugu Movies & Web Series",
    description:
      "Your ultimate destination for Telugu movies and web series. Stream and download the latest content in high quality.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TeluguDB",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TeluguDB - Stream & Download Telugu Movies & Web Series",
    description:
      "Your ultimate destination for Telugu movies and web series. Stream and download the latest content in high quality.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://teluguone.vercel.app",
  },
  icons: {
    icon: "/prime-icon.svg",
    apple: "/prime-icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased">
        <SpeedInsights />
        <LoadingProvider>
          <Providers>
            <PageTransition>{children}</PageTransition>
          </Providers>
        </LoadingProvider>
      </body>
    </html>
  );
}
