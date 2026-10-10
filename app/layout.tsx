import type { Metadata } from "next";
import "./globals.css";
import "./god-tier.css";
import "./language.css";
import LanguageSync from "./LanguageSync";

export const metadata: Metadata = {
  title: "QoiaX Wizard — PlayStation Save Toolkit",
  description: "A glass-inspired PlayStation save workspace with tutorials, save workflows, and CUSA lookup.",
  applicationName: "QoiaX Wizard",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><LanguageSync />{children}</body></html>;
}
