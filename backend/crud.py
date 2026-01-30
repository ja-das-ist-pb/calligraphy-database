import database
import sqlite3


def search_calligraphy(
    char : str, 
    author : list | None = None, 
    font : list | None = None
    ):
    conn = database.get_db()

    exe = """
    SELECT character, font, author
    FROM calligraphy
    WHERE character = ?
    """
    params = [char]

    if author:
        placeholder = ','.join("?" * len(author))
        exe += f' AND author IN ({placeholder})'
        params.extend(author)
    if font:
        placeholder = ','.join("?" * len(font))
        exe += f' AND font IN ({placeholder})'
        params.extend(font)

    result = conn.execute(exe, params)
    return result.fetchall()
