from sqlutils import connect
from schemas import User, Category, Product, Order, OrderItem

# Create the tables
create_table_users = """
    CREATE TABLE users (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(50),
        email VARCHAR(40),
        password VARCHAR(18)
    )
"""

create_table_products = """
    CREATE TABLE products (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(20),
        description VARCHAR(255),
        categoryId VARCHAR(255),
        price INT,
        stock INT,
        FOREIGN KEY (categoryId) REFERENCES categories(id)
    )
"""

create_table_orders = """
    CREATE TABLE orders (
        id VARCHAR(255) PRIMARY KEY,
        userId VARCHAR(255),
        totalAmount INT,
        FOREIGN KEY (userId) REFERENCES users(id)
    )
"""

create_table_order_items = """
    CREATE TABLE order_items (
        id VARCHAR(255) PRIMARY KEY,
        orderId VARCHAR(255),
        productId VARCHAR(255),
        quantity INT,
        FOREIGN KEY (orderId) REFERENCES orders(id),
        FOREIGN KEY (productId) REFERENCES products(id)
    )
"""

create_table_categories = """
    CREATE TABLE categories (
        id VARCHAR(255) PRIMARY KEY,
        description VARCHAR(100),
        name VARCHAR(20)
    )
"""


def create_sql_tables():
    conn = connect()
    try:
        # Create a cursor object
        cursor = conn.cursor()

        cursor.execute(create_table_users)
        cursor.execute(create_table_categories)
        cursor.execute(create_table_products)
        cursor.execute(create_table_orders)
        cursor.execute(create_table_order_items)

        conn.commit()

        print("Tables created successfully")

    finally:
        # Close the database connection
        conn.close()


# Function to insert items into the users table
def insert_users(cursor, users_data: list[User]):
    
    for user in users_data:
        query = """
            INSERT INTO users (id, name, email, password)
            VALUES (%s, %s, %s, %s)
        """
        values = (user['id'], user['name'], user['email'], user['password'])
        cursor.execute(query, values)
    


# Function to insert items into the categories table
def insert_categories(cursor, categories_data: list[Category]):
    for categories in categories_data:
        query = """
            INSERT INTO categories (id, name, description)
            VALUES (%s, %s, %s)
        """
        values = (categories['id'], categories['name'], categories['description'])
        cursor.execute(query, values)


# Function to insert items into the products table
def insert_products(cursor, products_data: list[Product]):
    for product in products_data:
        query = """
            INSERT INTO products (id, name, price, description, stock, categoryId)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        values = (
            product['id'], product['name'], product['price'], product['description'], product['stock'],
            product['categoryId'])
        cursor.execute(query, values)


# Function to insert items into the orders table
def insert_orders(cursor, orders_data: list[Order]):
    for order in orders_data:
        query = """
            INSERT INTO orders (id, userId, totalAmount)
            VALUES (%s, %s, %s)
        """
        values = (order['id'], order['userId'], order['totalAmount'])
        cursor.execute(query, values)


def insert_order_items(cursor, order_items_data: list[OrderItem]):
    cursor.execute("SELECT * FROM products")
    products = cursor.fetchall()
    product_ids = [product[0] for product in products]
    for order_data in order_items_data:
        query = """
            INSERT INTO order_items (id, orderId, productId, quantity)
            VALUES (%s, %s, %s, %s)
        """
        values = (order_data['id'], order_data['orderId'], order_data['productId'], order_data['quantity'])
        # verify product exists
        cursor.execute("SELECT * FROM products WHERE id = %s", (order_data['productId'],))
        product = cursor.fetchone()
        cursor.execute(query, values)


def populate_sql_tables(users: list[User], categories: list[Category], products: list[Product], orders: list[Order], order_items: list[OrderItem]):
    conn = connect()
    try:
        # Create a cursor object
        cursor = conn.cursor()

        insert_users(cursor, users)
        conn.commit()

        insert_categories(cursor, categories)
        conn.commit()

        insert_products(cursor, products)
        conn.commit()

        insert_orders(cursor, orders)
        conn.commit()

        insert_order_items(cursor, order_items)
        conn.commit()

        print(f"Data inserted into the tables successfully.")
    finally:
        # Close the database connection
        conn.close()
