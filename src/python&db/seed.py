import sqlite3
import os

PATH = os.path.dirname(__file__)
DATAPATH = os.path.join(PATH, 'data.db')
db = DATAPATH

class Account:

    dbpath = "data.db"

    def __init__(self, first, last, username, password, email):
        self.first = first
        self.last = last
        self.username = username
        self.password = password
        self.email = email

    @classmethod
    def login(cls, username, password):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            sql = """SELECT * FROM user WHERE username=? AND password=?"""
            cursor.execute(sql, (username, password))
            user = cursor.fetchone()
            return user

    def addUser(self):
        with sqlite3.connect(self.dbpath) as conn:
            cursor = conn.cursor()
            sql = """INSERT INTO user 
                    (first, last, username, password, email) 
                    VALUES (?,?,?,?,?);"""
            cursor.execute(sql, (self.first, self.last, self.username, self.password, self.email))


    @classmethod
    def search(cls, username):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            sql = """SELECT * FROM user WHERE username=?"""
            cursor.execute(sql)
            data = cursor.fetchall()
            return data

if __name__ == "__main__":
    new_user = Account('Christian', 'Outcault', 'Cout', 'password', 'email@email.com')
    new_user.addUser()
    new_user2 = Account('Billy', 'Over', 'Bover', 'password', 'new@email.com')
    new_user2.addUser()
    # print(Account.search('Cout'))

    
