import Image from "next/image";
import { CartCardProps } from "./interfaces";

const CartCard = ({ item, removeFromCart }: CartCardProps) => {
	return (
		<div className="cart-card flex justify-between items-center border border-gray-300 bg-white text-black rounded-md p-4">
			<div className="flex items-center space-x-4">
				<Image
					src={item?.images?.[0]}
					alt={item?.title}
					className="rounded"
					width={64}
					height={64}
					objectFit="contain"
				/>
				<div>
					<h2 className="font-bold">{item.title}</h2>
					<p>Price: ${item?.price?.toFixed(2)}</p>
					<p>Quantity: {item?.quantity}</p>
				</div>
			</div>
			<button
				onClick={() => removeFromCart(item?.id)}
				className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
			>
				Remove
			</button>
		</div>
	);
};

export default CartCard;
