import Navbar from "@/components/navbar/Navbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <Navbar />
      <div className="mt-navbar pt-1">{children}</div>
    </main>
  );
}
