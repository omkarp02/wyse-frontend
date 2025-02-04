import { Star } from "lucide-react";
import React from "react";

const ReviewRatingDisplay = ({ rating }: { rating: string }) => {
  return (
    <div className="bg-success text-success-foreground text-sm items-center font-semibold flex w-fit gap-1 px-1.5  rounded-md">
      {rating} <Star color="#ffffff" fill="#ffffff" size={11} strokeWidth={1.5} style={{marginBottom: "2px"}} />
    </div>
  );
};

export default ReviewRatingDisplay;
