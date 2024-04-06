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
      className="w-5/6"
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        {[1, 2, 3, 4, 5, 6, 7, 8]?.map((item) => (
          <CarouselItem key={item}>
            {" "}
            <div className="relative h-[300px] w-full object-cover">
              <Image
                className="object-cover"
                src={`/breadcrumb/breadcrumb${item}.png`}
                alt="breadcrumb1"
                fill
                // width="1000"
                // height=""
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default AutoPlayCarousel;
