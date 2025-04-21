import Image from "next/image";
import useCartStore from "../../store/cartStore";
import { Fragment, useEffect, useState } from "react";
import SpinnerLoader from "../common/SpinnerLoader";

const CartPage = () => {
	const { cart, removeFromCart } = useCartStore();
	const [isLoading, setIsLoading] = useState(true);
	const totalItems = cart?.length || 0;
	const totalPrice = cart?.reduce((sum, item) => sum + item?.price, 0) || 0;

	useEffect(() => {
		if (cart) {
			setIsLoading(false);
		}
	}, [cart]);
	return (
		<div className="p-8">
			<h1 className="text-2xl font-bold mb-4">My Cart</h1>
			{isLoading ? (
				<SpinnerLoader />
			) : cart?.length === 0 ? (
				<p className="text-center mt-22 text-xl">Your cart is empty.</p>
			) : (
				<Fragment>
					<div className="cart-items space-y-4">
						{cart.map((item) => (
							<li
								key={item.id}
								className="flex justify-between items-center border border-gray-300 bg-white text-black rounded-md p-4"
							>
								<div className="flex items-center space-x-4">
									<Image
										src={item.images?.[0]}
										alt={item.title}
										className="rounded"
										width={64}
										height={20}
										objectFit="contain"
									/>
									<div>
										<h2 className="font-bold">{item.title}</h2>
										<p>Price: ${item.price.toFixed(2)}</p>
										<p>Quantity: {item.quantity}</p>
									</div>
								</div>
								<button
									onClick={() => removeFromCart(item.id)}
									className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
								>
									Remove
								</button>
							</li>
						))}
					</div>
					<div className="bg-gradient-to-r from-gray-100 to-gray-200 text-black border border-gray-300 shadow-xl rounded-lg p-8 mt-8">
						<h2 className="text-3xl font-extrabold mb-6 text-center text-blue-600">
							Cart Summary
						</h2>
						<div className="flex justify-between items-center mb-4">
							<span className="text-lg font-semibold">Total Items:</span>
							<span className="text-xl font-bold text-gray-800">
								{totalItems}
							</span>
						</div>
						<div className="flex justify-between items-center mb-6">
							<span className="text-lg font-semibold">Total Price:</span>
							<span className="text-xl font-bold text-green-700">
								${totalPrice.toFixed(2)}
							</span>
						</div>
						<button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-800 transition duration-300 text-lg font-medium">
							Proceed to Checkout
						</button>
					</div>
				</Fragment>
			)}
		</div>
	);
};

export default CartPage;
