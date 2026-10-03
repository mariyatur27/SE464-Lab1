import { ProductRequest, Product, Order, OrderProduct, Category, UserRequest, UserPatchRequest, User } from './types';

export interface IDatabase {
    queryRandomProduct(): Promise<Product>;
    queryUserById(id: string): Promise<User>;
    queryAllProducts(category?: string): Promise<Product[]>;
    queryProductById(productId: string): Promise<Product>;
    queryAllCategories(): Promise<Category[]>;
    queryAllOrders(): Promise<Order[]>;
    queryOrdersByUser(id: string): Promise<Order[]>;
    queryOrderById(id: string): Promise<Order>;
    queryAllUsers(): Promise<User[]>;
    insertOrder(order: Order): Promise<void>;
    updateUser(patch: UserPatchRequest): Promise<void>;
    deleteOrder(id: string): Promise<void>;
};

export interface IServer {
    server: any;
    db: IDatabase;
    start(): void;
}