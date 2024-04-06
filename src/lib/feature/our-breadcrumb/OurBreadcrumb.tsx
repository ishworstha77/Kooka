import { Button } from "@/components/ui/button";
import Image from "next/image";

export const OurBreadCrumb = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-8">
        <Image
          src="/breadcrumb/breadcrumbgroup.jpg"
          alt="breadcrumb group"
          width={1000}
          height={1000}
        />
        <p className="text-3xl text-primary font-semibold">OUR BREADCRUMBS</p>
        <p className=" text-gray-500">
          What started off as a delicious family meal has now been turned into a
          high quality household product with a variety of uses. Kookakrumb is
          preferred as it has body, natural consistent flavour and the crumb is
          fine so it always stays on, which can often be seen as an issue from
          other lower quality products.
        </p>
        <p className=" text-gray-500">
          The Kookakrumb range of seasoned breadcrumbs encompasses all tastes
          with 13 different flavours which include:
        </p>
        <p className=" text-gray-500">Lemon Pepper</p>

        <p className=" text-gray-500">Cajun Spices</p>

        <p className=" text-gray-500">Parmesan</p>
        <p className=" text-gray-500">Spicy</p>

        <p className=" text-gray-500">Salt & Pepper Squid</p>

        <p className=" text-gray-500">Fine White</p>

        <p className=" text-gray-500">Golden Fish Batter</p>

        <p className=" text-gray-500">Mediterranean</p>

        <p className=" text-gray-500">Gluten Free Breadcrumb</p>

        <p className=" text-gray-500">Gluten Free Herb & Garlic</p>

        <p className=" text-gray-500">Gluten Free Lemon Pepper</p>

        <p className=" text-gray-500">Panko</p>
        <p className=" text-gray-500">
          These products are ideal for fish, chicken, meat and vegetables. They
          are a great time saver for those who already season their own crumbs
          and an easy way to enhance the flavour of an ordinary dish! The crumb
          is very fine so can be simply pressed directly onto the flesh or for a
          traditional coating you can dip into flour, then egg mixture and after
          into the flavoured crumb.
        </p>
        <Button variant="outline" className="w-fit">
          Visit Our Shop
        </Button>
      </div>
    </>
  );
};

export default OurBreadCrumb;
