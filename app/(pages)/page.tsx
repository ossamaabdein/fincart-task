"use client";
import { useState, useEffect, useRef } from "react";
import { fetchCategories, fetchProducts } from "../utils/api";
import SpinnerLoader from "../components/common/SpinnerLoader";
import InfiniteScrollTrigger from "../components/common/InfiniteScrollTrigger";
import ProductsContainer from "../components/products/ProductsContainer";
import SelectDropdown from "../components/common/SelectDropdown";
import SearchInput from "../components/common/SearchInput";
import { IProductCategory } from "../components/products/interfaces";

export default function Home() {
	const [products, setProducts] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [category, setCategory] = useState("all");
	const [categories, setCategories] = useState([]);
	const [page, setPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const observer = useRef<IntersectionObserver>(null);

	useEffect(() => {
		const loadCategories = async () => {
			try {
				const data = await fetchCategories();
				setCategories(data.map((category: IProductCategory) => category.name));
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
					setTotalPages(page);
				} else {
					setProducts((prev) => [...prev, ...data]);
				}
			} catch (err: any) {
				setError(err?.response?.data?.message);
				if (err.response?.status === 404) {
					setTotalPages(page);
				}
			} finally {
				setLoading(false);
			}
		};

		loadProducts();
	}, [page, searchQuery, category]);

	useEffect(() => {
		let isFirstLoad = true;

		const handleObserver = (entries: IntersectionObserverEntry[]) => {
			const target = entries[0];
			if (
				target.isIntersecting &&
				!loading &&
				(totalPages === 0 || page < totalPages)
			) {
				if (isFirstLoad) {
					isFirstLoad = false;
					return;
				}
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
			{error && !loading && <p className="text-red-500">Error: {error}</p>}
			{products?.length > 0 && (
				<div className="products-container mt-10">
					<div className="filters mb-4 flex space-x-4">
						<SearchInput
							searchQuery={searchQuery}
							setSearchQuery={setSearchQuery}
						/>
						<SelectDropdown
							value={category}
							setValue={setCategory}
							options={categories}
						/>
					</div>

					<ProductsContainer products={products} />
				</div>
			)}

			{loading && <SpinnerLoader />}
			<InfiniteScrollTrigger />
		</div>
	);
}
