import { ProductData } from "../products/interfaces";

export interface CartCardProps {
    item: ProductData;
    removeFromCart: (id: number) => void;
}