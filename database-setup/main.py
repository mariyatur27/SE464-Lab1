from dotenv import load_dotenv

load_dotenv()

from populatesql import create_sql_tables, populate_sql_tables
from generate import generate_order_items, generate_products, generate_categories, generate_users, generate_orders
from populatedynamo import create_dynamo_tables, populate_dynamo_tables
from import_csv import import_csv

data = import_csv()
users = data['Users']
categories = data['Categories']
products = data['Products']
orders = data['Orders']

categories = generate_categories(categories)
products = generate_products(products)
users = generate_users(users)
orders = generate_orders(orders)
order_items = generate_order_items(orders)

# Populate DynamoDB Tables

create_dynamo_tables()
populate_dynamo_tables(users, categories, products, orders)

# Populate SQL Tables

create_sql_tables()
populate_sql_tables(users, categories, products, orders, order_items)
