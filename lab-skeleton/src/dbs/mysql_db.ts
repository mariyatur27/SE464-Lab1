import { Product } from "../compiled_proto/app";
import { IDatabase } from "../interfaces";
import { Category, Order, User, UserPatchRequest } from "../types";
import mysql from "mysql2/promise";

export default class MySqlDB implements IDatabase {
  connection: mysql.Connection;

  async init() {
    this.connection = await mysql.createConnection({
      host: process.env.RDS_HOSTNAME,
      user: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      port: parseInt(process.env.RDS_PORT), // Convert port to a number
      database: process.env.RDS_DATABASE,
    });
    console.log("MySQL connected!");
  }

  constructor() {
    this.init();
  }

  async queryProductById(productId) {
    return (
      await this.connection.query(`SELECT *
                                FROM products
                                WHERE id = "${productId}";`)
    )[0][0] as Product;
  }

  async queryRandomProduct() {
    const allProducts = await this.queryAllProducts();
    return allProducts[Math.random() * (allProducts.length - 1)] as Product;
  }

  queryAllProducts = async (category?: string) => {
    let query = "SELECT * FROM categories";
    const params: string[] = [];

    if (category) {
      query += " WHERE category = ?";
      params.push(category);
    }

    query += ";";

    return (await this.connection.query(query, params))[0] as Product[];
  };

  queryAllCategories = async () => {
    return (
      await this.connection.query("SELECT * FROM categories;")
    )[0] as Category[];
  };

  queryAllOrders = async () => {
    return (await this.connection.query(`SELECT * FROM orders;`))[0] as Order[];
  };

  async queryOrdersByUser(id: string) {
    return (
      await this.connection.query(`SELECT *
                             FROM orders
                             WHERE userId = "${id}"`)
    )[0] as Order[];
  }

  queryOrderById = async (id: string) => {
    return (
      await this.connection.query(`SELECT *
                             FROM orders
                             WHERE id = "${id}"`)
    )[0][0];
  };

  queryUserById = async (id: string) => {
    return (
      await this.connection.query(`SELECT id, email, name
                             FROM users
                             WHERE id = "${id}";`)
    )[0][0];
  };

  queryAllUsers = async () => {
    return (
      await this.connection.query("SELECT id, name, email FROM users")
    )[0] as User[];
  };

  insertOrder = async (order: Order) => {
    await this.connection.query(
      `INSERT INTO orders (id, userId, totalAmount)
        VALUES (?, ?, ?);`,
      [order.id, order.userId, order.totalAmount],
    );

    for (const product of order.products) {
      await this.connection.query(
        `INSERT INTO order_items (orderId, productId)
          VALUES (?, ?);`,
        [order.id, product.id],
      );
    }
  };

  updateUser = async (patch: UserPatchRequest) => {
    const fields: string[] = [];
    const values: string[] = [];

    if (patch.email !== undefined) {
      fields.push("email = ?");
      values.push(patch.email);
    }

    if (patch.password !== undefined) {
      fields.push("password = ?");
      values.push(patch.password);
    }

    if (fields.length === 0) {
      return;
    }

    values.push(patch.id);

    await this.connection.query(
      `UPDATE users
     SET ${fields.join(", ")}
     WHERE id = ?`,
      values,
    );
  };

  // This is to delete the inserted order to avoid database data being contaminated also to make the data in database consistent with that in the json files so the comparison will return true.
  // Feel free to modify this based on your inserOrder implementation
  deleteOrder = async (id: string) => {
    await this.connection.query(`DELETE FROM order_items WHERE orderId = ?`, [
      id,
    ]);
    await this.connection.query(`DELETE FROM orders WHERE id = ?`, [id]);
  };
};