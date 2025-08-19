import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { users } from "@/data/mockData";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ExamCenter - Online Test Platform",
  description: "A comprehensive online exam center for schools and educational institutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Mock current user (in a real app, this would come from authentication)
  const currentUser = users[0];

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header user={currentUser} />
        <main>{children}</main>
      </body>
    </html>
  );
}
