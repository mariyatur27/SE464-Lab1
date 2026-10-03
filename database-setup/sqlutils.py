import os
import pymysql
from pymysql import Error


def connect():
    # Define Aurora MySQL connection details
    # Retrieve the values of the environment variables
    host = os.environ['RDS_HOSTNAME']
    user = os.environ['RDS_USERNAME']
    password = os.environ['RDS_PASSWORD']
    port = int(os.environ['RDS_PORT'])
    database = os.environ['RDS_DATABASE']
    
    # Ensure all necessary environment variables are set
    if not all([host, user, password, port, database]):
        raise ValueError("One or more required environment variables are missing.")


    # Connect to database
    conn = pymysql.connect(host=host, port=port, user=user, password=password)
    cursor = conn.cursor()
    # Create the database if it doesn't exist
    cursor.execute(f'CREATE DATABASE IF NOT EXISTS {database}')
    conn.select_db(database)
    print("Successfully connected to the RDS database.")
    return conn
