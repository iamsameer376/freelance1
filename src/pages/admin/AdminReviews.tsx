import { useAdmin } from "@/lib/AdminContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, MessageSquare, Trash2, Send, X } from "lucide-react";
import { toast } from "sonner";

const AdminReviews = () => {
  const { reviews, replyToReview, deleteReview, products } = useAdmin();
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [filterProduct, setFilterProduct] = useState("all");

  const filteredReviews = filterProduct === "all"
    ? reviews
    : reviews.filter(r => r.productId === filterProduct);

  const handleReply = (reviewId: string) => {
    if (!replyText.trim()) {
      toast.error("Reply cannot be empty.");
      return;
    }
    replyToReview(reviewId, replyText);
    setReplyingTo(null);
    setReplyText("");
    toast.success("Reply sent!");
  };

  const handleDelete = (id: string) => {
    deleteReview(id);
    toast.success("Review deleted.");
  };

  const getProductName = (productId: string) => {
    return products.find(p => p.id === productId)?.name || productId;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">Customer Reviews</h1>
          <p className="text-muted-foreground text-sm">{reviews.length} total reviews</p>
        </div>
        <select
          value={filterProduct}
          onChange={e => setFilterProduct(e.target.value)}
          className="bg-background border border-border rounded-lg px-3 py-2 text-sm font-medium"
        >
          <option value="all">All Products</option>
          {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="bg-card rounded-2xl p-12 text-center border border-border border-dashed">
            <p className="text-muted-foreground">No reviews found.</p>
          </div>
        ) : (
          filteredReviews.map(review => (
            <div key={review.id} className="bg-card rounded-2xl p-6 border border-border shadow-soft">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {review.customerName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{review.customerName}</p>
                      <p className="text-[10px] text-muted-foreground">{review.date} · {getProductName(review.productId)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground/30"}`} />
                    ))}
                  </div>

                  <p className="text-sm text-foreground/80">{review.comment}</p>

                  {review.adminReply && (
                    <div className="mt-3 p-3 bg-primary/5 rounded-xl border-l-4 border-primary">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Admin Reply</p>
                      <p className="text-sm">{review.adminReply}</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-1 shrink-0">
                  <Button size="sm" variant="ghost" onClick={() => { setReplyingTo(review.id); setReplyText(review.adminReply || ""); }}>
                    <MessageSquare className="w-3.5 h-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleDelete(review.id)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              {replyingTo === review.id && (
                <div className="mt-4 flex gap-2">
                  <input
                    className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-sm"
                    placeholder="Write your reply..."
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleReply(review.id)}
                    autoFocus
                  />
                  <Button size="sm" onClick={() => handleReply(review.id)}><Send className="w-3.5 h-3.5" /></Button>
                  <Button size="sm" variant="ghost" onClick={() => setReplyingTo(null)}><X className="w-3.5 h-3.5" /></Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminReviews;
