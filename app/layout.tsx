import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QoiaX Wizard",
  description: "A clean PlayStation save toolkit and CUSA title-ID search.",
  applicationName: "QoiaX Wizard",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
