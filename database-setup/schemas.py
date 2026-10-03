from typing import Optional, List, TypedDict

class Product(TypedDict):
    id: int
    name: str
    price: int
    description: Optional[str]
    stock: int
    categoryId: int

class Category(TypedDict):
    id: int
    name: str
    description: Optional[str]

class User(TypedDict):
    id: int
    name: str
    email: str
    password: str

class OrderItem(TypedDict):
    id: int
    orderId: int
    productId: int
    quantity: int


class Order(TypedDict):
    id: int
    userId: int
    products: List[OrderItem]
    totalAmount: int
