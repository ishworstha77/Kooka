import OurBreadCrumb from "@/lib/feature/our-breadcrumb/OurBreadcrumb";
import { Footer } from "@/lib/feature/shared/Footer";
import Navbar from "@/lib/feature/shared/Navbar";

export default function Story() {
  return (
    <main className="flex justify-center">
      <div className="flex flex-col p-2 md:px-8 md:py-4 gap-14 w-full max-w-screen-2xl">
        <Navbar />
        <OurBreadCrumb />
        <Footer />
      </div>
    </main>
  );
}
