'use client';

import { useState } from 'react';
import { Review } from '@/lib/directus';
import { useAuth } from '@/components/AuthProvider';
import StarRating from './StarRating';

interface ReviewListProps {
  reviews: Review[];
  vendorId: number;
}

export default function ReviewList({ reviews, vendorId }: ReviewListProps) {
  const { user, isAuthenticated } = useAuth();
  const [userVotes, setUserVotes] = useState<Set<string>>(new Set());

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <span className="material-symbols-outlined text-ink/40 text-4xl mb-2">
          rate_review
        </span>
        <p className="text-ink/60">
          No reviews yet. Be the first to review this vendor!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="border border-ink/10 rounded-xl p-6"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              {/* User Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brass to-brass-deep flex items-center justify-center text-white font-semibold">
                {typeof review.user === 'object'
                  ? `${review.user.first_name?.[0] || ''}${review.user.last_name?.[0] || ''}`.toUpperCase()
                  : '?'}
              </div>
              
              <div>
                <h4 className="font-semibold text-ink">
                  {typeof review.user === 'object'
                    ? `${review.user.first_name} ${review.user.last_name}`
                    : 'Anonymous User'}
                </h4>
                <div className="flex items-center gap-2">
                  <StarRating rating={review.rating} size="sm" />
                  <span className="text-xs text-ink/60">
                    {new Date(review.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-ink/80 leading-relaxed">
            {review.comment}
          </p>

          {/* Helpful Vote */}
          {isAuthenticated && (
            <div className="mt-4 pt-4 border-t border-ink/10">
              <button
                onClick={() => {
                  // TODO: Implement vote functionality
                  setUserVotes((prev) => {
                    const newVotes = new Set(prev);
                    if (newVotes.has(review.id)) {
                      newVotes.delete(review.id);
                    } else {
                      newVotes.add(review.id);
                    }
                    return newVotes;
                  });
                }}
                className={`inline-flex items-center gap-1.5 text-sm transition-colors ${
                  userVotes.has(review.id)
                    ? 'text-brass'
                    : 'text-ink/60 hover:text-brass'
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  thumb_up
                </span>
                Helpful ({review.helpful_count || 0})
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}