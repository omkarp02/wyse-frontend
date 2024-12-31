"use client"

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import React from "react";

const imageLink = [
  "https://nobero.com/cdn/shop/files/WebImagesHeavyCargo-0011.webp?v=1734158131",
  "https://nobero.com/cdn/shop/files/WebImagesHeavyCargo-0006.webp?v=1734158131",
  "https://nobero.com/cdn/shop/files/WebImagesHeavyCargo-0007.webp?v=1734158131&width=360",
  "https://nobero.com/cdn/shop/files/WebImagesHeavyCargo-0010.webp?v=1734158131&width=360",
];

const ProductPage = () => {
  return (
    <div>
      <section>
        <Carousel className="relative mt-4">
          <CarouselContent >
            {imageLink.map((e, i) => (
              <CarouselItem key={i} className="relative basis-11/12 px-1">
                <Image
                  alt="asdf"
                  src={e}
                  width={500}
                  height={500}
                  style={{ height: "auto", width: "100%" }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
      
    </div>
  );
};

export default ProductPage;
