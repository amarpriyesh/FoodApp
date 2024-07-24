from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.dialects.postgresql.base import PGDialect
PGDialect._get_server_version_info = lambda *args: (9, 2)
from google.cloud.sql.connector import Connector, IPTypes

connector = Connector()

import pg8000
from google.oauth2 import service_account
from google.auth.transport.requests import Request
from google.oauth2.service_account import Credentials
from google.auth import default
import socket
db_host = socket.gethostname()
import os
import psycopg2

project_id = "garam-food-app"
region = "us-central1"
instance_name = "indian-food-exploration"
CLOUD_SQL_CONNECTION_NAME = f"{project_id}:{region}:{instance_name}"
connection_string = f'postgresql+psycopg2:///garam-food-app'

connect_args = {
    'host': f'/cloudsql/{CLOUD_SQL_CONNECTION_NAME}',
    'user': 'postgres',
    'password': 'password'
}

engine = create_engine(connection_string, connect_args=connect_args)

# rolwyn's code
# DB_URL = "postgresql+pg8000://postgres:postgres@indian-food-exploration:us-central1:garam-food-app/garam-food-app"
# engine = create_engine(f{DB_URL},echo=True)
# engine = create_engine(
#     f"postgresql+pg8000://postgres:postgres@indian-food-exploration:5432/garam-food-app",
#     creator=connector.connect,
#     connect_args={"sslmode": "verify-full"}
# )
SessionLocal = sessionmaker(autocommit=False,autoflush=False, bind=engine)
session = SessionLocal()
Base = declarative_base()



# indian-food-exploration:us-central1:garam-food-app
# 104.197.11.156 54328 postgres password