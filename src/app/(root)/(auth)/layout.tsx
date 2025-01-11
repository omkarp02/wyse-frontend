import RouteNavbar from "@/components/navbar/RouteNavbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <RouteNavbar />
      {children}
    </main>
  );
}
