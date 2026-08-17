from . import database
from pathlib import Path
from datetime import date, datetime, timedelta

visit_db_path = Path(__file__).resolve().parent / "database" / "visit.db"


def visit_web():
    conn = database.get_db(visit_db_path)
    try:
        today = datetime.now().strftime("%Y%m%d") # ex: 20080725
        conn.execute("""
            INSERT INTO visit (date, count) 
            VALUES (?, 1)
            ON CONFLICT(date) DO UPDATE SET count = count + 1
        """, (today,))
        conn.commit()
    finally:
        conn.close()

def get_visit_data():
    conn = database.get_db(visit_db_path)
    try:
        today = date.today()
        yesterday = today - timedelta(days=1)
        week = today - timedelta(days=today.weekday())
        month = today.replace(day=1)
        year = today.replace(month=1, day=1)

        def one_day_count(day : date):
            row = conn.execute("""
                SELECT count FROM visit WHERE date = ?
            """, (day.strftime("%Y%m%d"),)).fetchone()

            return row[0] if row else 0

        def many_days_count(start_day : date):
            row = conn.execute("""
                SELECT COALESCE(SUM(count), 0) FROM visit WHERE date >= ?
            """, (start_day.strftime("%Y%m%d"), )).fetchone()

            return row[0]

        return {
            "today" : one_day_count(today),
            "yesterday" : one_day_count(yesterday),
            "week" : many_days_count(week),
            "month" : many_days_count(month),
            "year" : many_days_count(year),
            "total" : conn.execute("SELECT COALESCE(SUM(count), 0) FROM visit").fetchone()[0],
        }
    finally:
        conn.close()