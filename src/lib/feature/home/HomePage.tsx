import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Facebook } from "lucide-react";

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
          <p className="text-3xl font-semibold text-gray-700">OUR STORY</p>
          <p className="text-center">
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
          <Carousel className="w-1/2">
            <CarouselContent>
              {[1, 2, 3, 4, 5, 6]?.map((item) => (
                <CarouselItem key={item}>
                  {" "}
                  <Image
                    className="w-600 h-600"
                    src={`/breadcrumb/breadcrumb${item}.jpg`}
                    alt="breadcrumb1"
                    width="600"
                    height="600"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <p className="text-3xl font-semibold text-gray-700">
            OUR BREADCRUMBS
          </p>
          <p className="text-center">
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
          <p className="text-3xl text-gray-700 font-semibold text-center">
            SEASONED BREADCRUMBS COMES
          </p>
          <p className="text-3xl text-gray-700 font-semibold text-center">
            IN 13 DELICIOUS FLAVORS
          </p>
        </div>
        <div>
          <p className="text-center">
            Find detailed information on our range of flavours and enjoy the
            opportunity to
          </p>
          <p className="text-center">
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
          <p className="text-3xl text-gray-700 font-semibold">
            QUICK AND EASY CRUMBED FISH THAT KIDS WILL LOVE!
          </p>
          <p className="text-xs">
            THIS RECIPE IS EXTREMELY EASY TO MAKE AND SHOULD ONLY TAKE ROUGHLY
            30 MINUTES TO WHIP UP. USING OUR FLAVOUR BREADCRUMBS WILL HELP
            DISTRACT CHILDREN FROM THE FISHY FLAVOUR WHICH CAN OFTEN BE THE
            BATTLE WHEN TRYING TO FEED YOUNG ONES FISH. IT WILL ALSO BE LOVED BY
            PARENTS AS IT IS JUST SO SCRUMPTIOUS. CHECK OUT THE RECIPE IN THE
            LINK BELOW!
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
          <p className="text-xs text-gray-700 font-medium">PANKO BREADCRUMB</p>
          <Image
            src="/breadcrumb/breadcrumb1.jpg"
            alt="breadcrumb1"
            height={500}
            width={500}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <p className="text-xs text-gray-700 font-medium">
            GLUTEN FREE HERB & GARLIC BREADCRUMB
          </p>
          <Image
            src="/breadcrumb/breadcrumb2.jpg"
            alt="breadcrumb1"
            height={500}
            width={500}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <p className="text-xs text-gray-700 font-medium">
            GLUTEN FREE LEMON PEPPER BREADCRUMB
          </p>
          <Image
            src="/breadcrumb/breadcrumb3.jpg"
            alt="breadcrumb1"
            height={500}
            width={500}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <p className="text-xs text-gray-700 font-medium">
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
        <p className="text-3xl text-gray-700 font-bold text-center">
          LYNCH’S GOURMET BREADCRUMBS
        </p>
        <Facebook />
        <p className="text-xl text-gray-700 text-center font-semibold">
          FAQ STORE POLICIES CONTACT PRIVACY POLICY
        </p>
        <p className="text-xs text-gray-700 font-semibold text-center">
          POWERED BY SQUARESPACE
        </p>
      </div>
    </>
  );
};

export default HomePage;
