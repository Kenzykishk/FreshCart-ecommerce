import StarRating from "@/components/Shared/StarRating/StarRating";
import { Icon } from "@iconify/react";

interface RatingBarsProps {
  ratingsAverage: number;
  ratingsQuantity: number;
}

function estimateRatingBars(average: number) {
  const bars = [5, 4, 3, 2, 1].map((star) => {
    const distance = Math.abs(star - average);
    const weight = Math.max(0, 1 - distance * 0.4);
    return { star, weight };
  });

  const totalWeight = bars.reduce((sum, b) => sum + b.weight, 0);

  return bars.map(({ star, weight }) => ({
    star,
    percentage: totalWeight > 0 ? Math.round((weight / totalWeight) * 100) : 0,
  }));
}

export default function RatingBars({ ratingsAverage, ratingsQuantity }: RatingBarsProps) {
  const bars = estimateRatingBars(ratingsAverage);

  return (

    <>
    <div>


  <div className="flex gap-8 items-center f">

      <div className="text-center min-w-[80px]">
        <p className="text-5xl font-bold text-gray-900">{ratingsAverage}</p>
        <StarRating rating={ratingsAverage} count={ratingsQuantity} isproductDeatails={true} />
        <p className="text-md text-gray-500 mt-1">Based on {ratingsQuantity} reviews</p>
      </div>

      <div className="flex-1 space-y-2">
        {bars.map(({ star, percentage }) => (
          <div key={star} className="flex items-center gap-2">
            <span className="text-md text-gray-500 w-10">{star} star</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-md text-gray-500 w-8">{percentage}%</span>
          </div>
        ))}
      </div>
    </div>






<div className="mt-12 pt-10 border-t border-gray-100 flex flex-col items-center justify-center text-center">
  
  <Icon
    icon="iconoir:star-solid" 
    width="48" 
    height="48" 
    className="text-gray-300 mb-4 shrink-0" 
  />
  
  <p className="text-gray-500 text-sm mb-2 leading-relaxed max-w-sm">
  Customer reviews will be displayed here.
  </p>
  
  <button className="text-green-600 font-semibold hover:text-green-700 hover:underline text-md transition-colors duration-200">
    Write a Review
  </button>
  
</div>
    </div>
    </>
  

    
  );
}