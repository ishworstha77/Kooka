import { Button } from "@/components/ui/button";

import Image from "next/image";
import { Facebook } from "lucide-react";
import AutoPlayCarousel from "./AutoPlayCarousel";

export const HomePage = () => {
  return (
    <>
      <div className="bg-[url('/kooka-krumb.jpeg')] min-h-96 bg-fixed bg-center bg-repeat bg-cover flex flex-col justify-center items-center gap-4 text-center">
        <p className="text-2xl md:text-6xl font-semibold text-white">
          WELCOME TO LYNCH’S GOURMET
        </p>
        <p className="text-3xl md:text-6xl font-semibold text-white">
          {" "}
          BREADCRUMBS
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-8">
        <div className="flex flex-col gap-8 items-center">
          <Image
            src="/story.jpeg"
            alt="story"
            width="500"
            height="200"
            className="h-96 w-full object-cover"
          />
          <p className="text-3xl font-semibold text-primary">OUR STORY</p>
          <p className="text-center text-gray-500">
            KooKaKrumb Seasoned Breadcrumbs is proudly, an Australian run family
            business, that produces premium quality breadcrumb coatings for
            food, within Australian and International markets. It started off as
            a small business which I was going to pass over to my wife once it
            got started, however it just got more and more busy and I chose to
            keep working with it. Now we are a nation wide product and have
            grown so much in the past 20 years! Click the link below to read
            more about our story.
          </p>
          <Button variant="outline">Learn more</Button>
        </div>
        <div className="flex flex-col justify-center items-center gap-8">
          <AutoPlayCarousel />

          <p className="text-3xl font-semibold text-primary">OUR BREADCRUMBS</p>
          <p className="text-center text-gray-500">
            We have a range of 13 different flavours which each can be used on
            their own or combined with others to create a culinary delight.
            Click on the button below to find all about our range and what they
            are made of.
          </p>
          <Button variant="outline">View our range</Button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div>
          <p className="text-3xl text-primary font-semibold text-center">
            SEASONED BREADCRUMBS COMES
          </p>
          <p className="text-3xl text-primary font-semibold text-center">
            IN 13 DELICIOUS FLAVORS
          </p>
        </div>
        <div>
          <p className="text-center text-gray-500">
            Find detailed information on our range of flavours and enjoy the
            opportunity to
          </p>
          <p className="text-center text-gray-500">
            {" "}
            purchase our products online through clicking the button below!
          </p>
        </div>
        <Button variant="outline">Visit our shop</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-8">
        <Image
          className="w-full"
          src="/fish.jpeg"
          alt="fish"
          width={1000}
          height={1000}
        />
        <div className="flex flex-col gap-8">
          <p className="text-3xl text-primary font-semibold">
            QUICK AND EASY CRUMBED FISH THAT KIDS WILL LOVE!
          </p>
          <p className="text-xs text-gray-500">
            This recipe is extremely easy to make and should only take roughly
            30 minutes to whip up. Using our flavour breadcrumbs will help
            distract children from the fishy flavour which can often be the
            battle when trying to feed young ones fish. It will also be loved by
            parents as it is just so scrumptious. Check out the recipe in the
            link below!
          </p>
          <div className="flex justify-center">
            <Button variant="outline" className="w-fit">
              QUICK AND EASY CRUMBED FISH
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-8">
        <div className="flex flex-col md:flex-row gap-4">
          <p className="text-xs text-primary font-medium">PANKO BREADCRUMB</p>
          <Image
            src="/breadcrumb/breadcrumb1.jpg"
            alt="breadcrumb1"
            height={500}
            width={500}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <p className="text-xs text-primary font-medium uppercase">
            Gluten free herb & garlic breadcrumb
          </p>
          <Image
            src="/breadcrumb/breadcrumb2.jpg"
            alt="breadcrumb1"
            height={500}
            width={500}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <p className="text-xs text-primary font-medium uppercase">
            Gluten free lemon pepper breadcrumb
          </p>
          <Image
            src="/breadcrumb/breadcrumb3.jpg"
            alt="breadcrumb1"
            height={500}
            width={500}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <p className="text-xs text-primary font-medium">
            MEDITERRANEAN BREADCRUMB
          </p>
          <Image
            src="/breadcrumb/breadcrumb4.jpg"
            alt="breadcrumb1"
            height={500}
            width={500}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-8">
        <p className="text-3xl text-primary font-bold text-center uppercase">
          Lynch’s gourmet breadcrumbs
        </p>
        <Facebook />
        <p className="text-xl text-primary text-center font-semibold">
          FAQ STORE POLICIES CONTACT PRIVACY POLICY
        </p>
      </div>
    </>
  );
};

export default HomePage;
