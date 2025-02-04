import globalInstance from "@/lib/axios/globalInstance";
import { sleep } from "@/utils/helper";
import queryString from "query-string";


export type IGetReviewsByProduct = {
  page: number;
  limit: number;
  productCode: string;
};

export const getReviewsByProduct = async (payload: IGetReviewsByProduct) => {
  const stringified = queryString.stringify(payload);

  //   const data = await globalInstance.get(`/product/list?${stringified}`);
  const data = await dummyData("review");
  return {data};
};

async function dummyData(key: "review") {
  const asdf = {
    review: [
      {
        _id: "679e29570a4da923f2dcb214",
        createdAt: "2025-02-02T10:15:30.123+0000",
        updatedAt: "2025-02-02T10:15:30.123+0000",
        userId: "67987164cf21db640ba92dca",
        productCode: "1234567",
        rating: 4,
        reviewText: "Good product, fast delivery.",
        verifiedPurchase: true,
        helpfulVotes: 2,
        notHelpfulVotes: 0,
        status: "approved",
      },
      {
        _id: "679e29570a4da923f2dcb215",
        createdAt: "2025-02-02T11:45:22.567+0000",
        updatedAt: "2025-02-02T11:45:22.567+0000",
        userId: "67987164cf21db640ba92dcb",
        productCode: "9876543",
        rating: 2,
        reviewText: "Not as expected. Quality could be better.",
        verifiedPurchase: false,
        helpfulVotes: 0,
        notHelpfulVotes: 3,
        status: "pending",
      },
      {
        _id: "679e29570a4da923f2dcb216",
        createdAt: "2025-02-02T13:30:45.890+0000",
        updatedAt: "2025-02-02T13:30:45.890+0000",
        userId: "67987164cf21db640ba92dcc",
        productCode: "5647382",
        rating: 5,
        reviewText: "Amazing product! Highly recommend.",
        verifiedPurchase: true,
        helpfulVotes: 5,
        notHelpfulVotes: 0,
        status: "approved",
      },
      {
        _id: "679e29570a4da923f2dcb217",
        createdAt: "2025-02-02T15:20:10.345+0000",
        updatedAt: "2025-02-02T15:20:10.345+0000",
        userId: "67987164cf21db640ba92dcd",
        productCode: "7584930",
        rating: 3,
        reviewText: "Average product, decent for the price.",
        verifiedPurchase: true,
        helpfulVotes: 1,
        notHelpfulVotes: 1,
        status: "approved",
      },
      {
        _id: "679e29570a4da923f2dcb218",
        createdAt: "2025-02-02T17:05:55.678+0000",
        updatedAt: "2025-02-02T17:05:55.678+0000",
        userId: "67987164cf21db640ba92dce",
        productCode: "1938472",
        rating: 1,
        reviewText: "Terrible experience. Would not buy again.",
        verifiedPurchase: false,
        helpfulVotes: 0,
        notHelpfulVotes: 4,
        status: "rejected",
      },
    ],
  };
  await sleep(1000);

  return asdf[key];
}
