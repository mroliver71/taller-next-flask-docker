import os
class Config:
    DB_HOST = os.getenv("DB_HOST", "db")
    DB_NAME = os.getenv("DB_NAME", "dawa_db")
    DB_USER = os.getenv("DB_USER", "dawa_user")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "dawa_pass")