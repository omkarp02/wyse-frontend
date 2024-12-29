import React from "react";
import ProductCard from "../_component/ProductCard";

const productList = [
  {
    link: "https://nobero.com/cdn/shop/files/NewImagesJoggers-0008.webp",
    name: "Oversized Cargo Joggers",
    price: 3000,
    discount: 50,
  },
  {
    link: "https://nobero.com/cdn/shop/files/ArcticWolfCargoPocketJoggers1_f3c8dfe8-9bd0-4896-9102-e19da792e10c.webp",
    name: "Oversized Cargo Pocket Joggers",
    price: 2800,
    discount: 40,
  },
  {
    link: "https://nobero.com/cdn/shop/files/NewImagesJoggers-0001.webp",
    name: "Oversized Cargo Joggers",
    price: 3000,
    discount: 50,
  },
  {
    link: "https://nobero.com/cdn/shop/files/Nmjg-014_1.webp",
    name: "Berlin Cargo Joggers",
    price: 2700,
    discount: 35,
  },
  {
    link: "https://nobero.com/cdn/shop/files/NewImagesJoggers-0006.webp",
    name: "Oversized Cargo Joggers",
    price: 3000,
    discount: 50,
  },
  {
    link: "https://nobero.com/cdn/shop/files/TapperedImagesWeb-0004_aaf12e87-8645-4457-9022-9967b6a6df4a.webp",
    name: "Classic Cargo Joggers",
    price: 2200,
    discount: 30,
  },
  {
    link: "https://nobero.com/cdn/shop/files/1712335316643_1.webp",
    name: "Oversized Cargo Joggers",
    price: 3000,
    discount: 50,
  },
  {
    link: "https://nobero.com/cdn/shop/files/Style2BL2_bb63120c-536a-4692-91c5-e11e4f473f54.webp",
    name: "Oversized Cargo Pocket Joggers",
    price: 2800,
    discount: 40,
  },
  {
    link: "https://nobero.com/cdn/shop/files/Webp2FeatureProductImage_2.webp",
    name: "Wanderer - Travel Cargo Pants",
    price: 3300,
    discount: 45,
  },
  {
    link: "https://nobero.com/cdn/shop/files/NewImagesJoggers-0011.webp",
    name: "Oversized Jackson Joggers",
    price: 2900,
    discount: 30,
  },
  {
    link: "https://nobero.com/cdn/shop/files/OliveGreen3.jpg",
    name: "Oversized Cargo Joggers",
    price: 3000,
    discount: 50,
  },
  {
    link: "https://nobero.com/cdn/shop/files/ArcticWolf.jpg",
    name: "Nobero Oversized Cargo Joggers",
    price: 3100,
    discount: 20,
  },
  {
    link: "https://nobero.com/cdn/shop/files/DualCargoPocketWebImage1_1.jpg",
    name: "Oversized Cargo Pocket Joggers",
    price: 2800,
    discount: 40,
  },
  {
    link: "https://nobero.com/cdn/shop/files/2PackOversizedCargo8_8d462eb6-8cee-40f1-9071-80c8236ae518.webp",
    name: "2-Pack Oversized Cargo Joggers",
    price: 5000,
    discount: 35,
  },
  {
    link: "https://nobero.com/cdn/shop/files/2PackOversizedCargo7_5143df88-b3aa-4e1d-a14d-eb009fdfec7b.webp",
    name: "2-Pack Oversized Cargo Joggers",
    price: 5000,
    discount: 35,
  },
  {
    link: "https://nobero.com/cdn/shop/files/4_cbc2fdd4-fc9e-4595-8fdb-6824dd2101ec.jpg",
    name: "Classic Straight Fit Joggers",
    price: 2300,
    discount: 20,
  },
  {
    link: "https://nobero.com/cdn/shop/files/2PackOversizedCargo5.webp",
    name: "2-Pack Oversized Cargo Joggers",
    price: 5000,
    discount: 35,
  },
  {
    link: "https://nobero.com/cdn/shop/files/OliveGreen2.jpg",
    name: "Zip-Pocket Joggers",
    price: 2500,
    discount: 15,
  },
  {
    link: "https://nobero.com/cdn/shop/files/2-packZipPocket6.webp",
    name: "2-Pack Zip Pocket Joggers",
    price: 4600,
    discount: 25,
  },
  {
    link: "https://nobero.com/cdn/shop/files/5_9d871db9-0065-43b8-94f2-c5adcd0edca4.jpg",
    name: "Classic Straight Fit Joggers",
    price: 2300,
    discount: 20,
  },
  {
    link: "https://nobero.com/cdn/shop/files/BlackJacksonJoggerNewWebImagecopy.jpg",
    name: "Oversized Jackson Joggers",
    price: 2900,
    discount: 30,
  },
  {
    link: "https://nobero.com/cdn/shop/files/2-PackOversizedCargoPocketcopy.webp",
    name: "2-Pack Oversized Cargo Pocket Joggers",
    price: 4800,
    discount: 35,
  },
  {
    link: "https://nobero.com/cdn/shop/files/1734071729103_1.webp",
    name: "Oversized Zaedn Joggers",
    price: 3100,
    discount: 40,
  },
  {
    link: "https://nobero.com/cdn/shop/files/NewImagesJoggers-0024.webp",
    name: "Find Adventure Joggers",
    price: 2700,
    discount: 25,
  },
];

const SearchPage = () => {
  return (
    <div className="main-container">
      <p className="heading">Cargo for men</p>
      <p className="sub-heading">76 items</p>
      <div className="flex flex-wrap justify-between mt-5">
        {productList.map((ele, index) => (
          <ProductCard
            className=""
            discount={ele.discount}
            imgLink={ele.link}
            name={ele.name}
            price={ele.price}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
