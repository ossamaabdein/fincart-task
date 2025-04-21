import useCartStore from "./store/cartStore";
import CartSummary from "./components/cart/CartSummary";
import { Fragment } from "react";
import CartCard from "./components/cart/CartCard";

const CartPage = () => {
	const { cart, removeFromCart } = useCartStore();

	const totalItems = cart?.length;
	const totalPrice = cart?.reduce((sum, item) => sum + item?.price, 0);

	return (
		<div className="p-8">
			<h1 className="text-2xl font-bold mb-4">My Cart</h1>
			{cart.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<Fragment>
					<div className="cart-items space-y-4">
						{cart.map((item) => (
							<CartCard
								key={item.id}
								item={item}
								removeFromCart={removeFromCart}
							/>
						))}
					</div>
					<CartSummary totalItems={totalItems} totalPrice={totalPrice} />
				</Fragment>
			)}
		</div>
	);
};

export default CartPage;
