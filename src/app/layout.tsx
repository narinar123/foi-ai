import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QoderWork — AI Agentic Workspace",
  description: "Beyond chat, get it done. AI desktop assistant that plans, executes, and delivers. Bringing agentic capabilities beyond code.",
  keywords: "AI workspace, agentic AI, task management, productivity, QoderWork",
  authors: [{ name: "Guide Soft IT Solutions" }],
  openGraph: {
    title: "QoderWork — AI Agentic Workspace",
    description: "Beyond chat, get it done. Just tell QoderWork what you need — it plans, executes, and delivers, keeping you in the loop.",
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
      <body className="antialiased" style={{ height: '100vh', overflow: 'hidden' }}>
        {children}
      </body>
    </html>
  );
}
