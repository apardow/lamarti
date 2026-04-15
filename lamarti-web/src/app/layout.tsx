import type { Metadata } from "next";
import { Inter, Montserrat, Lora } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const lora = Lora({
  variable: "--font-editorial",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Corporación José Martí · Concepción, Chile",
    template: "%s | Corporación José Martí",
  },
  description:
    "Corporación José Martí de Concepción, Chile. Solidaridad internacionalista, formación política y cultura latinoamericana desde 1990.",
  metadataBase: new URL("https://new.lamarti.org"),
  openGraph: {
    type: "website",
    siteName: "Corporación José Martí",
    locale: "es_CL",
    title: "Corporación José Martí · Concepción, Chile",
    description:
      "Solidaridad internacionalista, formación política y cultura latinoamericana desde 1990.",
    images: ["/images/logo/lamarti.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corporación José Martí · Concepción, Chile",
    description:
      "Solidaridad internacionalista, formación política y cultura latinoamericana desde 1990.",
    images: ["/images/logo/lamarti.png"],
  },
  icons: {
    icon: "/images/logo/lamarti.png",
    apple: "/images/logo/lamarti.png",
  },
  robots: { index: true, follow: true },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Corporación José Martí",
  alternateName: "La Martí Concepción",
  url: "https://lamarti.org",
  logo: "https://lamarti.org/images/logo/lamarti.png",
  foundingDate: "1990-07",
  description:
    "Corporación José Martí de Concepción, Chile. Solidaridad internacionalista, formación política y cultura latinoamericana desde 1990.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Concepción",
    addressRegion: "Biobío",
    addressCountry: "CL",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${montserrat.variable} ${lora.variable}`}
    >
      <body className="min-h-screen selection:bg-marti-orange selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
