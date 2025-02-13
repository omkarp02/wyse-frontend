import {
  Carousel,
  CarouselContent,
  CarouselItem,
  DotButton,
} from "@/components/ui/carousel";

import { getCategoriesApi } from "@/services/master/categories";
import { getProductList } from "@/services/product/list-product";
import { ICategory, IProductList } from "@/types/api";

import { DollarSign, Truck, Undo2 } from "lucide-react";
import { unstable_cache } from "next/cache";
import Image from "next/image";
import { cache } from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "./_component/ProductCard";
import { useBoundStore } from "@/store/store";
import {
  BESTSELLER_PRODUCT,
  CATEGORY_LIST,
  LATEST_PRODUCT,
} from "@/constants/reactquery";
import Link from "next/link";
import { generateProductUrl } from "@/utils/helper";

const revalidate = 1;
// const revalidate = 24 * 3600

const cmsData = {
  carousel: [
    {
      imgLink:
        "https://nobero.com/cdn/shop/files/Sale_D2C_banners_-07_1.webp?v=1731670749&width=360",
      redirect: "/search?category=joggers&collection=best-sellers",
    },
    {
      imgLink:
        "https://nobero.com/cdn/shop/files/Sale_D2C_banners_-07.webp?v=1731670750&width=360",
      redirect: "/search?category=cargo-pants&collection=trending",
    },
    {
      imgLink:
        "https://nobero.com/cdn/shop/files/Sale_D2C_banners_-06.webp?v=1731670750&width=360",
      redirect: "/search?category=hoodies&collection=trending",
    },
    {
      imgLink:
        "	https://nobero.com/cdn/shop/files/HOME-PAGE-MOBILE1.jpg?v=1735376673&width=3600",
      redirect: "/search?category=hoodies&collection=trending",
    },
    {
      imgLink:
        "https://nobero.com/cdn/shop/files/Sale_D2C_banners_-10.webp?v=1731670749&width=360",
      redirect: "/search?category=hoodies&collection=trending",
    },
    {
      imgLink:
        "https://nobero.com/cdn/shop/files/Travel_Cargo_Home_Page_Banner_Mobile_copy.webp?v=1732190346&width=360",
      redirect: "/search?category=cargo-pants&collection=trending",
    },
  ],
  sectionTwo: {
    title: "Most Popular",
    subTitle: "Check Out Now ->",
    carousel: [
      {
        imgLink: "https://nobero.com/cdn/shop/files/CARGO-PANTS_1.jpg",
        redirect: "/search?category=cargo-pants&collection=trending",
      },
      {
        imgLink:
          "https://nobero.com/cdn/shop/files/WhatsApp_Image_2024-12-10_at_12.03.02_PM.jpg",
        redirect: "/search?category=hoodies&collection=trending",
      },
      {
        imgLink:
          "https://nobero.com/cdn/shop/files/WhatsApp_Image_2024-12-09_at_6.30.14_PM.jpg",
        redirect: "/search?category=hoodies&collection=trending",
      },
      {
        imgLink:
          "https://nobero.com/cdn/shop/files/WhatsApp_Image_2024-12-09_at_6.30.15_PM.jpg",
        redirect: "/search?category=joggers&collection=trending",
      },
    ],
  },
  featureImgLink:
    "https://nobero.com/cdn/shop/files/Frame_48097704.svg?v=1733223350",
  categories: {
    title: "Shop for Men",
  },
  banner: "https://nobero.com/cdn/shop/files/Our_Story-2_1.webp?v=1723793985",
  sectionThree: {
    title: "See the latest",
    subTitle: "Handpicked for you",
    buttonText: "Shop All Products",
  },
  featuredProduct: {
    imgOne:
      "https://nobero.com/cdn/shop/files/TRAVEL_HOODIE_213e7bdf-2a73-472b-b4ef-7281e4cfbc00.jpg?v=1735620251",
    imgTwo:
      "https://nobero.com/cdn/shop/files/MicrosoftTeams-image_5_2d6c21a9-8e7e-4c04-96d8-bfdfabf562b9.png?v=1735620251",
  },
  sectionFour: {
    title: "Our Bestsellers",
    subTitle: "Don't miss out Top Selling styles",
    buttonText: "Shop All Products",
  },
};

let count = 0;

const getCategories = unstable_cache(
  async () => {
    count += 1;
    return await getCategoriesApi();
  },
  [CATEGORY_LIST],
  { revalidate }
);

const getLatestProduct = unstable_cache(
  async () => {
    count += 1;
    const payload = {
      page: 1,
      limit: 4,
      collection: "latest",
    };
    const { data } = await getProductList(payload);
    return data;
  },
  [LATEST_PRODUCT],
  { revalidate }
);

