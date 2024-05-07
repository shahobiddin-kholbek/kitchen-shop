import AdminMenu from "@/components/AdminPanel/AdminMenu/AdminMenu";

export default function AdminMenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={``}>
        <AdminMenu />
        {children}
    </div>
  );
}
