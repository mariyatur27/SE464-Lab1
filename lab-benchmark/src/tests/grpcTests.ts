import { ITestSuite } from "../interfaces";
import { AppClient, AppDefinition } from "../compiled_proto/app";
import { createChannel, createClient } from 'nice-grpc';
import { Order, TestResults, UserPatchRequest } from "../types";
import { avgRuntime } from "../testing";
import constants from "../constants";
import { v4 } from "uuid";

export default class GrpcTestSuite implements ITestSuite {
    private channel: any;
    private client: AppClient;
    private insertedOrderIds: string[] = [];

    constructor(ip: string) {
        this.channel = createChannel(`${ip}:3001`);
        this.client = createClient(AppDefinition, this.channel);
    }

    public async testRandomProduct(): Promise<any> {
        try {
            const data = await this.client.getRandomProduct({});
            return {
                payload: data,
                ok: true,
            };
        } catch (e) {
            console.error(e);
            return { payload: null, ok: false };
        }
    }

    public async testUserById(id: string): Promise<any> {
        try {
            const data = await this.client.getUser({ id });
            return { payload: data, ok: true };
        } catch (e) {
            console.error(e);
            return { payload: null, ok: false };
        }
    }

    public async testAllProducts(categoryId?: string): Promise<any> {
        try {
            const data = await this.client.getAllProducts({ categoryId });
            return { payload: data.products, ok: true };
        } catch (e) {
            console.error(e);
            return { payload: null, ok: false };
        }
    }

    public async testProductById(productId: string): Promise<any> {
        try {
            const data = await this.client.getProduct({ productId });
            return { payload: data, ok: true };
        } catch (e) {
            console.error(e);
            return { payload: null, ok: false };
        }

    }

    public async testAllCategories(): Promise<any> {
        try {
            const data = await this.client.getAllCategories({});
            return { payload: data.categories, ok: true };
        } catch (e) {
            console.error(e);
            return { payload: null, ok: false };
        }
    }

    public async testAllOrders(): Promise<any> {
        try {
            const data = await this.client.getAllOrders({});
            return { payload: data.orders, ok: true };
        } catch (e) {
            console.error(e);
            return { payload: null, ok: false };
        }
    }

    public async testOrdersByUser(id: string): Promise<any> {
        try {
            const data = await this.client.getAllUserOrders({ id });
            return { payload: data.orders, ok: true };
        } catch (e) {
            console.error(e);
            return { payload: null, ok: false };
        }
    }

    public async testOrderById(id: string): Promise<any> {
        try {
            const data = await this.client.getOrder({ id });
            return { payload: data, ok: true };
        } catch (e) {
            console.error(e);
            return { payload: null, ok: false };
        }
    }

    public async testAllUsers(): Promise<any> {
        try {
            const data = await this.client.getAllUsers({});
            return { payload: data.users, ok: true };
        } catch (e) {
            console.error(e);
            return { payload: null, ok: false };
        }
    }

    public async testInsertOrder(order: Order): Promise<any> {
        try {
            const data = await this.client.postOrder(order);
            this.insertedOrderIds.push(order.id);
            return { payload: data, ok: true };
        } catch (e) {
            console.error(e);
            return { payload: null, ok: false };
        }
    }

    public async cleanupInsertedOrders(): Promise<void> {
        for (const orderId of this.insertedOrderIds) {
            try {
                await this.client.deleteOrder({ id: orderId });
            } catch (e) {
                console.error(`Failed to delete order with id ${orderId}:`, e);
            }
        }
        // Clear the list after cleanup
        this.insertedOrderIds = [];
    }

    public async testUpdateUser(patch: UserPatchRequest): Promise<any> {
        try {
            const data = await this.client.patchAccountDetails(patch);
            return { payload: data, ok: true };
        } catch (e) {
            console.error(e);
            return { payload: null, ok: false };
        }
    }

    public async runSuite(iterations: number): Promise<TestResults> {
        const results: TestResults = {
            randomProduct: {
                ok: false,
                time: 0
            },
            userById: {
                ok: false,
                time: 0
            },
            allProducts: {
                ok: false,
                time: 0
            },
            productById: {
                ok: false,
                time: 0
            },
            allCategories: {
                ok: false,
                time: 0
            },
            allOrders: {
                ok: false,
                time: 0
            },
            ordersByUser: {
                ok: false,
                time: 0
            },
            orderById: {
                ok: false,
                time: 0
            },
            allUsers: {
                ok: false,
                time: 0
            },
            insertOrder: {
                ok: false,
                time: 0
            },
            updateUser: {
                ok: false,
                time: 0
            }
        };
        try {
            results.randomProduct = await avgRuntime(async () => await this.testRandomProduct(), iterations);
            results.userById = await avgRuntime(async () => await this.testUserById(constants.TEST_USER_ID), iterations, constants.EXPECTED_USER);
            results.allProducts = await avgRuntime(async () => await this.testAllProducts(), iterations, constants.EXPECTED_PRODUCTS);
            results.productById = await avgRuntime(async () => await this.testProductById(constants.TEST_PRODUCT_ID), iterations, constants.EXPECTED_PRODUCT);
            results.allCategories = await avgRuntime(async () => await this.testAllCategories(), iterations, constants.EXPECTED_CATEGORIES);
            results.allOrders = await avgRuntime(async () => await this.testAllOrders(), iterations, constants.EXPECTED_ORDERS);
            results.ordersByUser = await avgRuntime(async () => await this.testOrdersByUser(constants.TEST_USER_ID), iterations, constants.EXPECTED_ORDERSBYUSER);
            results.orderById = await avgRuntime(async () => await this.testOrderById(constants.TEST_ORDER_ID), iterations, constants.EXPECTED_ORDER);
            results.allUsers = await avgRuntime(async () => await this.testAllUsers(), iterations, constants.EXPECTED_USERS);
            results.insertOrder = await avgRuntime(async () => await this.testInsertOrder({ id: v4(), ...constants.TEST_ORDER }), iterations);
            results.updateUser = await avgRuntime(async () => await this.testUpdateUser(constants.TEST_UPDATE), iterations);
        } finally{
            await this.cleanupInsertedOrders();
        }
        return results;
    }
}