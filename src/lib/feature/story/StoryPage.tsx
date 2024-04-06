import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Footer } from "../shared/Footer";

const StoryPage = () => {
  return (
    <>
      <div className="flex justify-center">
        <Image
          className="aspect-video object-contain "
          src="/story/kooka-story.jpeg"
          alt="kooka story"
          // fill
          height={5}
          width={1000}
        />
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-3xl text-primary font-semibold">OUR STORY</p>
        <p className="text-xs text-gray-500">
          Kookakrumb Seasoned Breadcrumbs is proudly, an Australian run family
          business, that produces premium quality breadcrumb coatings for food,
          within Australian and International markets. The business first start
          producing the delicious breadcrumbs in a small factory located in
          Subiaco, WA. Slowly as the demand for Kookakrumb breadcrumbs increased
          a larger processing facility had to be sourced and we moved over to
          Osborne Park, WA. This Western Australian family owned business is
          backed by a team that encourages a close knit and fun work place
          culture.
        </p>
        <p className="text-xs text-gray-500">
          The Kookakrumb recipes were age old family favourites which had been
          handed down through generations that are now available to all! They
          are a delicious crumb coating for a variety of products which can
          include chicken, meat, fish and vegetables. At Kookakrumb we only use
          the highest quality ingredients so that the Kookakrumb range of
          gourmet seasoned breadcrumbs provides the perfect way to turn any
          average meal into a culinary delight!
        </p>
        <p className="text-xs text-gray-500">
          Our processing facility in Welshpool, Western Australia, supplies over
          2000 supermarkets, butchers, growers markets, and fresh fish retailers
          with in Australia. Not only distributing through out Australia we also
          export our crumbs to a few countries outside our beloved land,
          including Hong Kong, Singapore and the Philippines.
        </p>
        <p className="text-xs text-gray-500">
          Our facility follows BRC and HACCP quality assurance policies, and is
          audited for food quality and safety once a year. We have been
          successfully selling our range of products in Perth since January 1996
          and have supplied independent supermarkets since July 1998. Since then
          we have successfully launched our products into Coles and Woolworths
          supermarket chains.
        </p>
        <p className="text-xs text-gray-500">
          What started off as a delicious family meal has now been turned into a
          high quality household product with a variety of uses. Kookakrumb is
          preferred as it has body, natural consistent flavour and the crumbs is
          fine so it always stay on, which can often be seen as an issue from
          other lower quality products.
        </p>
        <p className="text-xs text-gray-500">
          The Kookakrumb range of seasoned breadcrumbs encompasses all tastes
          with 13 different flavours which include: Herb & Garlic, Lemon Pepper,
          Cajun Spices, Parmesan, Spicy, Salt & Pepper Squid, Fine White, Golden
          Fish Batter, Mediterranean, Gluten Free Breadcrumb, Gluten Free Herb &
          Garlic, Gluten Free Lemon Pepper, and our own Australian made Panko
          breadcrumbs. These products are ideal for fish, chicken, meat and
          vegetables. They are a great time saver for those who already season
          their own crumbs and an easy way to enhance the flavour of an ordinary
          dish! The crumb can simply be pressed directly onto the flesh, or for
          a traditional coating you can dip into flour, egg mixture and
          flavoured crumb.
        </p>
      </div>
      <div className="flex justify-center">
        <Button variant="outline">LEARN MORE ABOUT OUT BREADCRUMB</Button>
      </div>
    </>
  );
};

export default StoryPage;
