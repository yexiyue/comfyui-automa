import Slider from "@/components/DatesSlider";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <main className=" flex flex-row">
      <section
        className="w-1/5 scrollbar-hide max-w-xs min-w-[200px]"
        style={{
          height: "calc(100vh - 56px)",
        }}
      >
        <Slider></Slider>
      </section>
      <section className="flex-1 h-full p-4">
        <Outlet></Outlet>
      </section>
    </main>
  );
}
