/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import * as _m0 from "protobufjs/minimal";
import Long = require("long");

export const protobufPackage = "";

export interface EmptyRequest {
}

export interface EmptyResponse {
}

export interface AllProductsRequest {
  categoryId?: string | undefined;
}

export interface ProductRequest {
  productId: string;
}

export interface Product {
  categoryId: string;
  stock: number;
  price: number;
  description: string;
  id: string;
  name: string;
}

export interface Products {
  products: Product[];
}

export interface OrderProduct {
  productId: string;
  quantity: number;
}

export interface Order {
  userId: string;
  id: string;
  products: OrderProduct[];
  totalAmount: number;
}

export interface OrderRequest {
  id: string;
}

export interface Orders {
  orders: Order[];
}

export interface Category {
  description: string;
  id: string;
  name: string;
}

export interface Categories {
  categories: Category[];
}

/** Users */
export interface UserRequest {
  id: string;
}

export interface UserPatchRequest {
  /** We assign user a unique ID, this shouldn't be changed. Following fields can be changed */
  id: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Users {
  users: User[];
}

function createBaseEmptyRequest(): EmptyRequest {
  return {};
}

export const EmptyRequest = {
  encode(_: EmptyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EmptyRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmptyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): EmptyRequest {
    return {};
  },

  toJSON(_: EmptyRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<EmptyRequest>): EmptyRequest {
    return EmptyRequest.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<EmptyRequest>): EmptyRequest {
    const message = createBaseEmptyRequest();
    return message;
  },
};

function createBaseEmptyResponse(): EmptyResponse {
  return {};
}

export const EmptyResponse = {
  encode(_: EmptyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EmptyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmptyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): EmptyResponse {
    return {};
  },

  toJSON(_: EmptyResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<EmptyResponse>): EmptyResponse {
    return EmptyResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<EmptyResponse>): EmptyResponse {
    const message = createBaseEmptyResponse();
    return message;
  },
};

function createBaseAllProductsRequest(): AllProductsRequest {
  return { categoryId: undefined };
}

export const AllProductsRequest = {
  encode(message: AllProductsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.categoryId !== undefined) {
      writer.uint32(10).string(message.categoryId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AllProductsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllProductsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.categoryId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AllProductsRequest {
    return { categoryId: isSet(object.categoryId) ? globalThis.String(object.categoryId) : undefined };
  },

  toJSON(message: AllProductsRequest): unknown {
    const obj: any = {};
    if (message.categoryId !== undefined) {
      obj.categoryId = message.categoryId;
    }
    return obj;
  },

  create(base?: DeepPartial<AllProductsRequest>): AllProductsRequest {
    return AllProductsRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<AllProductsRequest>): AllProductsRequest {
    const message = createBaseAllProductsRequest();
    message.categoryId = object.categoryId ?? undefined;
    return message;
  },
};

function createBaseProductRequest(): ProductRequest {
  return { productId: "" };
}

export const ProductRequest = {
  encode(message: ProductRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.productId !== "") {
      writer.uint32(10).string(message.productId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProductRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProductRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.productId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProductRequest {
    return { productId: isSet(object.productId) ? globalThis.String(object.productId) : "" };
  },

  toJSON(message: ProductRequest): unknown {
    const obj: any = {};
    if (message.productId !== "") {
      obj.productId = message.productId;
    }
    return obj;
  },

  create(base?: DeepPartial<ProductRequest>): ProductRequest {
    return ProductRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ProductRequest>): ProductRequest {
    const message = createBaseProductRequest();
    message.productId = object.productId ?? "";
    return message;
  },
};

function createBaseProduct(): Product {
  return { categoryId: "", stock: 0, price: 0, description: "", id: "", name: "" };
}

export const Product = {
  encode(message: Product, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.categoryId !== "") {
      writer.uint32(10).string(message.categoryId);
    }
    if (message.stock !== 0) {
      writer.uint32(24).int64(message.stock);
    }
    if (message.price !== 0) {
      writer.uint32(32).int64(message.price);
    }
    if (message.description !== "") {
      writer.uint32(42).string(message.description);
    }
    if (message.id !== "") {
      writer.uint32(50).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(58).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Product {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProduct();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.categoryId = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.stock = longToNumber(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.price = longToNumber(reader.int64() as Long);
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.description = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.id = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Product {
    return {
      categoryId: isSet(object.categoryId) ? globalThis.String(object.categoryId) : "",
      stock: isSet(object.stock) ? globalThis.Number(object.stock) : 0,
      price: isSet(object.price) ? globalThis.Number(object.price) : 0,
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
    };
  },

  toJSON(message: Product): unknown {
    const obj: any = {};
    if (message.categoryId !== "") {
      obj.categoryId = message.categoryId;
    }
    if (message.stock !== 0) {
      obj.stock = Math.round(message.stock);
    }
    if (message.price !== 0) {
      obj.price = Math.round(message.price);
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create(base?: DeepPartial<Product>): Product {
    return Product.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Product>): Product {
    const message = createBaseProduct();
    message.categoryId = object.categoryId ?? "";
    message.stock = object.stock ?? 0;
    message.price = object.price ?? 0;
    message.description = object.description ?? "";
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseProducts(): Products {
  return { products: [] };
}

export const Products = {
  encode(message: Products, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.products) {
      Product.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Products {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProducts();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.products.push(Product.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Products {
    return {
      products: globalThis.Array.isArray(object?.products) ? object.products.map((e: any) => Product.fromJSON(e)) : [],
    };
  },

  toJSON(message: Products): unknown {
    const obj: any = {};
    if (message.products?.length) {
      obj.products = message.products.map((e) => Product.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<Products>): Products {
    return Products.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Products>): Products {
    const message = createBaseProducts();
    message.products = object.products?.map((e) => Product.fromPartial(e)) || [];
    return message;
  },
};

function createBaseOrderProduct(): OrderProduct {
  return { productId: "", quantity: 0 };
}

export const OrderProduct = {
  encode(message: OrderProduct, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.productId !== "") {
      writer.uint32(10).string(message.productId);
    }
    if (message.quantity !== 0) {
      writer.uint32(16).int64(message.quantity);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrderProduct {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrderProduct();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.productId = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.quantity = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OrderProduct {
    return {
      productId: isSet(object.productId) ? globalThis.String(object.productId) : "",
      quantity: isSet(object.quantity) ? globalThis.Number(object.quantity) : 0,
    };
  },

  toJSON(message: OrderProduct): unknown {
    const obj: any = {};
    if (message.productId !== "") {
      obj.productId = message.productId;
    }
    if (message.quantity !== 0) {
      obj.quantity = Math.round(message.quantity);
    }
    return obj;
  },

  create(base?: DeepPartial<OrderProduct>): OrderProduct {
    return OrderProduct.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<OrderProduct>): OrderProduct {
    const message = createBaseOrderProduct();
    message.productId = object.productId ?? "";
    message.quantity = object.quantity ?? 0;
    return message;
  },
};

function createBaseOrder(): Order {
  return { userId: "", id: "", products: [], totalAmount: 0 };
}

export const Order = {
  encode(message: Order, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    for (const v of message.products) {
      OrderProduct.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.totalAmount !== 0) {
      writer.uint32(32).int64(message.totalAmount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Order {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.products.push(OrderProduct.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.totalAmount = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Order {
    return {
      userId: isSet(object.userId) ? globalThis.String(object.userId) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      products: globalThis.Array.isArray(object?.products)
        ? object.products.map((e: any) => OrderProduct.fromJSON(e))
        : [],
      totalAmount: isSet(object.totalAmount) ? globalThis.Number(object.totalAmount) : 0,
    };
  },

  toJSON(message: Order): unknown {
    const obj: any = {};
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.products?.length) {
      obj.products = message.products.map((e) => OrderProduct.toJSON(e));
    }
    if (message.totalAmount !== 0) {
      obj.totalAmount = Math.round(message.totalAmount);
    }
    return obj;
  },

  create(base?: DeepPartial<Order>): Order {
    return Order.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Order>): Order {
    const message = createBaseOrder();
    message.userId = object.userId ?? "";
    message.id = object.id ?? "";
    message.products = object.products?.map((e) => OrderProduct.fromPartial(e)) || [];
    message.totalAmount = object.totalAmount ?? 0;
    return message;
  },
};

function createBaseOrderRequest(): OrderRequest {
  return { id: "" };
}

export const OrderRequest = {
  encode(message: OrderRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrderRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrderRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OrderRequest {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: OrderRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create(base?: DeepPartial<OrderRequest>): OrderRequest {
    return OrderRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<OrderRequest>): OrderRequest {
    const message = createBaseOrderRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseOrders(): Orders {
  return { orders: [] };
}

export const Orders = {
  encode(message: Orders, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.orders) {
      Order.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Orders {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrders();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orders.push(Order.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Orders {
    return { orders: globalThis.Array.isArray(object?.orders) ? object.orders.map((e: any) => Order.fromJSON(e)) : [] };
  },

  toJSON(message: Orders): unknown {
    const obj: any = {};
    if (message.orders?.length) {
      obj.orders = message.orders.map((e) => Order.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<Orders>): Orders {
    return Orders.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Orders>): Orders {
    const message = createBaseOrders();
    message.orders = object.orders?.map((e) => Order.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCategory(): Category {
  return { description: "", id: "", name: "" };
}

export const Category = {
  encode(message: Category, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.description !== "") {
      writer.uint32(10).string(message.description);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Category {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCategory();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.description = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Category {
    return {
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
    };
  },

  toJSON(message: Category): unknown {
    const obj: any = {};
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create(base?: DeepPartial<Category>): Category {
    return Category.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Category>): Category {
    const message = createBaseCategory();
    message.description = object.description ?? "";
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseCategories(): Categories {
  return { categories: [] };
}

export const Categories = {
  encode(message: Categories, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.categories) {
      Category.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Categories {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCategories();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.categories.push(Category.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Categories {
    return {
      categories: globalThis.Array.isArray(object?.categories)
        ? object.categories.map((e: any) => Category.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Categories): unknown {
    const obj: any = {};
    if (message.categories?.length) {
      obj.categories = message.categories.map((e) => Category.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<Categories>): Categories {
    return Categories.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Categories>): Categories {
    const message = createBaseCategories();
    message.categories = object.categories?.map((e) => Category.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUserRequest(): UserRequest {
  return { id: "" };
}

export const UserRequest = {
  encode(message: UserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserRequest {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: UserRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create(base?: DeepPartial<UserRequest>): UserRequest {
    return UserRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<UserRequest>): UserRequest {
    const message = createBaseUserRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseUserPatchRequest(): UserPatchRequest {
  return { id: "", email: "", password: "" };
}

export const UserPatchRequest = {
  encode(message: UserPatchRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.email !== "") {
      writer.uint32(18).string(message.email);
    }
    if (message.password !== "") {
      writer.uint32(26).string(message.password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserPatchRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserPatchRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.email = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.password = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserPatchRequest {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      password: isSet(object.password) ? globalThis.String(object.password) : "",
    };
  },

  toJSON(message: UserPatchRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.password !== "") {
      obj.password = message.password;
    }
    return obj;
  },

  create(base?: DeepPartial<UserPatchRequest>): UserPatchRequest {
    return UserPatchRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<UserPatchRequest>): UserPatchRequest {
    const message = createBaseUserPatchRequest();
    message.id = object.id ?? "";
    message.email = object.email ?? "";
    message.password = object.password ?? "";
    return message;
  },
};

function createBaseUser(): User {
  return { id: "", email: "", name: "" };
}

export const User = {
  encode(message: User, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.email !== "") {
      writer.uint32(18).string(message.email);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): User {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.email = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): User {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
    };
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create(base?: DeepPartial<User>): User {
    return User.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<User>): User {
    const message = createBaseUser();
    message.id = object.id ?? "";
    message.email = object.email ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseUsers(): Users {
  return { users: [] };
}

export const Users = {
  encode(message: Users, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.users) {
      User.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Users {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUsers();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.users.push(User.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Users {
    return { users: globalThis.Array.isArray(object?.users) ? object.users.map((e: any) => User.fromJSON(e)) : [] };
  },

  toJSON(message: Users): unknown {
    const obj: any = {};
    if (message.users?.length) {
      obj.users = message.users.map((e) => User.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<Users>): Users {
    return Users.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Users>): Users {
    const message = createBaseUsers();
    message.users = object.users?.map((e) => User.fromPartial(e)) || [];
    return message;
  },
};

export type AppDefinition = typeof AppDefinition;
export const AppDefinition = {
  name: "App",
  fullName: "App",
  methods: {
    getProduct: {
      name: "GetProduct",
      requestType: ProductRequest,
      requestStream: false,
      responseType: Product,
      responseStream: false,
      options: {},
    },
    getRandomProduct: {
      name: "GetRandomProduct",
      requestType: EmptyRequest,
      requestStream: false,
      responseType: Product,
      responseStream: false,
      options: {},
    },
    getAllProducts: {
      name: "GetAllProducts",
      requestType: AllProductsRequest,
      requestStream: false,
      responseType: Products,
      responseStream: false,
      options: {},
    },
    getAllCategories: {
      name: "GetAllCategories",
      requestType: EmptyRequest,
      requestStream: false,
      responseType: Categories,
      responseStream: false,
      options: {},
    },
    getAllOrders: {
      name: "GetAllOrders",
      requestType: EmptyRequest,
      requestStream: false,
      responseType: Orders,
      responseStream: false,
      options: {},
    },
    getAllUserOrders: {
      name: "GetAllUserOrders",
      requestType: UserRequest,
      requestStream: false,
      responseType: Orders,
      responseStream: false,
      options: {},
    },
    getOrder: {
      name: "GetOrder",
      requestType: OrderRequest,
      requestStream: false,
      responseType: Order,
      responseStream: false,
      options: {},
    },
    getUser: {
      name: "GetUser",
      requestType: UserRequest,
      requestStream: false,
      responseType: User,
      responseStream: false,
      options: {},
    },
    getAllUsers: {
      name: "GetAllUsers",
      requestType: EmptyRequest,
      requestStream: false,
      responseType: Users,
      responseStream: false,
      options: {},
    },
    postOrder: {
      name: "PostOrder",
      requestType: Order,
      requestStream: false,
      responseType: Order,
      responseStream: false,
      options: {},
    },
    patchAccountDetails: {
      name: "PatchAccountDetails",
      requestType: UserPatchRequest,
      requestStream: false,
      responseType: User,
      responseStream: false,
      options: {},
    },
    deleteOrder: {
      name: "DeleteOrder",
      requestType: OrderRequest,
      requestStream: false,
      responseType: EmptyResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface AppServiceImplementation<CallContextExt = {}> {
  getProduct(request: ProductRequest, context: CallContext & CallContextExt): Promise<DeepPartial<Product>>;
  getRandomProduct(request: EmptyRequest, context: CallContext & CallContextExt): Promise<DeepPartial<Product>>;
  getAllProducts(request: AllProductsRequest, context: CallContext & CallContextExt): Promise<DeepPartial<Products>>;
  getAllCategories(request: EmptyRequest, context: CallContext & CallContextExt): Promise<DeepPartial<Categories>>;
  getAllOrders(request: EmptyRequest, context: CallContext & CallContextExt): Promise<DeepPartial<Orders>>;
  getAllUserOrders(request: UserRequest, context: CallContext & CallContextExt): Promise<DeepPartial<Orders>>;
  getOrder(request: OrderRequest, context: CallContext & CallContextExt): Promise<DeepPartial<Order>>;
  getUser(request: UserRequest, context: CallContext & CallContextExt): Promise<DeepPartial<User>>;
  getAllUsers(request: EmptyRequest, context: CallContext & CallContextExt): Promise<DeepPartial<Users>>;
  postOrder(request: Order, context: CallContext & CallContextExt): Promise<DeepPartial<Order>>;
  patchAccountDetails(request: UserPatchRequest, context: CallContext & CallContextExt): Promise<DeepPartial<User>>;
  deleteOrder(request: OrderRequest, context: CallContext & CallContextExt): Promise<DeepPartial<EmptyResponse>>;
}

export interface AppClient<CallOptionsExt = {}> {
  getProduct(request: DeepPartial<ProductRequest>, options?: CallOptions & CallOptionsExt): Promise<Product>;
  getRandomProduct(request: DeepPartial<EmptyRequest>, options?: CallOptions & CallOptionsExt): Promise<Product>;
  getAllProducts(request: DeepPartial<AllProductsRequest>, options?: CallOptions & CallOptionsExt): Promise<Products>;
  getAllCategories(request: DeepPartial<EmptyRequest>, options?: CallOptions & CallOptionsExt): Promise<Categories>;
  getAllOrders(request: DeepPartial<EmptyRequest>, options?: CallOptions & CallOptionsExt): Promise<Orders>;
  getAllUserOrders(request: DeepPartial<UserRequest>, options?: CallOptions & CallOptionsExt): Promise<Orders>;
  getOrder(request: DeepPartial<OrderRequest>, options?: CallOptions & CallOptionsExt): Promise<Order>;
  getUser(request: DeepPartial<UserRequest>, options?: CallOptions & CallOptionsExt): Promise<User>;
  getAllUsers(request: DeepPartial<EmptyRequest>, options?: CallOptions & CallOptionsExt): Promise<Users>;
  postOrder(request: DeepPartial<Order>, options?: CallOptions & CallOptionsExt): Promise<Order>;
  patchAccountDetails(request: DeepPartial<UserPatchRequest>, options?: CallOptions & CallOptionsExt): Promise<User>;
  deleteOrder(request: DeepPartial<OrderRequest>, options?: CallOptions & CallOptionsExt): Promise<EmptyResponse>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
