"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useRef } from "react";
import Slider from "react-slick";

const carouselHeight = "h-[40vh]";

export default function Home() {

  const autoplayPlugin = useRef(
    Autoplay({ delay: 1000 })
  );


  return (
    <>
      <div>
        <Carousel  plugins={[autoplayPlugin.current]} opts={{loop: true}} className="w-full max-w-xs">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className={`${carouselHeight}`}>
                  sdf
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}
