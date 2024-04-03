"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

import Autoplay from "embla-carousel-autoplay";

function AutoPlayCarousel() {
  return (
    <Carousel
      className="w-1/2"
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
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
  );
}

export default AutoPlayCarousel;
