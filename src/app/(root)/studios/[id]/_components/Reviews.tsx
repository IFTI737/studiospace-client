"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { MessageSquareText, Star } from "lucide-react";
import { toast } from "sonner";
import { cn } from "cn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { getInitials } from "@/lib/utils";
import { TReview } from "@/types/studio.types";

export default function Reviews({ studioId, reviews, ownerEmail }: { studioId: string; reviews: TReview[]; ownerEmail: string }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canReview = session && session.user.email !== ownerEmail;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiFetch(`/studios/${studioId}/reviews`, { method: "POST", body: { rating, comment } });
      toast.success("Thanks! Your review was posted.");
      setComment("");
      setRating(5);
      router.refresh();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <h2 className="flex items-center gap-2 text-2xl font-bold">
        <MessageSquareText className="size-6 text-primary" />
        Reviews <span className="text-base font-normal text-muted-foreground">({reviews.length})</span>
      </h2>

      {canReview && (
        <form onSubmit={handleSubmit} className="mt-5 space-y-3 rounded-2xl border bg-card p-5">
          <p className="text-sm font-medium">Share your experience</p>
          <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                aria-label={`${n} star${n > 1 ? "s" : ""}`}
                onMouseEnter={() => setHover(n)}
                onClick={() => setRating(n)}
                className="transition hover:scale-110"
              >
                <Star className={cn("size-6", n <= (hover || rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40")} />
              </button>
            ))}
          </div>
          <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="How was the space, the gear and the host?" rows={3} required />
          <Button type="submit" disabled={submitting} className="rounded-full">
            {submitting && <Spinner />} Post Review
          </Button>
        </form>
      )}

      {reviews.length === 0 ? (
        <p className="mt-5 rounded-2xl border border-dashed p-6 text-center text-sm text-muted-foreground">
          No reviews yet. Book this studio and be the first to share your experience.
        </p>
      ) : (
        <ul className="mt-5 grid gap-4 md:grid-cols-2">
          {[...reviews].reverse().map((review, i) => (
            <li key={review._id ?? i} className="rounded-2xl border bg-card p-5">
              <div className="flex items-center gap-3">
                <Avatar>
                  {review.userImage && <AvatarImage src={review.userImage} alt={review.userName} />}
                  <AvatarFallback>{getInitials(review.userName)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{review.userName}</p>
                  <p className="text-xs text-muted-foreground">
                    {review.createdAt ? formatDistanceToNow(new Date(review.createdAt), { addSuffix: true }) : ""}
                  </p>
                </div>
                <span className="flex items-center gap-1 text-sm font-semibold">
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  {review.rating}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{review.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
