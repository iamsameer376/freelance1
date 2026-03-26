import { useAdmin } from "@/lib/AdminContext";
import { useState } from "react";
import { HeroSlide } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, X, Image, GripVertical } from "lucide-react";
import { toast } from "sonner";

const AdminHero = () => {
  const { heroSlides, addSlide, updateSlide, removeSlide } = useAdmin();
  const [showModal, setShowModal] = useState(false);
  const [editSlide, setEditSlide] = useState<HeroSlide>({ id: "", image: "", title: "", desc: "" });
  const [isEditing, setIsEditing] = useState(false);

  const openAdd = () => {
    setEditSlide({ id: `slide-${Date.now()}`, image: "", title: "", desc: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  const openEdit = (slide: HeroSlide) => {
    setEditSlide({ ...slide });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!editSlide.title || !editSlide.image) {
      toast.error("Title and Image URL are required.");
      return;
    }
    if (isEditing) {
      updateSlide(editSlide);
      toast.success("Slide updated!");
    } else {
      addSlide(editSlide);
      toast.success("Slide added!");
    }
    setShowModal(false);
  };

  const handleRemove = (id: string) => {
    if (heroSlides.length <= 1) {
      toast.error("You must have at least one hero slide.");
      return;
    }
    removeSlide(id);
    toast.success("Slide removed!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Hero Slides</h1>
          <p className="text-muted-foreground text-sm">Manage the homepage carousel images</p>
        </div>
        <Button onClick={openAdd} className="gap-2"><Plus className="w-4 h-4" /> Add Slide</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {heroSlides.map((slide, i) => (
          <div key={slide.id} className="bg-card rounded-2xl overflow-hidden border border-border shadow-soft group">
            <div className="relative h-48">
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute top-3 left-3 bg-black/50 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                Slide {i + 1}
              </div>
              <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="secondary" className="h-7 w-7 p-0" onClick={() => openEdit(slide)}>
                  <Pencil className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="destructive" className="h-7 w-7 p-0" onClick={() => handleRemove(slide.id)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-white font-bold text-lg">{slide.title}</h3>
                <p className="text-white/70 text-sm">{slide.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-card rounded-2xl p-6 max-w-md w-full shadow-elevated" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black">{isEditing ? "Edit Slide" : "Add Slide"}</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowModal(false)}><X className="w-5 h-5" /></Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Title *</label>
                <input className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-sm" value={editSlide.title} onChange={e => setEditSlide({ ...editSlide, title: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Description</label>
                <input className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-sm" value={editSlide.desc} onChange={e => setEditSlide({ ...editSlide, desc: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Image URL *</label>
                <input className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-sm" value={editSlide.image} onChange={e => setEditSlide({ ...editSlide, image: e.target.value })} />
              </div>
              {editSlide.image && (
                <div className="h-32 rounded-lg overflow-hidden bg-muted">
                  <img src={editSlide.image} alt="preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6 pt-4 border-t border-border">
              <Button variant="outline" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button className="flex-1" onClick={handleSave}>{isEditing ? "Save" : "Add Slide"}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHero;
