import Providers from "@/provider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Providers>
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
