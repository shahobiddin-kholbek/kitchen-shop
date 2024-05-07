import AdminFooter from "@/components/AdminPanel/AdminLayout/AdminFooter/AdminFooter";
import AdminHeader from "@/components/AdminPanel/AdminLayout/AdminHeader/AdminHeader";
import type { Metadata } from "next";

import "./globals.css";
import AdminMenu from "@/components/AdminPanel/AdminMenu/AdminMenu";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin Panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`container max-w-screen-lg mx-auto border`}>
      <header>
        <AdminHeader />
      </header>
      <main className="min-h-[60vh]">
        {/* <AdminMenu /> */}
        {children}
      </main>
      <AdminFooter />
    </div>
  );
}