const getBestSellerProduct = unstable_cache(
  async () => {
    count += 1;
    const payload = {
      page: 1,
      limit: 4,
      collection: "best-sellers",
    };
    const { data } = await getProductList(payload);
    return data;
  },
  [BESTSELLER_PRODUCT],
  { revalidate }
);

export default async function Home() {
  const categoryList = await getCategories();
  const bestsellerProductList = await getBestSellerProduct();
  const latestProductList = await getLatestProduct();

  return (
    <div className="flex flex-col gap-6">
      <Carousel className="relative">
        <CarouselContent className="h-[35vh]">
          {cmsData.carousel.map((e, i) => (
            <CarouselItem key={i} className="relative">
              <Link href={e.redirect}>
                <Image alt="asdf" src={e.imgLink} fill />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <DotButton className="absolute transform translate-x-[-50%] left-1/2 bottom-0" />
      </Carousel>

      {/* Most trending section */}

      <section className="text-center">
        <p className="heading">{cmsData.sectionTwo.title}</p>
        <p className="text-sm mt-2">{cmsData.sectionTwo.subTitle}</p>
        <Carousel className="relative mt-4">
          <CarouselContent className="h-[40vh]">
            {cmsData.sectionTwo.carousel.map((e, i) => (
              <CarouselItem key={i} className="relative basis-2/3 px-1">
                <Link href={e.redirect}>
                  <Image
                    alt="asdf"
                    src={e.imgLink}
                    width={500}
                    height={500}
                    style={{ height: "100%", width: "100%" }}
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      {/* features section */}

      <Image
        src={cmsData.featureImgLink}
        alt="feature img"
        className="w-full my-6"
        width={330}
        height={400}
      />

      {/* Categories */}

      <section>
        <p className="heading">{cmsData.categories.title}</p>
        <div className="flex flex-wrap justify-center">
          {categoryList?.data &&
            categoryList?.data?.map((ele: ICategory, index: number) => (
              <Link
                href={`/search?category=${ele.slug}`}
                key={index}
                className="w-[45%] h-[45%] mx-2 my-4 relative"
              >
                <Image alt="asdf" src={ele.icon} width={300} height={300} />
                <p className="text-center">{ele.name}</p>
              </Link>
            ))}
        </div>
      </section>

      <Image
        src={cmsData.banner}
        alt="banner img"
        className="w-full"
        width={330}
        height={542}
      />

      <section>
        <p className="heading">{cmsData.sectionThree.title}</p>
        <p className="sub-heading mb-6">{cmsData.sectionThree.subTitle}</p>
        <Carousel className="relative">
          <CarouselContent className="h-fit">
            {latestProductList &&
              latestProductList.map((e: IProductList, i: number) => (
                <CarouselItem key={i} className="relative basis-1/2 px-1">
                  <ProductCard
                    className="px-1 h-[45vh]"
                    discount={e.discount}
                    imgLink={e.imgLink}
                    productLink={generateProductUrl(e.slug, e.batchId, e.code)}
                    name={e.name}
                    price={e.price}
                    key={i}
                  />
                </CarouselItem>
              ))}
          </CarouselContent>
          <DotButton className="flex justify-center mt-4 mb-2" />
        </Carousel>
        <div className="px-2 text-center">
          <Button variant={"outline"} className="w-full">
            Shop All Product
          </Button>
        </div>
      </section>

      <Image
        src={cmsData.featuredProduct.imgOne}
        alt="feature img"
        className="w-full "
        width={330}
        height={400}
      />
      <Image
        src={cmsData.featuredProduct.imgTwo}
        alt="feature img"
        className="w-full  p-4"
        width={330}
        height={400}
      />

      <section>
        <p className="heading">{cmsData.sectionFour.title}</p>
        <p className="sub-heading mb-6">{cmsData.sectionFour.subTitle}</p>
        <Carousel className="relative">
          <CarouselContent className="h-fit">
            {bestsellerProductList &&
              bestsellerProductList.map((e: IProductList, i: number) => (
                <CarouselItem key={i} className="relative basis-1/2 px-1">
                  <ProductCard
                    className=" h-[45vh]"
                    discount={e.discount}
                    imgLink={e.imgLink}
                    productLink={generateProductUrl(e.slug, e.batchId, e.code)}
                    name={e.name}
                    price={e.price}
                    key={i}
                  />
                </CarouselItem>
              ))}
          </CarouselContent>
          <DotButton className="flex justify-center mt-4 mb-2" />
        </Carousel>
        <div className="px-2 text-center">
          <Button variant={"outline"} className="w-full">
            Shop All Product
          </Button>
        </div>
      </section>
    </div>
  );
}
