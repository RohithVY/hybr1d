import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TanstackProvider from "@/providers/TanstackProvider";
import NewsContextProvider from "@/providers/NewsContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "News Application",
  description: "A news application built using hacker news",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="night">
      <body className={inter.className}>
        <TanstackProvider>
          <NewsContextProvider>
            <div className="w-full min-h-screen min-w-[90vw]">{children}</div>
          </NewsContextProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
