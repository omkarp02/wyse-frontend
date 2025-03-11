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
import Image, { getImageProps } from "next/image";
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
import { showOnDesktopClass, showOnMobileClass } from "@/constants/common";
import Footer from "./_component/Footer";

const revalidate = 1;
// const revalidate = 24 * 3600

const cmsData = {
  carousel: [
    {
      imgLink: {
        mobile: "https://nobero.com/cdn/shop/files/192.jpg?v=1738312464",
        desktop: "https://nobero.com/cdn/shop/files/173.jpg?v=1738312472",
      },
      redirect: "/search?category=hoodies&collection=trending",
    },
    {
      imgLink: {
        mobile:
          "https://nobero.com/cdn/shop/files/WhatsApp_Image_2025-01-31_at_3.39.25_PM.jpg?v=1738323722",
        desktop:
          "https://nobero.com/cdn/shop/files/Desktop_-_Homepage_Banners-20_1.jpg?v=1738323728 ",
      },
      redirect: "/search?category=cargo-pants&collection=trending",
    },
    // {
    //   imgLink: {
    //     mobile: "https://nobero.com/cdn/shop/files/195.jpg?v=1738312464",
    //     desktop: "https://nobero.com/cdn/shop/files/176.jpg?v=1738312471",
    //   },
    //   redirect: "/search?category=joggers&collection=best-sellers",
    // },
    {
      imgLink: {
        mobile:
          "https://nobero.com/cdn/shop/files/home-page-mob_1.jpg?v=1738133874",
        desktop:
          "https://nobero.com/cdn/shop/files/home-page-web_8.jpg?v=1738133874",
      },
      redirect: "/search?category=cargo-pants&collection=trending",
    },
    {
      imgLink: {
        mobile: "https://nobero.com/cdn/shop/files/196.jpg?v=1738312464",
        desktop: "https://nobero.com/cdn/shop/files/177.jpg?v=1738312471",
      },
      redirect: "/search?category=hoodies&collection=trending",
    },
  ],
  sectionTwo: {
    title: "Most Popular",
    subTitle: "Check Out Now ->",
    carousel: [
      {
        imgLink:
          "https://nobero.com/cdn/shop/files/97_1ff90344-6cfa-4b2e-91ea-7a76b5d8eaf4.jpg?v=1738323339",
        redirect: "/search?category=cargo-pants&collection=trending",
      },
      {
        imgLink:
          "https://nobero.com/cdn/shop/files/98_b384e323-1704-4c82-94ce-3fe42681c3c5.jpg?v=1738323401",
        redirect: "/search?category=hoodies&collection=trending",
      },
      // {
      //   imgLink:
      //     "https://nobero.com/cdn/shop/files/Most_Popular-2.jpg?v=1738323477",
      //   redirect: "/search?category=hoodies&collection=trending",
      // },
      // {
      //   imgLink:
      //     "https://nobero.com/cdn/shop/files/99_0d5c5bd6-0982-4cdd-b5be-40d4db098bfb.jpg?v=1738323401",
      //   redirect: "/search?category=joggers&collection=trending",
      // },
    ],
  },
  featureImgLink:
    "https://nobero.com/cdn/shop/files/Frame_48097704.svg?v=1733223350",
  categories: {
    title: "Our Categories",
  },
  banner: {
    mobile: "https://nobero.com/cdn/shop/files/Our_Story-2_1.webp?v=1723793985",
    desktop:
      "https://nobero.com/cdn/shop/files/BRAND_STORY_2000_x_521_px_-2.webp?v=1723793962",
  },
  sectionThree: {
    title: "See the latest",
    subTitle: "Handpicked for you",
    buttonText: "Shop All Products",
  },
  featuredProduct: {
    imgOne: {
      mobile:
        "https://nobero.com/cdn/shop/files/Travel_Jogger_Home_Page_Image_Mob_1_copy_29e5b158-370f-4093-9e91-433872b82d5f.jpg?v=1738323121",
      desktop:
        "https://nobero.com/cdn/shop/files/Travel_Jogger_Home_Page_Image_1_copy_d8419a25-f731-44ef-a852-afec626ceb14.jpg?v=1738323121",
    },
    imgTwo: {
      mobile:
        "https://nobero.com/cdn/shop/files/Travel_Jogger_Home_Page_Image_Mob_2_copy_f2149a8e-dabb-4fee-8941-05cd5347eb73.png?v=1738323120",
      desktop:
        "https://nobero.com/cdn/shop/files/Travel_Jogger_Home_Page_Image_2_copy_2af40579-aef7-416d-82f0-414717f4578a.png?v=1738323120",
    },
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


  const common = { alt: "Art Direction Example" };

  return (
    <div className="flex flex-col gap-6">
      <Carousel className="relative">
        <CarouselContent>
          {cmsData.carousel.map((e, i) => {
            // const {
            //   props: { srcSet: desktop },
            // } = getImageProps({
            //   ...common,
            //   width: 1110,
            //   height: 427.344,
            //   className: "w-full",
            //   quality: 80,
            //   src: e.imgLink.desktop.trim(),
            // });
            // const {
            //   props: { srcSet: mobile, ...rest },
            // } = getImageProps({
            //   ...common,
            //   width: 335,
            //   height: 268,
            //   className: "w-full",
            //   quality: 70,
            //   src: e.imgLink.mobile.trim(),
            // });

            return (
              <CarouselItem key={i} className="relative max-h-[80vh]">
                <Link href={e.redirect}>
                  {/* <picture>
                    <source media="(max-width: 500px)" srcSet={mobile} />
                    <source  media="(min-width: 600px)" srcSet={desktop} />
                    <img {...rest}  />
                  </picture> */}
                  <Image
                    width={1110}
                    height={427.344}
                    alt="asdf"
                    className={`w-full h-auto hidden md:block`}
                    src={e.imgLink.desktop.trim()}
                  />
                  <Image
                    width={395}
                    height={316}
                    alt="asdf"
                    className={`w-full h-auto block md:hidden`}
                    src={e.imgLink.mobile.trim()}
                  />
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <DotButton className="absolute transform translate-x-[-50%] left-1/2 bottom-0" />
      </Carousel>

      {/* Most trending section */}

      <section className="text-center">
        <p className="heading">{cmsData.sectionTwo.title}</p>
        <p className="text-sm mt-2">{cmsData.sectionTwo.subTitle}</p>
        <Carousel className="relative mt-4">
          <CarouselContent className="h-fit">
            {cmsData.sectionTwo.carousel.map((e, i) => (
              <CarouselItem
                key={i}
                className="relative basis-2/3 xs:basis-2/4 sm:basis-1/3 md:basis-1/4 px-1"
              >
                <Link href={e.redirect}>
                  <Image
                    alt="asdf"
                    src={e.imgLink}
                    width={974}
                    height={366}
                    className="object-cover w-full h-auto"
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
        className={`w-full my-6 ${showOnMobileClass}`}
        width={335}
        height={55.828}
      />

      {/* Categories */}

      <section>
        <p className="heading">{cmsData.categories.title}</p>
        <div className="flex flex-wrap justify-center sm:justify-center ">
          {categoryList?.data &&
            categoryList?.data?.map((ele: ICategory, index: number) =>{
              if(["Joggers", "Shorts", "Cargo Pants"].includes(ele.name)) return ""
              return  (
                <Link
                  href={`/search?category=${ele.slug}`}
                  key={index}
                  className="w-[45%] h-[45%] max-w-[230px] sm:w-auto sm:h-auto mx-2 my-4 relative"
                >
                  <Image alt="asdf" src={ele.icon} width={300} height={300} />
                  <p className="text-center">{ele.name}</p>
                </Link>
              )
            })}
        </div>
      </section>

      <Image
        src={cmsData.banner.desktop}
        alt="banner img"
        className={`w-full ${showOnDesktopClass}`}
        width={1393}
        height={362.172}
      />
      <Image
        src={cmsData.banner.mobile}
        alt="banner img"
        className={`w-full ${showOnMobileClass}`}
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
                <CarouselItem
                  key={i}
                  className="relative basis-1/2 sm:basis-1/3 md:basis-1/4 px-1"
                >
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
        src={cmsData.featuredProduct.imgOne.desktop}
        alt="feature img"
        className={`w-full ${showOnDesktopClass}`}
        width={957}
        height={250}
      />
      <Image
        src={cmsData.featuredProduct.imgOne.mobile}
        alt="feature img"
        className={`w-full ${showOnMobileClass}`}
        width={957}
        height={218}
      />

      {/* <Image
        src={cmsData.featuredProduct.imgTwo.desktop}
        alt="feature img"
        className={`w-full ${showOnDesktopClass}`}
        width={323}
        height={258}
      />
      <Image
        src={cmsData.featuredProduct.imgTwo.mobile}
        alt="feature img"
        className={`w-full ${showOnMobileClass}`}
        width={323}
        height={266}
      /> */}

      <section>
        <p className="heading">{cmsData.sectionFour.title}</p>
        <p className="sub-heading mb-6">{cmsData.sectionFour.subTitle}</p>
        <Carousel className="relative">
          <CarouselContent className="h-fit">
            {bestsellerProductList &&
              bestsellerProductList.map((e: IProductList, i: number) => (
                <CarouselItem
                  key={i}
                  className="relative basis-1/2 sm:basis-1/3 md:basis-1/4 px-1"
                >
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
      <Footer />
    </div>
  );
}

// {cmsData.carousel.map((e, i) => {
//   const {
//     props: { srcSet: desktop },
//   } = getImageProps({
//     ...common,
//     width: 1110,
//     height: 427.344,
//     className: "w-full",
//     quality: 80,
//     src: e.imgLink.desktop.trim(),
//   });
//   const {
//     props: { srcSet: mobile, ...rest },
//   } = getImageProps({
//     ...common,
//     width: 335,
//     height: 268,
//     className: "w-full",
//     quality: 70,
//     src: e.imgLink.mobile.trim(),
//   });

//   return (
//     <CarouselItem key={i} className="relative">
//       <Link href={e.redirect}>
//         <picture>
//           <source media="(max-width: 500px)" srcSet={mobile} />
//           <source  media="(min-width: 600px)" srcSet={desktop} />
//           <img {...rest}  />
//         </picture>
//       </Link>
//     </CarouselItem>
//   );
// })}
