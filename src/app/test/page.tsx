"use client";

import React from "react";
import Image from "next/image";
import ReviewRatingDisplay from "@/features/review/component/ReviewRatingDisplay";
import { useGetAllReview } from "@/hooks/query/review";
import { getRelativeTime } from "@/lib/dayjs/common";
import { ThumbsDown, ThumbsUp } from "lucide-react";

const TestPage = () => {
  const { data: reviewData } = useGetAllReview({
    page: 1,
    limit: 10,
    productCode: "87454",
  });

  return <></>;
};

export default TestPage;

// <div>
// <section className="flex gap-2 items-center">
//   <ReviewRatingDisplay rating="4.5" />
//   <p className="text-xs text-muted">79 ratings | 10 reviews</p>
// </section>
// <section className="mt-5">
//   <p className="my-4"> Customer Review (10)</p>
//   {reviewData?.map((e, i) => (
//     <>
//       <div className="flex flex-col gap-1 py-3  border-muted border-b-[0.5px]">
//         <section className="flex gap-2 items-center">
//           <ReviewRatingDisplay rating="5" />{" "}
//           <p className="text-muted text-xs">
//             {getRelativeTime(e.updatedAt)}
//           </p>
//         </section>
//         <p className="text-sm text-muted ">{e.reviewText}</p>
//         <section className="flex justify-between">
//           <p className="text-xs  text-muted-foreground">Tejas Wani</p>
//           <div className="flex gap-2">
//             <p className="text-xs">Helpful?</p>
//             <div className="flex gap-0.5">
//               <ThumbsUp strokeWidth={1.5}  size={15} />
//               <p className="text-muted text-xs">0</p>
//             </div>
//             <ThumbsDown strokeWidth={1.5} size={15} />
//           </div>
//         </section>
//       </div>
//     </>
//   ))}
// </section>
// </div>
