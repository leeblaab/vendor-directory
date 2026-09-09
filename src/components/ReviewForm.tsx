'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { submitReviewClient as submitReview } from '@/lib/directus';
import StarRating from './StarRating';

interface ReviewFormProps {
  vendorId: number;
  onSuccess?: () => void;
}

export default function ReviewForm({ vendorId, onSuccess }: ReviewFormProps) {
  const { user, getToken, isAuthenticated } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isAuthenticated || !user) {
      setError('You must be logged in to submit a review');
      return;
    }

    if (rating === 0) {
      setError('Please select a star rating');
      return;
    }

    if (comment.trim().length < 10) {
      setError('Please write at least 10 characters');
      return;
    }

    setIsSubmitting(true);

    const token = getToken();
    if (!token) {
      setError('Authentication error. Please try again.');
      setIsSubmitting(false);
      return;
    }

    const result = await submitReview(token, {
      vendor: vendorId,
      user: user.id,
      rating,
      comment: comment.trim(),
    });

    if (result.success) {
      setIsSuccess(true);
      setRating(0);
      setComment('');
      onSuccess?.();
    } else {
      setError(result.message);
    }

    setIsSubmitting(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-verified-soft border border-verified/30 rounded-xl p-6 text-center">
        <p className="text-ink/80 mb-2">
          Please log in to submit a review
        </p>
        <Link
          href="/login"
          className="inline-block px-4 py-2 bg-brass hover:bg-brass-deep text-white text-sm font-medium rounded-lg transition-colors"
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center">
        <span className="material-symbols-outlined text-green-500 dark:text-green-400 text-4xl mb-2">
          check_circle
        </span>
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-1">
          Review Submitted!
        </h3>
        <p className="text-sm text-green-700 dark:text-green-400">
          Thank you for your feedback. Your review will be published after admin approval.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-ink/80 mb-2">
          Your Rating *
        </label>
        <StarRating
          rating={rating}
          size="lg"
          interactive
          onRatingChange={setRating}
        />
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-ink/80 mb-2">
          Your Review *
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this vendor..."
          rows={4}
          className="w-full px-4 py-3 border border-ink/10 rounded-lg bg-bone text-ink placeholder-ink/40 focus:ring-2 focus:ring-brass/40 focus:border-brass transition resize-none"
          maxLength={1000}
        />
        <p className="text-xs text-ink/50 mt-1">
          {comment.length}/1000 characters (minimum 10)
        </p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-start gap-2">
          <span className="material-symbols-outlined text-red-500 dark:text-red-400 text-lg">
            error
          </span>
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || rating === 0}
        className="w-full py-3 px-6 bg-brass hover:bg-brass-deep disabled:bg-brass/50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <span className="material-symbols-outlined text-xl animate-spin">
              progress_activity
            </span>
            Submitting...
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-xl">send</span>
            Submit Review
          </>
        )}
      </button>
    </form>
  );
}