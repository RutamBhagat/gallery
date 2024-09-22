import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Navbar } from "~/components/navbar";
import Providers from "~/components/providers";
import { Toaster } from "~/components/ui/sonner";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Created by Rutam",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <Providers>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body className="">
          <Navbar />
          <main>{children}</main>
          {modal}
          <Toaster />
          <div id="modal-root" />
        </body>
      </html>
    </Providers>
  );
}
