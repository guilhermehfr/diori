import { MenuAdmin } from "@/src/components/admin/MenuAdmin";

export default function AdminPostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MenuAdmin />
      {children}
    </>
  );
}
