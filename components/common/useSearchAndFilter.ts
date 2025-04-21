import { fetchProducts } from "@/app/utils/api";
import { useEffect } from "react";

const useSearchAndFilter = (searchQuery: string, category: string, setProducts: any) => {
  useEffect(() => {
    let debounceTimeout: NodeJS.Timeout | null = null;

    const handleSearchAndFilter = (query: string, selectedCategoryId: string) => {
      if (debounceTimeout) clearTimeout(debounceTimeout);

      debounceTimeout = setTimeout(async () => {
        try {
          const data = await fetchProducts(0, 10, query, selectedCategoryId);
          setProducts(data);
        } catch (err) {
          console.error("Error fetching products:", err);
        }
      }, 300);
    };

    handleSearchAndFilter(searchQuery, category);

    return () => {
      if (debounceTimeout) clearTimeout(debounceTimeout);
    };
  }, [searchQuery, category, setProducts]);
};

export default useSearchAndFilter;