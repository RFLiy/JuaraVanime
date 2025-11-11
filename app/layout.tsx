import "./globals.css";


import Navbar from "../components/Navbar";

export const metadata = {
  title: "Anime Stream - Jikan API",
  description: "Website anime streaming metadata menggunakan Jikan API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <main className="max-w-[1100px] mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
