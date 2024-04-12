import type { Metadata } from "next";
import "./globals.css";

import { Poppins, Roboto_Mono } from "next/font/google";
import Link from "next/link";
import { Provider } from "./provider";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "Kookakrumb",
  description: "KookaKrumb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${roboto_mono.variable}`}>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
