import { Icon } from '@iconify/react';


interface StarRatingProps {
  rating: number;   
  count?: number;   
  isproductDeatails?:boolean
}


export default function StarRating({ rating, count ,isproductDeatails=false}: StarRatingProps) {
  return (
  <div className="flex items-center gap-1 mt-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Icon
          key={star}
          icon={
            rating >= star
              ? "ph:star-fill"           
              : rating >= star - 0.5
              ? "ph:star-half-fill"      
              : "ph:star"              
          }
          className="text-yellow-400 size-5"
        />
      ))}

    {isproductDeatails ? ("") : (<div className='ms-1'>
    <span className='text-sm text-gray-500 font-medium'>{rating}</span>
    {count !== undefined && (
      <span className="text-sm text-gray-500 ms-1">({count} reviews)</span>
    )}
  </div>
)}

      
    
    </div>
  )
}
