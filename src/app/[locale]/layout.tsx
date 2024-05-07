import type { Metadata } from "next";
// import "./globals.css";
// import HeaderCP from "@/components/Header/HeaderCP";
// import FooterCP from "@/components/Footer/FooterCP";
import ReduxWrapper from "@/provider/redux/ReduxWrapper";
// import MenuNav from "@/components/Menu/MenuNav";
import { NextIntlClientProvider, useMessages } from "next-intl";
import ProviderTheme from './ProviderTheme'

export const metadata: Metadata = {
  title: "Kitchen shop next",
  description: "Kitchen shop",
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages()
  return (
    <html lang={locale}>
      <body>
        <ReduxWrapper>
          <ProviderTheme>
            <NextIntlClientProvider
              locale={locale} messages={messages}>
              {children}
            </NextIntlClientProvider>
          </ProviderTheme>
        </ReduxWrapper>
      </body>
    </html>
  );
}
