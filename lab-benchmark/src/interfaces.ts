import { UserPatchRequest } from "./compiled_proto/app";
import { Category, EndpointReturn, Order, Product, TestResults, User } from "./types";

export interface ITestSuite {
    testRandomProduct(): Promise<EndpointReturn>;
    testUserById(id: string): Promise<EndpointReturn>;
    testAllProducts(categoryId?: string): Promise<EndpointReturn>;
    testProductById(productId: string): Promise<EndpointReturn>;
    testAllCategories(): Promise<EndpointReturn>;
    testAllOrders(): Promise<EndpointReturn>;
    testOrdersByUser(id: string): Promise<EndpointReturn>;
    testOrderById(id: string): Promise<EndpointReturn>;
    testAllUsers(): Promise<EndpointReturn>;
    testInsertOrder(order: Order): Promise<EndpointReturn>;
    testUpdateUser(patch: UserPatchRequest): Promise<EndpointReturn>;
    runSuite(iterations: number): Promise<TestResults>;
}