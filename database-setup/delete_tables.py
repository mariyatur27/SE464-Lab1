import os
import pymysql
from sqlutils import connect
import boto3

from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
# Initialize DynamoDB client
dynamodb = boto3.client('dynamodb', os.environ['AWS_REGION'])



def drop_foreign_key_constraints(cursor):
    try:
        # Drop foreign key constraint products_ibfk_1 from products table
        cursor.execute("ALTER TABLE products DROP FOREIGN KEY products_ibfk_1")
        print("Foreign key constraint 'products_ibfk_1' dropped successfully.")
    except pymysql.Error as e:
        print(f"Error dropping foreign key constraint: {e}")


def delete_all_tables():
    # Connect to the MySQL database
    connection = connect()
    
    # Create a cursor object
    cursor = connection.cursor()

    try:
        drop_foreign_key_constraints(cursor)

        # Get a list of all tables in the database
        cursor.execute("SHOW TABLES")
        tables = cursor.fetchall()
        
        # Iterate over each table and drop it
        for table in tables:
            table_name = table[0]
            cursor.execute(f"DROP TABLE IF EXISTS {table_name}")
            print(f"Dropped {table_name}")

        print("All tables deleted successfully.")
    except Exception as e:
        print(f"Error deleting tables: {e}")
    finally:
        # Close cursor and connection
        cursor.close()
        connection.close()

def delete_dynamodb_tables():
    # List all tables
    response = dynamodb.list_tables()
    # Delete each table
    for table_name in response['TableNames']:
        dynamodb.delete_table(TableName=table_name)
        print(f"Table {table_name} deleted.")
    print("All tables deleted.")

# Call the function to delete all tables
delete_all_tables()
delete_dynamodb_tables()
