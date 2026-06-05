import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FOI.AI — AI Agentic Workspace",
  description: "Beyond chat, get it done. AI desktop assistant that plans, executes, and delivers. Bringing agentic capabilities beyond code.",
  keywords: "AI workspace, agentic AI, task management, productivity, FOI.AI",
  authors: [{ name: "Guide Soft IT Solutions" }],
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/foi-icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "FOI.AI — AI Agentic Workspace",
    description: "Beyond chat, get it done. Just tell FOI.AI what you need — it plans, executes, and delivers, keeping you in the loop.",
    type: "website",
    images: [{ url: '/foi-icon.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FOI.AI — AI Agentic Workspace',
    images: ['/foi-icon.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body className="antialiased" style={{ height: '100vh', overflow: 'hidden' }}>
        {children}
      </body>
    </html>
  );
}
