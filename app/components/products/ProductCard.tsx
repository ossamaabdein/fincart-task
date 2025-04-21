import { useMemo } from "react";
import Image from "next/image";
import { IProductData } from "./interfaces";
import useCartStore from "@/app/store/cartStore";

const ProductCard = ({ product }: { product: IProductData }) => {

	const { cart, addToCart, removeFromCart } = useCartStore();
	const isInCart = useMemo(
		() => cart.some((item) => item.id === product?.id),
		[cart, product?.id]
	);

	return (
		<div className="product-card border p-4 rounded-xl">
			<div className="img-container w-full h-48 relative mb-4">
                {product?.images?.[0] &&
                    <Image
                        src={product?.images?.[0] || "/"}
                        alt={product?.title}
                        fill
                        objectFit="contain"
                    />
                }
			</div>
			<div className="flex flex-col">
				<h2 className="text-lg font-semibold min-h-[3.5rem]">
					{product?.title}
				</h2>
				<p className="text-gray-500">${product?.price}</p>
				<button
					onClick={() =>
						isInCart ? removeFromCart(product?.id) : addToCart(product)
					}
					className={`mt-2 px-4 py-2 rounded text-white transition-all duration-300 cursor-pointer ${
						isInCart
							? "bg-red-500 hover:bg-red-600"
							: "bg-green-500 hover:bg-green-600"
					}`}
				>
					{isInCart ? "Remove from Cart" : "Add to Cart"}
				</button>
			</div>
		</div>
	);
};

export default ProductCard;
