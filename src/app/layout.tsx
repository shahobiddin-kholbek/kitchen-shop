import type { Metadata } from "next";
import "./globals.css";
import HeaderCP from "@/components/Header/HeaderCP";
import FooterCP from "@/components/Footer/FooterCP";
import ReduxWrapper from "@/provider/redux/ReduxWrapper";
import MenuNav from "@/components/Menu/MenuNav";

export const metadata: Metadata = {
  title: "Kitchen shop next",
  description: "Kitchen shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxWrapper>
          <div className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl`}>
            <header >
              <HeaderCP />
            </header>
            <main className="min-h-[60vh]">
              <MenuNav />
              {children}
            </main>
            <footer className="flex justify-center items-center h-[150px] border-t-2">
              <FooterCP />
            </footer>
          </div>
        </ReduxWrapper>
      </body>
    </html>
  );
}
