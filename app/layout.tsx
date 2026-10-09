import "./globals.css";

export const metadata = {
  title: "QoiaX",
  description: "A clean and simple PlayStation save toolkit.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
