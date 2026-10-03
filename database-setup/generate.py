from schemas import Product, Category, User, Order, OrderItem

# Generate Products
def generate_products(products: list[dict]) -> list[Product]:
    # Create dictionary of items
    items = []
    for product in products:
        item = {
            'id': product['id'],
            'name': product['name'],
            'price': product['price'],
            'description': product['description'],
            'stock': product['stock'],
            'categoryId': product['categoryId']
        }
        items.append(item)
    return items


# Generate Categories

def generate_categories(categories: list[dict]) -> list[Category]:
    items = []
    for c in categories:
        item = {
            'id': c['id'],
            'name': c['name'],
            'description': c['description'],
        }
        items.append(item)
    return items


# Generate Users

def generate_users(users: list[dict]) -> list[User]:
    items = []
    for user in users:
        item = {
            'id': user['id'],
            'name': user['name'],
            'email': user['email'],
            'password': user['password'],
        }
        items.append(item)
    return items


def generate_orders(orders: list[dict]) -> list[Order]:
    items = []
    for order in orders:
        product_list = []
        for product in order['products']:
            product_item = {
                'productId': product['productId'],
                'quantity': product['quantity']
            }
            product_list.append(product_item)

        order = {
            'id': order['id'],
            'userId': order['userId'],
            'products': product_list,
            'totalAmount': order['totalAmount']
        }

        items.append(order)
    return items


def generate_order_items(orders: list[Order]) -> list[OrderItem]:
    # print(orders)
    order_items = []
    idx = 0
    for order in orders:
        products = order['products']
        for product in products:
            order_item = {
                'id': idx,
                'orderId': order['id'],
                'productId': product['productId'],
                'quantity': product['quantity']
            }
            idx += 1
            order_items.append(order_item)

    return order_items
