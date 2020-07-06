import sqlite3
import os

PATH = os.path.dirname(__file__)
DATAPATH = os.path.join(PATH, 'data.db')
db = DATAPATH

def schema():
    with sqlite3.connect(db) as conn:
        cur = conn.cursor()

        # sql = """CREATE TABLE user(
        #     pk INTEGER PRIMARY KEY AUTOINCREMENT,
        #     first VARCHAR(32),
        #     last VARCHAR(32),
        #     username VARCHAR(12),
        #     password VARCHAR(32), 
        #     email VARCHAR(32),
        #     auth_token VARCHAR,
        #     record VARCHAR,
        #     img VARCHAR(32)
        # );"""

        # cur.execute(sql)

        # sql = """CREATE TABLE friends(
        #     pk INTEGER PRIMARY KEY AUTOINCREMENT,
        #     user_pk INTEGER,
        #     friend_pk INTEGER,
        #     FOREIGN KEY(user_pk) REFERENCES user(pk),
        #     FOREIGN KEY(friend_pk) REFERENCES user(pk)
        # );"""

        # cur.execute(sql)

        # sql = """CREATE TABLE pending_bets(
        #     pk INTEGER PRIMARY KEY AUTOINCREMENT,
        #     priv VARCHAR,
        #     betCreator VARCHAR,
        #     amountUserAtRisk VARCHAR,
        #     amountUserWin VARCHAR,
        #     betUser VARCHAR,
        #     typeOfBet VARCHAR,
        #     line VARCHAR,
        #     odds VARCHAR,
        #     betDate TIMESTAMP,
        #     betDescription VARCHAR,
        #     amountAtRisk VARCHAR,
        #     amountWin VARCHAR,
        #     friend_pk INTEGER,
        #     user_pk INTEGER,
        #     FOREIGN KEY(friend_pk) REFERENCES user(pk)
        #     FOREIGN KEY(user_pk) REFERENCES user(pk)
        # );"""

        # cur.execute(sql)


        # sql = """CREATE TABLE active_bets(
        #     pk INTEGER PRIMARY KEY AUTOINCREMENT,
        #     priv VARCHAR,
        #     betCreator VARCHAR,
        #     amountUserAtRisk VARCHAR,
        #     amountUserWin VARCHAR,
        #     betUser VARCHAR,
        #     typeOfBet VARCHAR,
        #     line VARCHAR,
        #     odds VARCHAR,
        #     betDate TIMESTAMP,
        #     betDescription VARCHAR,
        #     amountAtRisk VARCHAR,
        #     amountWin VARCHAR,
        #     friend_pk INTEGER,
        #     user_pk INTEGER,
        #     FOREIGN KEY(friend_pk) REFERENCES user(pk)
        #     FOREIGN KEY(user_pk) REFERENCES user(pk)
        # );"""

        # cur.execute(sql)

         # sql = """CREATE TABLE previous_bets(
        #     pk INTEGER PRIMARY KEY AUTOINCREMENT,
        #     priv VARCHAR,
        #     betCreator VARCHAR,
        #     amountUserAtRisk VARCHAR,
        #     amountUserWin VARCHAR,
        #     betUser VARCHAR,
        #     typeOfBet VARCHAR,
        #     line VARCHAR,
        #     odds VARCHAR,
        #     betDate TIMESTAMP,
        #     betDescription VARCHAR,
        #     amountAtRisk VARCHAR,
        #     amountWin VARCHAR,
        #     friend_pk INTEGER,
        #     user_pk INTEGER,
        #     FOREIGN KEY(friend_pk) REFERENCES user(pk)
        #     FOREIGN KEY(user_pk) REFERENCES user(pk)
        # );"""

        # cur.execute(sql)



if __name__ == "__main__":
    schema()