import sqlite3
import os

PATH = os.path.dirname(__file__)
DATAPATH = os.path.join(PATH, 'data.db')
db = DATAPATH

def schema():
    with sqlite3.connect(db) as conn:
        cur = conn.cursor()

        sql = """CREATE TABLE user(
            pk INTEGER PRIMARY KEY AUTOINCREMENT,
            first VARCHAR(32),
            last VARCHAR(32),
            username VARCHAR(12),
            password VARCHAR(32), 
            email VARCHAR(32),
            img VARCHAR(32)
        );"""

        cur.execute(sql)

        # sql = """CREATE TABLE friends(
        #     pk INTEGER PRIMARY KEY AUTOINCREMENT,
        #     username VARCHAR(32),
        #     user_pk INTEGER,
        #     FOREIGN KEY(user_pk) REFERENCES user(pk)
        # );"""

        # cur.execute(sql)

        # sql = """CREATE TABLE bets(
        #     pk INTEGER PRIMARY KEY AUTOINCREMENT,
        #     bet VARCHAR(128),
        #     user_pk INTEGER,
        #     FOREIGN KEY(user_pk) REFERENCES user(pk)
        # );"""

if __name__ == "__main__":
    schema()