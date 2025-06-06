import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./globals.css";
import ReactQueryProvider from "@/components/provider/ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WYSE Shop",
  description: "Discover trendy outfits and elevate your style with WYSE Shop.",
  openGraph: {
    title: "WYSE Shop - Fashion for Every Mood",
    description:
      "Explore our latest collection of streetwear, casual, and formal outfits. Shop now and redefine your wardrobe.",
    url: "https://wyse-shop.vercel.app/", // Update with your actual domain
    siteName: "WYSE Shop",
    images: [
      {
        url: "https://wyse-shop.vercel.app/wyse-thumbnail.png", // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "WYSE Shop - Trendy Clothing",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WYSE Shop - Style Starts Here",
    description:
      "Shop the latest fashion trends at WYSE Shop. Outfits that speak your style.",
    images: ["https://wyse-shop.vercel.app/wyse-thumbnail.png"], // Replace with your actual image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <body className={`${roboto.className} antialiased`}>
          {children}
          <Toaster />
        </body>
      </ReactQueryProvider>
    </html>
  );
}
