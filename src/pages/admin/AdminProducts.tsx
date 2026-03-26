import { useAdmin } from "@/lib/AdminContext";
import { useState } from "react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Package,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

const emptyProduct: Product = {
  id: "",
  name: "",
  desc: "",
  category: "Farming Machinery",
  image: "",
  price: 0,
  unit: "Unit",
  quantity: 50,
  stock_status: "in_stock",
  specs: {},
  features: [],
};

const categories = ["Farming Machinery", "Dairy Equipment", "Poultry Equipment", "Irrigation Systems"];

const AdminProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct, updateStock } = useAdmin();
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product>(emptyProduct);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [specKey, setSpecKey] = useState("");
  const [specVal, setSpecVal] = useState("");
  const [featureInput, setFeatureInput] = useState("");

  const openAdd = () => {
    setEditProduct({ ...emptyProduct, id: `product-${Date.now()}` });
    setIsEditing(false);
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setEditProduct({ ...p });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!editProduct.name || !editProduct.price) {
      toast.error("Name and Price are required.");
      return;
    }
    if (isEditing) {
      updateProduct(editProduct);
      toast.success("Product updated!");
    } else {
      addProduct(editProduct);
      toast.success("Product added!");
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setDeleteConfirm(null);
    toast.success("Product deleted!");
  };

  const addSpec = () => {
    if (specKey && specVal) {
      setEditProduct({ ...editProduct, specs: { ...editProduct.specs, [specKey]: specVal } });
      setSpecKey("");
      setSpecVal("");
    }
  };

  const removeSpec = (key: string) => {
    const newSpecs = { ...editProduct.specs };
    delete newSpecs[key];
    setEditProduct({ ...editProduct, specs: newSpecs });
  };

  const addFeature = () => {
    if (featureInput) {
      setEditProduct({ ...editProduct, features: [...(editProduct.features || []), featureInput] });
      setFeatureInput("");
    }
  };

  const removeFeature = (i: number) => {
    setEditProduct({ ...editProduct, features: editProduct.features?.filter((_, idx) => idx !== i) });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Products</h1>
          <p className="text-muted-foreground text-sm">{products.length} products</p>
        </div>
        <Button onClick={openAdd} className="gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      {/* Product Table */}
      <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-3 px-4 font-bold text-xs uppercase tracking-wider text-muted-foreground">Product</th>
                <th className="text-left py-3 px-4 font-bold text-xs uppercase tracking-wider text-muted-foreground">Category</th>
                <th className="text-right py-3 px-4 font-bold text-xs uppercase tracking-wider text-muted-foreground">Price</th>
                <th className="text-center py-3 px-4 font-bold text-xs uppercase tracking-wider text-muted-foreground">Stock</th>
                <th className="text-center py-3 px-4 font-bold text-xs uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="text-right py-3 px-4 font-bold text-xs uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted overflow-hidden shrink-0">
                        <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                      </div>
                      <span className="font-bold">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{p.category}</td>
                  <td className="py-3 px-4 text-right font-bold">₹{p.price.toLocaleString()}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => updateStock(p.id, Math.max(0, (p.quantity || 0) - 1))}
                        className="w-6 h-6 rounded bg-muted hover:bg-muted-foreground/20 flex items-center justify-center text-xs font-bold"
                      >-</button>
                      <span className="w-10 text-center font-bold">{p.quantity ?? 0}</span>
                      <button
                        onClick={() => updateStock(p.id, (p.quantity || 0) + 1)}
                        className="w-6 h-6 rounded bg-muted hover:bg-muted-foreground/20 flex items-center justify-center text-xs font-bold"
                      >+</button>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${
                      (p.quantity ?? 0) === 0 ? 'bg-red-100 text-red-700' :
                      (p.quantity ?? 0) <= 5 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {(p.quantity ?? 0) === 0 ? 'Sold Out' : (p.quantity ?? 0) <= 5 ? 'Low Stock' : 'In Stock'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="sm" variant="ghost" onClick={() => openEdit(p)}><Pencil className="w-3.5 h-3.5" /></Button>
                      <Button size="sm" variant="ghost" className="text-destructive" onClick={() => setDeleteConfirm(p.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-card rounded-2xl p-6 max-w-sm w-full shadow-elevated" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-red-600" /></div>
              <h3 className="font-bold text-lg">Delete Product?</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-6">This action cannot be undone. The product will be removed permanently.</p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
              <Button variant="destructive" className="flex-1" onClick={() => handleDelete(deleteConfirm)}>Delete</Button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center p-4 overflow-y-auto" onClick={() => setShowModal(false)}>
          <div className="bg-card rounded-2xl p-6 max-w-2xl w-full shadow-elevated my-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black">{isEditing ? "Edit Product" : "Add New Product"}</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowModal(false)}><X className="w-5 h-5" /></Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Product Name *</label>
                  <input className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-sm" value={editProduct.name} onChange={e => setEditProduct({ ...editProduct, name: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Category</label>
                  <select className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-sm" value={editProduct.category} onChange={e => setEditProduct({ ...editProduct, category: e.target.value })}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Description</label>
                <textarea className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-sm h-20 resize-none" value={editProduct.desc} onChange={e => setEditProduct({ ...editProduct, desc: e.target.value })} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Price (₹) *</label>
                  <input type="number" className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-sm" value={editProduct.price} onChange={e => setEditProduct({ ...editProduct, price: Number(e.target.value) })} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Unit</label>
                  <input className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-sm" value={editProduct.unit || ""} onChange={e => setEditProduct({ ...editProduct, unit: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Stock Quantity</label>
                  <input type="number" className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-sm" value={editProduct.quantity ?? 0} onChange={e => setEditProduct({ ...editProduct, quantity: Number(e.target.value) })} />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Image URL</label>
                <input className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-sm" value={editProduct.image} onChange={e => setEditProduct({ ...editProduct, image: e.target.value })} />
              </div>

              {/* Specs */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Specifications</label>
                <div className="flex gap-2 mb-2">
                  <input placeholder="Key" className="flex-1 px-3 py-1.5 border border-border rounded-lg bg-background text-sm" value={specKey} onChange={e => setSpecKey(e.target.value)} />
                  <input placeholder="Value" className="flex-1 px-3 py-1.5 border border-border rounded-lg bg-background text-sm" value={specVal} onChange={e => setSpecVal(e.target.value)} />
                  <Button size="sm" onClick={addSpec}><Plus className="w-3 h-3" /></Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(editProduct.specs || {}).map(([k, v]) => (
                    <span key={k} className="inline-flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-xs font-medium">
                      {k}: {v} <button onClick={() => removeSpec(k)}><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Features</label>
                <div className="flex gap-2 mb-2">
                  <input placeholder="Add a feature" className="flex-1 px-3 py-1.5 border border-border rounded-lg bg-background text-sm" value={featureInput} onChange={e => setFeatureInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addFeature()} />
                  <Button size="sm" onClick={addFeature}><Plus className="w-3 h-3" /></Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editProduct.features?.map((f, i) => (
                    <span key={i} className="inline-flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-xs font-medium">
                      {f} <button onClick={() => removeFeature(i)}><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-border">
              <Button variant="outline" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button className="flex-1" onClick={handleSave}>{isEditing ? "Save Changes" : "Add Product"}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
