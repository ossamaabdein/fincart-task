'use client';
import { useState, useEffect, useRef } from "react";
import ProductCard from "../components/ProductCard";
import { fetchCategories, fetchProducts } from "../utils/api";
import SpinnerLoader from "../components/common/SpinnerLoader";
import InfiniteScrollTrigger from "../components/common/InfiniteScrollTrigger";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data.map((category) => category.name));
      } catch (err) {
        console.error(err);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      if (loading || (totalPages > 0 && page >= totalPages)) return;

      setLoading(true);
      setError(null);
      try {
        const data = await fetchProducts(page * 10, 10, searchQuery, category);
        if (data.length === 0) {
          setTotalPages(page); // Stop further requests if no data is returned
        } else {
          setProducts((prev) => [...prev, ...data]);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [page, searchQuery, category]);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !loading && (totalPages === 0 || page < totalPages)) {
        setPage((prev) => prev + 1);
      }
    };

    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    const element = document.querySelector("#infinite-scroll-trigger");
    if (element) observer.current.observe(element);

    return () => {
      if (observer.current && element) observer.current.unobserve(element);
    };
  }, [loading, totalPages, page]);

  return (
    <div className="py-10 px-24">
      <h1 className="text-2xl font-bold mb-4">Products List</h1>
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="products-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </div>

      {loading && (
        <SpinnerLoader />
      )}
      <InfiniteScrollTrigger />
    </div>
  );
}
