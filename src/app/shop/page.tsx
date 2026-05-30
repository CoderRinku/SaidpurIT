"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCartStore } from "@/store/cartStore";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  stock: number;
  images: string;
  isFeatured: boolean;
  category: Category;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const addToCart = useCartStore((state) => state.addToCart);

  const fetchCatalog = async () => {
    setLoading(true);
    try {
      let url = `/api/products?`;
      if (selectedCategory) url += `category=${selectedCategory}&`;
      if (search) url += `search=${encodeURIComponent(search)}`;
      
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
        setCategories(data.categories || []);
      }
    } catch (err) {
      console.error("Error fetching catalog:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, [selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCatalog();
  };

  const handleAddToCartClick = (prod: Product) => {
    addToCart({
      id: prod.id,
      name: prod.name,
      slug: prod.slug,
      price: prod.price,
      image: prod.images.split(",")[0], // Use first image url
    });

    setAddedItems((prev) => ({ ...prev, [prod.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [prod.id]: false }));
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background-deep text-white">
      <Header />

      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="rounded-2xl border border-white/5 bg-background-surface/40 p-6 space-y-6">
              
              {/* Search Form */}
              <form onSubmit={handleSearchSubmit} className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                  Search Hardware
                </label>
                <div className="flex h-11 rounded-xl bg-white/5 border border-white/10 p-1 focus-within:border-electric-cyan/40 transition-colors">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-grow bg-transparent px-3 text-xs text-white placeholder-slate-500 outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 rounded-lg bg-electric-cyan text-background-deep text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all"
                  >
                    Go
                  </button>
                </div>
              </form>

              {/* Categories Filter */}
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                  Core Categories
                </span>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => setSelectedCategory("")}
                    className={`text-left text-xs font-semibold py-1 px-2 rounded-lg transition-colors ${
                      selectedCategory === ""
                        ? "bg-electric-cyan/10 text-electric-cyan border border-electric-cyan/20"
                        : "text-slate-400 hover:text-white border border-transparent"
                    }`}
                  >
                    All Products
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`text-left text-xs font-semibold py-1 px-2 rounded-lg transition-colors ${
                        selectedCategory === cat.slug
                          ? "bg-electric-cyan/10 text-electric-cyan border border-electric-cyan/20"
                          : "text-slate-400 hover:text-white border border-transparent"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </aside>

          {/* Product Catalog Grid */}
          <section className="lg:col-span-9 space-y-6">
            
            {/* Header info */}
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <div>
                <h1 className="text-2xl font-black font-outfit text-white">HARDWARE CORE MARKET</h1>
                <p className="text-xs text-slate-400">Showing {products.length} high-tier components</p>
              </div>
            </div>

            {loading ? (
              <div className="flex h-64 items-center justify-center">
                <span className="h-8 w-8 animate-spin rounded-full border-4 border-electric-cyan border-t-transparent" />
              </div>
            ) : products.length === 0 ? (
              <div className="flex h-64 flex-col items-center justify-center text-center space-y-2 border border-dashed border-white/10 rounded-2xl">
                <span className="text-slate-500 text-sm">No hardware cores match search filters.</span>
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("");
                  }}
                  className="text-xs text-electric-cyan font-bold underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((prod) => (
                  <div
                    key={prod.slug}
                    className="rounded-2xl border border-white/5 bg-background-surface/30 p-4 flex flex-col justify-between group hover:border-white/15 hover:bg-background-deep/50 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
                  >
                    <div>
                      {/* Image */}
                      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white/5 border border-white/5 mb-4">
                        <img
                          src={prod.images.split(",")[0]}
                          alt={prod.name}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                        />
                        <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-background-deep/80 border border-white/10 text-[9px] font-bold uppercase tracking-wider text-slate-300">
                          {prod.stock > 0 ? `${prod.stock} In Stock` : "Out of stock"}
                        </span>
                      </div>

                      {/* Info */}
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest block">
                        {prod.category.name}
                      </span>
                      <a href={`/shop/${prod.slug}`}>
                        <h3 className="font-outfit text-base font-bold text-white mt-1 group-hover:text-electric-cyan transition-colors line-clamp-2">
                          {prod.name}
                        </h3>
                      </a>
                      <p className="text-slate-400 text-xs mt-2 line-clamp-2">{prod.description}</p>
                    </div>

                    <div className="pt-4 border-t border-white/5 mt-4 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-lg font-black text-white font-outfit">
                          ${prod.price.toFixed(2)}
                        </span>
                        {prod.compareAtPrice && (
                          <span className="text-xs text-slate-500 line-through">
                            ${prod.compareAtPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleAddToCartClick(prod)}
                        disabled={prod.stock <= 0}
                        className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                          addedItems[prod.id]
                            ? "bg-[#10b981] text-white"
                            : prod.stock <= 0
                            ? "bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed"
                            : "bg-white/5 border border-white/10 hover:bg-electric-cyan hover:text-background-deep hover:border-transparent hover:scale-102"
                        }`}
                      >
                        {addedItems[prod.id] ? "Added!" : prod.stock <= 0 ? "Empty" : "Buy"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
