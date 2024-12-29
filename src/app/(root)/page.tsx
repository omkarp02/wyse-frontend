"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  DotButton,
  NextButton,
  PrevButton,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, DollarSign, Truck, Undo2 } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const carouselHeight = "h-[40vh]";
const images = [
  {
    link: "https://nobero.com/cdn/shop/files/Sale_D2C_banners_-07_1.webp?v=1731670749&width=360",
  },
  {
    link: "https://nobero.com/cdn/shop/files/Sale_D2C_banners_-07.webp?v=1731670750&width=360",
  },
  {
    link: "https://nobero.com/cdn/shop/files/Sale_D2C_banners_-06.webp?v=1731670750&width=360",
  },
  {
    link: "	https://nobero.com/cdn/shop/files/HOME-PAGE-MOBILE1.jpg?v=1735376673&width=3600",
  },
  {
    link: "https://nobero.com/cdn/shop/files/Sale_D2C_banners_-10.webp?v=1731670749&width=360",
  },
  {
    link: "https://nobero.com/cdn/shop/files/Travel_Cargo_Home_Page_Banner_Mobile_copy.webp?v=1732190346&width=360",
  },
];

const trendingimages = [
  {
    link: "https://nobero.com/cdn/shop/files/CARGO-PANTS_1.jpg",
  },
  {
    link: "https://nobero.com/cdn/shop/files/WhatsApp_Image_2024-12-10_at_12.03.02_PM.jpg",
  },
  {
    link: "https://nobero.com/cdn/shop/files/WhatsApp_Image_2024-12-09_at_6.30.14_PM.jpg",
  },
  {
    link: "https://nobero.com/cdn/shop/files/WhatsApp_Image_2024-12-09_at_6.30.15_PM.jpg",
  },
];

const categoriesImg = [
  {
    link: "https://nobero.com/cdn/shop/files/Hoodies_3.jpg",
    name: "hoodies",
  },
  {
    link: "https://nobero.com/cdn/shop/files/O._Tees_1_268fd8dd-926a-4d4b-a48b-e53b1bc823c2.png",
    name: "t-shirt",
  },
  {
    link: "https://nobero.com/cdn/shop/files/O._Tees_1.png",
    name: "oversized tshirt",
  },
  {
    link: "https://nobero.com/cdn/shop/files/Hoodies_6_7344e12e-e51d-4d04-a51c-14119bcc3ba7.jpg",
    name: "jacket",
  },
  {
    link: "https://nobero.com/cdn/shop/files/Hoodies_1.png",
    name: "hoodies",
  },
  {
    link: "https://nobero.com/cdn/shop/files/Joggers_1_d89bfdeb-6295-49a8-9160-7853ed6b1088.png",
    name: "hoodies",
  },
  {
    link: "https://nobero.com/cdn/shop/collections/9.jpg",
    name: "hoodies",
  },
  {
    link: "https://nobero.com/cdn/shop/collections/8.jpg",
    name: "hoodies",
  },
  {
    link: "https://nobero.com/cdn/shop/files/Shorts_6ca0b211-d2f3-4232-844e-4e5c4b4c2d5f.png",
    name: "hoodies",
  },
  {
    link: "https://nobero.com/cdn/shop/collections/Cargo_Pants_Icon_Home_Page_copy.jpg",
    name: "hoodies",
  },
  {
    link: "https://nobero.com/cdn/shop/files/travel_jogger_copy.png",
    name: "hoodies",
  },
];

export default function Home() {
  const autoplayPlugin = useRef(Autoplay({ delay: 3000 }));
  // plugins={[autoplayPlugin.current]}
  // <img src={`https://picsum.photos/id/${index}/200/300`} />
  const options = { loop: true };

  return (
    <>
      <Carousel className="relative">
        <CarouselContent className="h-[35vh]">
          {images.map((e, i) => (
            <CarouselItem key={i} className="relative">
              <Image alt="asdf" src={e.link} fill />
            </CarouselItem>
          ))}
        </CarouselContent>
        <DotButton className="absolute transform translate-x-[-50%] left-1/2 bottom-0" />
      </Carousel>

      {/* Most trending section */}

      <section className="text-center mt-6 ">
        <p className="heading">Most Trending</p>
        <p className="text-sm mt-2">Check Out Now</p>
        <Carousel className="relative mt-4">
          <CarouselContent className="h-[40vh]">
            {trendingimages.map((e, i) => (
              <CarouselItem key={i} className="relative basis-2/3 px-1">
                <Image
                  alt="asdf"
                  src={e.link}
                  width={500}
                  height={500}
                  style={{ height: "100%", width: "100%" }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      {/* features section */}

      <section className="bg-primary-100 text-primary h-20 flex justify-between px-2 my-8">
        <div className="flex items-center gap-2">
          <DollarSign />
          <div>
            <p className="font-bold text-sm uppercase tracking-wide">cash on</p>
            <p className="uppercase text-sm font-medium">delivery</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Truck />
          <div>
            <p className="font-bold text-sm uppercase tracking-wide">free</p>
            <p className="uppercase text-sm font-medium">shipping</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Undo2 />
          <div>
            <p className="font-bold text-sm uppercase tracking-wide">easy</p>
            <p className="uppercase text-sm font-medium">return</p>
          </div>
        </div>
      </section>

      {/* Categories */}

      <section>
        <p className="heading">Shop For Men</p>
        <div className="flex flex-wrap justify-center">
          {categoriesImg.map((ele, index) => (
            <div className="w-[45%] h-[45%] mx-2 my-4 relative">
              <Image
                alt="asdf"
                src={ele.link}
                width={300}
                height={300}
              />
              <p className="text-center">{ele.name}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
