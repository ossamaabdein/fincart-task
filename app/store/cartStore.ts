import { create } from "zustand";
import { IProductData } from "../components/products/interfaces";

interface CartState {
	cart: IProductData[];
	addToCart: (item: IProductData) => void;
	removeFromCart: (id: number) => void;
}

const useCartStore = create<CartState>((set) => ({
	cart:
		typeof window !== "undefined"
			? JSON.parse(localStorage.getItem("cart") || "[]")
			: [],

	addToCart: (item) => {
		set((state) => {
			const existingItem = state.cart.find(
				(cartItem) => cartItem.id === item.id
			);
			if (existingItem) {
				existingItem.quantity += 1;
			} else {
				state.cart.push({ ...item, quantity: 1 });
			}
			if (typeof window !== "undefined") {
				localStorage.setItem("cart", JSON.stringify(state.cart));
			}
			return { cart: [...state.cart] };
		});
	},

	removeFromCart: (id) => {
		set((state) => {
			const updatedCart = state.cart.filter((item) => item.id !== id);
			if (typeof window !== "undefined") {
				localStorage.setItem("cart", JSON.stringify(updatedCart));
			}
			return { cart: updatedCart };
		});
	},
}));

export default useCartStore;
