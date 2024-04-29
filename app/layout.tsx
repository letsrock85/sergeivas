import "@/app/styles/globals.css";
import Script from "next/script";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { incognito } from "./font/font";
import { gitlabmono } from "./font/font";
import Navbar from "./components/global/Navbar";
import Footer from "./components/global/Footer";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--inter",
});

const options = {
  title: "Sergei Vasilevich | Software Developer",
  description:
    "I'm a leader of a team of developers and artists specializing in AI, business intelligence, and content creation. My passion and expertise in IT solutions and development help bring the boldest ideas to life",
  url: "https://sergeivas.com",
  ogImage:
    "https://res.cloudinary.com/sergeivas/image/upload/v1692635746/sergeivas/og.png",
};

export const metadata: Metadata = {
  title: options.title,
  metadataBase: new URL(options.url),
  description: options.description,
  openGraph: {
    title: options.title,
    url: options.url,
    siteName: "sergeivas.com",
    locale: "en-US",
    type: "website",
    description: options.description,
    images: options.ogImage,
  },
  alternates: {
    canonical: options.url,
  },
  other: {
    "google-site-verification": "IzcWMgn5Qjf-LCtA337KTGjivsf9bmod_1pZ-jxYQh8",
  },
};

export default function RootLayout({ children, }: {
  children: React.ReactNode;
}) {
  console.log(process.env.NODE_ENV);
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${incognito.variable} ${inter.className} ${gitlabmono.variable} dark:bg-zinc-900 bg-grey dark:text-white text-zinc-700`}
      >
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
      {/* <Script
        async
        src="https://umami-for-traffic-analytics.vercel.app/script.js"
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || ""}
      /> */}
      {
        process.env.NODE_ENV === 'production' && (
          <Script async defer src="https://stats.sergeivas.com/tracker.js" data-website-id="cluvqnimm0001mt4b4uhegi86"></Script>
        )
      }
    </html>
  );
}
