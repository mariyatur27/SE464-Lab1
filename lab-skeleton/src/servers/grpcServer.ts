import {
    AppDefinition,
    AppServiceImplementation,
    UserRequest,
    EmptyRequest,
    EmptyResponse,
    OrderRequest,
    ProductRequest,
    UserPatchRequest,
    AllProductsRequest,
    Order,
    Orders,
    Product,
    Products,
    Categories,
    User,
    Users,
    DeepPartial,
} from '../compiled_proto/app';
import { IDatabase, IServer } from '../interfaces';

import { createServer } from 'nice-grpc';

class GrpcServiceImpl implements AppServiceImplementation {
    db: IDatabase;

    constructor(db: IDatabase) {
        this.db = db;
    }

    async getProduct(request: ProductRequest): Promise<DeepPartial<Product>> {
        const product = await this.db.queryProductById(request.productId);
        return product;
    }
    async getRandomProduct(request: EmptyRequest): Promise<DeepPartial<Product>> {
        const product = await this.db.queryRandomProduct();
        return product;
    }
    async getAllProducts(request: AllProductsRequest): Promise<DeepPartial<Products>> {
        const products = await this.db.queryAllProducts(request.categoryId);
        return { products };
    }
    async getAllCategories(request: EmptyRequest): Promise<DeepPartial<Categories>> {
        const categories = await this.db.queryAllCategories();
        return { categories };
    }
    async getAllOrders(request: EmptyRequest): Promise<DeepPartial<Orders>> {
        const orders = await this.db.queryAllOrders();
        return { orders };
    }
    async getAllUserOrders(request: UserRequest): Promise<DeepPartial<Orders>> {
        const orders = await this.db.queryOrdersByUser(request.id);
        return { orders };
    }
    async getOrder(request: OrderRequest): Promise<DeepPartial<Order>> {
        const order = await this.db.queryOrderById(request.id);
        return order;
    }
    async getUser(request: UserRequest): Promise<DeepPartial<User>> {
        const user = await this.db.queryUserById(request.id);
        return user;
    }
    async getAllUsers(request: EmptyRequest): Promise<DeepPartial<Users>> {
        const users = await this.db.queryAllUsers();
        return { users };
    }
    async postOrder(request: Order): Promise<DeepPartial<Order>> {
        await this.db.insertOrder(request);
        return request;
    }
    async patchAccountDetails(request: UserPatchRequest): Promise<DeepPartial<User>> {
        await this.db.updateUser(request);
        const user = await this.db.queryUserById(request.id);
        return user;
    }
    async deleteOrder(request: OrderRequest): Promise<DeepPartial<EmptyResponse>> {
        const { id } = request;
        try {
          await this.db.deleteOrder(id);
          return {}; // EmptyResponse
        } catch (error) {
          throw error;
        }
    }
};

export default class GrpcServer implements IServer {
    server: any;
    db: IDatabase

    constructor(db: IDatabase) {
        this.db = db;
        this.server = createServer();
    }

    async start() {
        const port = 3001;
        this.server.add(AppDefinition, new GrpcServiceImpl(this.db));
        await this.server.listen(`0.0.0.0:${port}`);
        console.log(`gRPC server listening on port ${port}`);
    }
};