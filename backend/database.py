import sqlite3
from pathlib import Path

db_path = Path(__file__).resolve().parent / "database" / "cally.db"

def get_db():
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    
    return conn