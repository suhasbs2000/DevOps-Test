import type { Metadata } from "next";
import "../styles.css";

export const metadata: Metadata = {
  title: "Harbor House Hotel | A slower kind of stay",
  description:
    "A slower kind of seaside stay at Harbor House Hotel, on the quiet edge of the coast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}