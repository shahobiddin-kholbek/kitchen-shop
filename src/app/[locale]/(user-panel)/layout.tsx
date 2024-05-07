import type { Metadata } from "next";
import "./globals.css";
import HeaderCP from "@/components/Header/HeaderCP";
import MenuNav from "@/components/Menu/MenuNav";
import FooterCP from "@/components/Footer/FooterCP";

export const metadata: Metadata = {
    title: "Kitchen shop",
    description: "Kitchen shop",
};

export default function UserLayout({
    children,
    // params: { locale },
}: {
    children: React.ReactNode;
    // params: { locale: string };
}) {
    return (
        // <html lang={locale}>
        //     <body>
        <div className={`container max-w-screen-lg mx-auto border`}>
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

        //     </body>
        // </html>
    );
}
