import DesktopProductFilter from "@/components/filter/DesktopFilter";
import MobileProductFilter from "@/components/filter/MobileFilter";
import { showOnDesktopClass } from "@/constants/common";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <div className="flex  relative">
        <DesktopProductFilter className={`md:w-3/12 mt-[60px] ${showOnDesktopClass}`} />
        <div className="md:w-9/12">{children}</div>
      </div>
      <MobileProductFilter />
    </main>
  );
}
