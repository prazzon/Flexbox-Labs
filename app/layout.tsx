/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from "next";
import { Inconsolata, Quicksand } from "next/font/google";
import { SettingsProvider } from "./_context/SettingsContext";
import "./global.scss";
import StoreProvider from "./storeProvider";
import CustomToaster from "./_components/CustomToaster";

const quicksand = Quicksand({
   subsets: ["latin"],
   variable: "--font-quicksand",
   display: "swap",
});

const inconsolata = Inconsolata({
   subsets: ["latin"],
   variable: "--font-inconsolata",
   display: "swap",
});

const siteUrl =
   process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
   metadataBase: new URL(siteUrl),
   title: {
      default: "Flexbox Labs",
      template: "%s | Flexbox Labs",
   },
   description:
      "A visual tool for experimenting with flexbox and CSS grid layouts.",
   applicationName: "Flexbox Labs",
   openGraph: {
      type: "website",
      locale: "en_US",
      url: "/",
      siteName: "Flexbox Labs",
      title: "Flexbox Labs",
      description:
         "A visual tool for experimenting with flexbox and CSS grid layouts.",
   },
   twitter: {
      card: "summary_large_image",
      title: "Flexbox Labs",
      description:
         "A visual tool for experimenting with flexbox and CSS grid layouts.",
   },
   alternates: {
      canonical: "/",
   },
   robots: {
      index: true,
      follow: true,
   },
};

interface RootLayoutProps {
   children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
   return (
      <html
         lang="en"
         className={`${quicksand.variable} ${inconsolata.variable}`}
      >
         <body>
            <SettingsProvider>
               <StoreProvider>{children}</StoreProvider>
               <CustomToaster />
            </SettingsProvider>
         </body>
      </html>
   );
}
