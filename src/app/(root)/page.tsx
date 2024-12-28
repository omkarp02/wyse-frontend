"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  NextButton,
  PrevButton,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useRef } from "react";

const carouselHeight = "h-[40vh]";
const images = [
  {
    link: "https://picsum.photos/id/870/200/300",
  },
  {
    link: "https://picsum.photos/id/871/200/300",
  },
  {
    link: "https://picsum.photos/id/872/200/300",
  },
  {
    link: "https://picsum.photos/id/873/200/300",
  },
  {
    link: "https://picsum.photos/id/874/200/300",
  },
];

export default function Home() {
  const autoplayPlugin = useRef(Autoplay({ delay: 3000 }));
  // plugins={[autoplayPlugin.current]}
  // <img src={`https://picsum.photos/id/${index}/200/300`} />
  const options = { loop: true };

  return (
    <>
      <Carousel className="h-[40vh]">
        <CarouselContent className="h-full">
          {images.map((e, i) => (
            <CarouselItem key={i} className="relative">
              <Image alt="asdf" src={e.link} fill />
            </CarouselItem>
          ))}
        </CarouselContent>
       
      </Carousel>
    </>
  );
}
