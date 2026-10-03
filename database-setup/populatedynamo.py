import boto3
import os
from schemas import Product, Category, User, Order, OrderItem

# Populate DynamoDB with object data
dynamodb = boto3.client('dynamodb', os.environ['AWS_REGION'])

def create_dynamo_tables():
    dynamodb.create_table(
        TableName='Categories',
        AttributeDefinitions=[
            {'AttributeName': 'id',
             'AttributeType': 'S'},
        ],
        KeySchema=[{
            'AttributeName': 'id',
            'KeyType': 'HASH',
        }],
        BillingMode='PROVISIONED',
        ProvisionedThroughput={
            'ReadCapacityUnits': 5,
            'WriteCapacityUnits': 5
        },
        # StreamEnabled=False,
    )

    dynamodb.create_table(
        TableName='Orders',
        AttributeDefinitions=[
            {'AttributeName': 'id',
             'AttributeType': 'S'},
        ],
        KeySchema=[{
            'AttributeName': 'id',
            'KeyType': 'HASH',
        }],
        BillingMode='PROVISIONED',
        ProvisionedThroughput={
            'ReadCapacityUnits': 5,
            'WriteCapacityUnits': 5
        },
        # StreamEnabled=False,
    )

    dynamodb.create_table(
        TableName='Products',
        AttributeDefinitions=[
            {'AttributeName': 'id',
             'AttributeType': 'S'},
        ],
        KeySchema=[{
            'AttributeName': 'id',
            'KeyType': 'HASH',
        }],
        BillingMode='PROVISIONED',
        ProvisionedThroughput={
            'ReadCapacityUnits': 5,
            'WriteCapacityUnits': 5
        },
        # StreamEnabled=False,
    )

    dynamodb.create_table(
        TableName='Users',
        AttributeDefinitions=[
            {'AttributeName': 'id',
             'AttributeType': 'S'},
        ],
        KeySchema=[{
            'AttributeName': 'id',
            'KeyType': 'HASH',
        }],
        BillingMode='PROVISIONED',
        ProvisionedThroughput={
            'ReadCapacityUnits': 5,
            'WriteCapacityUnits': 5
        },
        # StreamEnabled=False,
    )


# Populate products table
def populate_table(table_name, items):
    dynamoitems = convert_to_dynamodb_items(items)
    response = None

    # Put the item into the DynamoDB table
    for dynamoitem in dynamoitems:
        response = dynamodb.put_item(
            TableName=table_name,
            Item=dynamoitem
        )
    # print(response.get('ResponseMetadata', {}))
    # Check the response for any errors
    if response is not None and response.get('ResponseMetadata', {}).get('HTTPStatusCode') == 200:
        print(f'Added to DynamoDB {table_name} table successfully!')
    else:
        print(f'Failed to add to {table_name} table in DynamoDB:', response)

    return items  # do this so we can make use of this array later


def convert_to_dynamodb_items(items):
    # Convert to dynamoDB objects
    dynamoitems = []

    for item in items:
        dynamoitem = {}
        for key, value in item.items():
            if isinstance(value, str):
                dynamoitem[key] = {'S': value}
            elif isinstance(value, int):
                dynamoitem[key] = {'N': str(value)}
            elif isinstance(value, list):
                dynamoitem[key] = {'L': []}
                for element in value:
                    if isinstance(element, str):
                        dynamoitem[key]['L'].append({'S': element})
                    elif isinstance(element, dict):
                        nested_obj = {}
                        for (nested_key, nested_value) in element.items():
                            if isinstance(nested_value, str):
                                nested_obj[nested_key] = {'S': nested_value}
                            elif isinstance(nested_value, int):
                                nested_obj[nested_key] = {'N': str(nested_value)}
                        dynamoitem[key]['L'].append({'M': nested_obj})
                    else:
                        raise ValueError(f"Unsupported data type in list for key '{key}': {type(element)}")
            else:
                raise ValueError(f"Unsupported data type for key '{key}': {type(value)}")

        dynamoitems.append(dynamoitem)
    return dynamoitems

def populate_dynamo_tables(users: list[User], categories: list[Category], products: list[Product], orders: list[Order]):
    # wait for table creation
    table_names = ['Users', 'Products', 'Categories', 'Orders']
    for table_name in table_names:
        table_waiter = dynamodb.get_waiter('table_exists')
        table_waiter.wait(TableName=table_name)

    populate_table('Products', products)
    populate_table('Categories', categories)
    populate_table('Users', users)
    populate_table('Orders', orders)
    print(f'Dynamo tables populated')
