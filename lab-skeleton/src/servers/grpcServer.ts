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
import logger from '../logger';

class GrpcServiceImpl implements AppServiceImplementation {
    db: IDatabase;
    requestCount: number = 0;

    constructor(db: IDatabase) {
        this.db = db;
    }

    private logRequest(method: string, params: object = {}) {
        this.requestCount++;

        logger.info("Incoming gRPC request", {
            method,
            params,
            totalRequests: this.requestCount,
        });
    }

    async getProduct(request: ProductRequest): Promise<DeepPartial<Product>> {
        this.logRequest("getProduct", { productId: request.productId });
        const product = await this.db.queryProductById(request.productId);
        return product;
    }
    async getRandomProduct(request: EmptyRequest): Promise<DeepPartial<Product>> {
        this.logRequest("getRandomProduct");
        const product = await this.db.queryRandomProduct();
        return product;
    }
    async getAllProducts(request: AllProductsRequest): Promise<DeepPartial<Products>> {
        this.logRequest("getAllProducts", { categoryId: request.categoryId });
        const products = await this.db.queryAllProducts(request.categoryId);
        return { products };
    }
    async getAllCategories(request: EmptyRequest): Promise<DeepPartial<Categories>> {
        this.logRequest("getAllCategories");
        const categories = await this.db.queryAllCategories();
        return { categories };
    }
    async getAllOrders(request: EmptyRequest): Promise<DeepPartial<Orders>> {
        this.logRequest("getAllOrders");
        const orders = await this.db.queryAllOrders();
        return { orders };
    }
    async getAllUserOrders(request: UserRequest): Promise<DeepPartial<Orders>> {
        this.logRequest("getAllUserOrders", { userId: request.id });
        const orders = await this.db.queryOrdersByUser(request.id);
        return { orders };
    }
    async getOrder(request: OrderRequest): Promise<DeepPartial<Order>> {
        this.logRequest("getOrder", { orderId: request.id });
        const order = await this.db.queryOrderById(request.id);
        return order;
    }
    async getUser(request: UserRequest): Promise<DeepPartial<User>> {
        this.logRequest("getUser", { userId: request.id });
        const user = await this.db.queryUserById(request.id);
        return user;
    }
    async getAllUsers(request: EmptyRequest): Promise<DeepPartial<Users>> {
        this.logRequest("getAllUsers");
        const users = await this.db.queryAllUsers();
        return { users };
    }
    async postOrder(request: Order): Promise<DeepPartial<Order>> {
        this.logRequest("postOrder");
        await this.db.insertOrder(request);
        return request;
    }
    async patchAccountDetails(request: UserPatchRequest): Promise<DeepPartial<User>> {
        this.logRequest("patchAccountDetails", { userId: request.id });
        await this.db.updateUser(request);
        const user = await this.db.queryUserById(request.id);
        return user;
    }
    async deleteOrder(request: OrderRequest): Promise<DeepPartial<EmptyResponse>> {
        const { id } = request;
        this.logRequest("deleteOrder", { orderId: id });

        try {
            await this.db.deleteOrder(id);
            return {}; // EmptyResponse
        } catch (error) {
            logger.info("Failed to delete order", {
                orderId: id,
                error: error,
            });
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
        logger.info(`gRPC server listening on port ${port}`);
    }
};