import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
})


export const metadata: Metadata = {
  title: "NoteHub",
  description: "NoteHub — a simple and fast app for creating, organizing, and managing your notes.",
  openGraph: {
    title: "NoteHub",
    description: "NoteHub — a simple and fast app for creating, organizing, and managing your notes.",
    url: "http://localhost:3002/",
    images: '/public/notehubimage.jpeg',
  }
};

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal:React.ReactNode
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <TanStackProvider>
          <Header/>
          {children}
          {modal}
          <Footer/>
          </TanStackProvider>
      </body>
    </html>
  );
}
