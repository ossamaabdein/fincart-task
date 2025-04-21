import { useState, useEffect, useMemo } from "react";
import useCartStore from "../store/cartStore";
import { ProductData } from "./interfaces";
import Image from "next/image";

const ProductCard = ({ product }: { product: ProductData }) => {
	const { cart, addToCart, removeFromCart } = useCartStore();

	const isInCart = useMemo(
		() => cart.some((item) => item.id === product?.id),
		[cart, product?.id]
	);

	return (
		<div className="product-card border p-4 rounded">
            <div className="img-container w-full h-48 relative mb-4">
                <Image
                    src={product?.images?.[0]}
                    alt={product?.title}
                    fill
                    objectFit="contain"
                />
            </div>
			<h2 className="text-lg font-semibold">{product?.title}</h2>
			<p className="text-gray-600">${product?.price}</p>
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
	);
};

export default ProductCard;
