import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactQueryClientProvider } from "@/providers/ReactQueryClientProvider";
import { CartProvider } from "@/context/CartProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kesik Bıçakçılık",
  description: "Handcrafted blades for every purpose.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryClientProvider>
          <CartProvider>{children}</CartProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
