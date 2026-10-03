export type ProductRequest = {
    productId: string;
};

export type AllProductsRequest = {
    categoryId: string;
}

export type Product = {
    categoryId: string;
    stock: number;
    price: number;
    description: string;
    id: string;
    name: string;
};

export type Order = {
    userId: string;
    id: string;
    products: OrderProduct[];
    totalAmount: number;
};

export type OrderRequest = {
    id: string;
}

export type OrderProduct = {
    productId: string;
    quantity: number;
};

export type Category = {
    description: string;
    id: string;
    name: string;
};

export type UserRequest = {
    id: string;
};

export type UserPatchRequest = {
    id: string;
    email?: string;
    password?: string;
}

export type User = {
    id: string;
    email: string;
    name: string;
}