import AuthNavbar from "@/components/navbar/RouteNavbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      {children}
    </main>
  );
}
