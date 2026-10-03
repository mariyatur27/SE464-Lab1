import { ITestSuite } from '../interfaces';
import { Category, EndpointReturn, Order, Product, TestResults, User, UserPatchRequest } from '../types';
import { avgRuntime } from '../testing';
import { v4 } from "uuid";
import constants from '../constants';
// be careful with the follwoing import related to fetch if you are using node version 18 or higher
import fetch from "node-fetch";

export default class RestTestSuite implements ITestSuite {
    private endpoint: string;
    // Track inserted order IDs
    private insertedOrderIds: string[] = []; 

    constructor(ip: string) {
        this.endpoint = `http://${ip}:3000`;
    }

    public async testRandomProduct(): Promise<EndpointReturn> {
        try {
            const resp = await fetch(this.endpoint + "/randomproduct");
            if (!resp.ok) throw new Error("Failed to fetch random product");
            const json = await resp.json();
            return {
                payload: json,
                ok: true
            };
        } catch (e) {
            console.error(e);
            return {
                payload: null,
                ok: false
            };
        }
    }

    public async testUserById(id: string): Promise<EndpointReturn> {
        try {
            const resp = await fetch(this.endpoint + "/user/" + id);
            if (!resp.ok) throw new Error("Failed to fetch user by id");
            const json = await resp.json();
            return { payload: json, ok: true };
        } catch (e) {
            console.error("error");
            return { payload: null, ok: false };
        }
    }

    public async testAllProducts(categoryId?: string): Promise<EndpointReturn> {
        try {
            const resp = await fetch(this.endpoint + "/products" + (categoryId ? "?categoryId=" + categoryId : ""));
            if (!resp.ok) throw new Error("Failed to fetch all products");
            const json = await resp.json();
            return { payload: json, ok: true };
        } catch (e) {
            console.error(e);
            return { payload: null, ok: false };
        }
    }

    public async testProductById(productId: string): Promise<EndpointReturn> {
        try {
            const resp = await fetch(this.endpoint + "/product/" + productId);
            if (!resp.ok) throw new Error("Failed to fetch product by id");
            const json = await resp.json();
            return { payload: json, ok: true };
        } catch (e) {
            console.error(e);
            return { payload: null, ok: false };
        }
    }

    public async testAllCategories(): Promise<EndpointReturn> {
        try {
            const resp = await fetch(this.endpoint + "/categories");
            if (!resp.ok) throw new Error("Failed to fetch all categories");
            const json = await resp.json();
            return { payload: json, ok: true };
        } catch (e) {
            console.error(e);
            return { payload: null, ok: false };
        }
    }

    public async testAllOrders(): Promise<EndpointReturn> {
        try {
            const resp = await fetch(this.endpoint + "/allorders");
            if (!resp.ok) throw new Error("Failed to fetch all orders");
            const json = await resp.json();
            // console.log("Actual allOrders data:", JSON.stringify(json, null, 2));
            console.log("Actual allOrders size:", json.length);
            return { payload: json, ok: true };
        } catch (e) {
            console.error(e);
            return { payload: null, ok: false };
        }
    }

    public async testOrdersByUser(id: string): Promise<EndpointReturn> {
        try {
            const resp = await fetch(this.endpoint + "/orders?id=" + id);
            if (!resp.ok) throw new Error("Failed to fetch orders by user");
            const json = await resp.json();
            return { payload: json, ok: true };
        } catch (e) {
            console.error(e);
            return { payload: null, ok: false };
        }
    }

    public async testOrderById(id: string): Promise<EndpointReturn> {
        try {
            const resp = await fetch(this.endpoint + "/order/" + id);
            if (!resp.ok) throw new Error("Failed to fetch order by id");
            const json = await resp.json();
            return { payload: json, ok: true };
        } catch (e) {
            console.error(e);
            return { payload: null, ok: false };
        }
    }

    public async testAllUsers(): Promise<EndpointReturn> {
        try {
            const resp = await fetch(this.endpoint + "/users");
            if (!resp.ok) throw new Error("Failed to fetch all users");
            const json = await resp.json();
            return { payload: json, ok: true };
        } catch (e) {
            console.error(e);
            return { payload: null, ok: false };
        }
    }

    public async testInsertOrder(order: Order): Promise<EndpointReturn> {
        try {
            const resp = await fetch(this.endpoint + "/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(order)
            });
            if (!resp.ok) throw new Error("Failed to insert order");
            // Record the inserted order ID
            this.insertedOrderIds.push(order.id);
            return { payload: null, ok: true }
        } catch (e) {
            console.error(e);
            return { payload: null, ok: false }
        }
    }

    public async cleanupInsertedOrders(): Promise<void> {
        for (const orderId of this.insertedOrderIds) {
            try {
                const resp = await fetch(this.endpoint + `/order/${orderId}`, {
                    method: "DELETE"
                });
                if (!resp.ok) {
                    console.error(`Failed to delete order with id ${orderId}`);
                }
            } catch (e) {
                console.error(`Error deleting order with id ${orderId}:`, e);
            }
        }
        // Clear the list after cleanup
        this.insertedOrderIds = [];
    }

    public async testUpdateUser(patch: UserPatchRequest): Promise<EndpointReturn> {
        try {
            const resp = await fetch(this.endpoint + `/user/${patch.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(patch)
            });
            if (!resp.ok) throw new Error("Failed to update user");
            return { payload: null, ok: true }
        } catch (e) {
            console.error(e);
            return { payload: null, ok: false }
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
        try{
            results.randomProduct = await avgRuntime(async () => await this.testRandomProduct(), iterations);
            results.userById = await avgRuntime(async () => await this.testUserById(constants.TEST_USER_ID), iterations, constants.EXPECTED_USER);
            results.allProducts = await avgRuntime(async () => await this.testAllProducts(), iterations, constants.EXPECTED_PRODUCTS);
            results.productById = await avgRuntime(async () => await this.testProductById(constants.TEST_PRODUCT_ID), iterations, constants.EXPECTED_PRODUCT);
            results.allCategories = await avgRuntime(async () => await this.testAllCategories(), iterations, constants.EXPECTED_CATEGORIES);
            // console.log("Expected allOrders data:", JSON.stringify(constants.EXPECTED_ORDERS, null, 2));
            console.log("Expected allOrders size:", constants.EXPECTED_ORDERS.length);
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