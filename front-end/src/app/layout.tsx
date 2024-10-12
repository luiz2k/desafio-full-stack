import type { Metadata } from "next";
import "@/styles/modern-normalize.css";
import "@/styles/globals.css";
import { Roboto } from "next/font/google";

export const metadata: Metadata = {
  title: "",
  description: "",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={roboto.className}>
      <body>{children}</body>
    </html>
  );
}
