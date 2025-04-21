import { IProductData } from "./interfaces";
import ProductCard from "./ProductCard";

const ProductsContainer = ({ products }: { products: IProductData[] }) => {
	return (
		<div className="products-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
			{products?.map((product) => (
				<ProductCard
					key={`${product?.id}_${product?.title}`}
					product={product}
				/>
			))}
		</div>
	);
};

export default ProductsContainer;
