import { IProductData } from "../products/interfaces";

export interface CartCardProps {
    item: IProductData;
    removeFromCart: (id: number) => void;
}