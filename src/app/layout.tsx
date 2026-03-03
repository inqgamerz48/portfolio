import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "INQ — Full Stack Developer & Systems Builder",
  description: "Portfolio of Sriram Satya Srivatsa Nanduri (INQ). Full Stack Developer. AI-Integrated Systems. Production-grade products.",
  keywords: ["Full Stack Developer", "AI", "Next.js", "FastAPI", "Portfolio", "INQ"],
  authors: [{ name: "INQ" }],
  openGraph: {
    title: "INQ — Full Stack Developer & Systems Builder",
    description: "Portfolio of Sriram Satya Srivatsa Nanduri (INQ)",
    url: "https://portfolio-inq.pages.dev",
    siteName: "INQ",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
