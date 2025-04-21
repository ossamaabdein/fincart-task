export interface IProductData {
    id: number;
    title: string;  
    price: number;
    images: string[];
    quantity: number;
    category: IProductCategory;
}

export interface IProductCategory {
    id: number;
    name: string;
}