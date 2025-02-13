import ProductFilter from "@/components/filter/Filter";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {



  return (
    <main>
      {children}
    </main>
  );
}
