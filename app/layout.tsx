import type { Metadata } from "next";
import { Geist, Inter, Kaisei_HarunoUmi } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import "./globals.css";



const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "BrainBento",
  description: "Study smarter with interactive flashcards and ace your exams",
  icons: {
    icon: "./favicon.ico",
    apple:  "./favicon.ico",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const kaisei = Kaisei_HarunoUmi({
  variable: "--font-kaisei",
  subsets: ["latin"],
  weight: ["400","700"],
  display:"swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} ${kaisei.variable} ${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header /> {/* Add it here */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
