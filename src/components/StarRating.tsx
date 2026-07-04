'use client';

import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  showValue?: boolean;
  reviewCount?: number;
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onRatingChange,
  showValue = false,
  reviewCount,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  const handleClick = (value: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(value);
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[...Array(maxRating)].map((_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= displayRating;
          
          return (
            <button
              key={index}
              type="button"
              disabled={!interactive}
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => interactive && setHoverRating(starValue)}
              onMouseLeave={() => interactive && setHoverRating(0)}
              className={`${sizeClasses[size]} transition-colors ${
                interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
              } ${isFilled ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
              aria-label={`${starValue} star${starValue > 1 ? 's' : ''}`}
            >
              ★
            </button>
          );
        })}
      </div>
      
      {showValue && (
        <div className="flex items-center gap-1">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {rating.toFixed(1)}
          </span>
          {reviewCount !== undefined && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
            </span>
          )}
        </div>
      )}
    </div>
  );
}