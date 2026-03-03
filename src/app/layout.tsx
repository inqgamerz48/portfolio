import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "INQ — Full Stack Developer & Systems Builder",
  description: "Portfolio of Sriram Satya Srivatsa Nanduri (INQ). Full Stack Developer. AI-Integrated Systems. Production-grade products.",
  keywords: ["Full Stack Developer", "AI", "Next.js", "FastAPI", "Portfolio", "INQ"],
  authors: [{ name: "INQ" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CustomCursor />
        {children}
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
