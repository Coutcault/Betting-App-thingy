import sqlite3
import os
import string
import random

PATH = os.path.dirname(__file__)
DATAPATH = os.path.join(PATH, 'data.db')
db = DATAPATH

class Account:

    dbpath = "data.db"

    def __init__(self, **kwargs):
        self.pk = kwargs.get("pk")
        self.first = kwargs.get("first")
        self.last = kwargs.get("last")
        self.username = kwargs.get("username")
        self.password = kwargs.get("password")
        self.email = kwargs.get("email")
        self.auth_token = kwargs.get("auth_token", "")
        self.record = kwargs.get("record", "0 - 0")
        self.friend_pk = kwargs.get("friend_pk")
        self.user_pk = kwargs.get("user_pk")
        self.venUserID = kwargs.get("venUserID")

    @classmethod
    def login(cls, username, password):
        with sqlite3.connect(db) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            sql = """SELECT * FROM user WHERE username=? AND password=?"""
            cursor.execute(sql, (username, password))
            result = cursor.fetchone()
            if result:
                account = cls(**result)
                account.auth_token = "".join([random.choice(string.digits + string.ascii_letters) for _ in range(30)])
                account.update()
                return account
            return None
    
    @classmethod
    def logout(cls, pk):
        with sqlite3.connect(db) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            sql = """UPDATE user SET
                auth_token="" 
                WHERE pk=?;"""
            cursor.execute(sql, (pk, ))
            return True
            
    @classmethod
    def get_venmo_user_id(cls, username):
        with sqlite3.connect(db) as conn:
            cursor = conn.cursor()
            sql = """SELECT venUserID FROM user WHERE username=?"""
            cursor.execute(sql, (username, ))
            result = cursor.fetchone()
            return result   


    def update(self):
        with sqlite3.connect(db) as conn:
            cur = conn.cursor()
            sql = """UPDATE user SET
                username=?, password=?, auth_token=?, record=? 
                WHERE pk=?;"""
            values = (self.username, self.password, self.auth_token, self.record, self.pk)
            cur.execute(sql, values)


    def addUser(self):
        with sqlite3.connect(db) as conn:
            cursor = conn.cursor()
            sql = """INSERT INTO user 
                    (first, last, username, password, email, auth_token, record) 
                    VALUES (?,?,?,?,?,?,?);"""
            cursor.execute(sql, (self.first, self.last, self.username, self.password, self.email, self.auth_token, self.record))


    @classmethod
    def search(cls, username):
        with sqlite3.connect(db) as conn:
            cursor = conn.cursor()
            sql = """SELECT * FROM user WHERE username=?"""
            cursor.execute(sql, (username, ))
            result = cursor.fetchall()
            return result

    @classmethod
    def get_friend_pk(cls, username):
        with sqlite3.connect(db) as conn:
            cursor = conn.cursor()
            sql = """SELECT * FROM user WHERE username=?"""
            cursor.execute(sql, (username, ))
            result = cursor.fetchall()
            return result

    @classmethod
    def get_username(cls, pk):
        with sqlite3.connect(db) as conn:
            cursor = conn.cursor()
            sql = """SELECT username FROM user WHERE pk=?"""
            cursor.execute(sql, (pk, ))
            result = cursor.fetchone()
            return result


    @classmethod
    def get_user_pk(cls, auth_token):
        with sqlite3.connect(db) as conn:
            cursor = conn.cursor()
            sql = """SELECT * FROM user WHERE auth_token=?"""
            cursor.execute(sql, (auth_token, ))
            result = cursor.fetchall()
            return result
    
    @classmethod
    def add_friend(cls, user_pk, friend_pk):
        with sqlite3.connect(db) as conn:
            cursor = conn.cursor()
            sql = """INSERT INTO friends 
                    (user_pk, friend_pk) 
                    VALUES (?,?);"""
            cursor.execute(sql, (user_pk, friend_pk))
            return True

    @classmethod
    def delete_friend(cls, user_pk, friend_pk):
        with sqlite3.connect(db) as conn:
            cursor = conn.cursor()
            sql = """DELETE FROM friends WHERE
                    user_pk=? AND friend_pk=? ;"""
            cursor.execute(sql, (user_pk, friend_pk))
            return True

    @classmethod
    def get_all_friends(cls, user_pk):
        with sqlite3.connect(db) as conn:
            cursor = conn.cursor()
            sql = """ SELECT username FROM friends 
                    JOIN user ON user.pk = friends.friend_pk
                    WHERE user_pk=?"""
            cursor.execute(sql, (user_pk, ))
            result = cursor.fetchall()
            return result

    @classmethod
    def get_all_friends_info(cls, user_pk):
        with sqlite3.connect(db) as conn:
            cursor = conn.cursor()
            sql = """ SELECT * FROM friends 
                    JOIN user ON user.pk = friends.friend_pk
                    WHERE user_pk=?"""
            cursor.execute(sql, (user_pk, ))
            result = cursor.fetchall()
            return result
    
  



class PendingBets:

    def __init__(self, **kwargs):
        self.pk = kwargs.get("pk")
        self.priv = kwargs.get("priv")
        self.betCreator = kwargs.get("betCreator")
        self.amountUserAtRisk = kwargs.get("amountUserAtRisk")
        self.amountUserWin = kwargs.get("amountUserWin")
        self.betUser = kwargs.get("betUser")
        self.typeOfBet = kwargs.get("typeOfBet")
        self.line = kwargs.get("line")
        self.odds = kwargs.get("odds")
        self.betDate = kwargs.get("betDate")
        self.betDescription = kwargs.get("betDescription")
        self.amountAtRisk = kwargs.get("amountAtRisk")
        self.amountWin = kwargs.get("amountWin")
        self.result = kwargs.get('result')
        self.friend_pk = kwargs.get("friend_pk")
        self.user_pk = kwargs.get("user_pk")
        

    def add_pending_bet(self):
        with sqlite3.connect(db) as conn:
            cursor = conn.cursor()
            sql = """INSERT INTO pending_bets 
                    (priv, betCreator, amountUserAtRisk, amountUserWin, betUser, 
                    typeOfBet, line, odds, betDate, betDescription, 
                    amountAtRisk, amountWin, friend_pk, user_pk) 
                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);"""
            values = (self.priv, self.betCreator, self.amountUserAtRisk, self.amountUserWin, 
                    self.betUser, self.typeOfBet, self.line, self.odds, 
                    self.betDate, self.betDescription, self.amountAtRisk, self.amountWin,                    
                    self.friend_pk, self.user_pk,)
            cursor.execute(sql, (values))

    @classmethod
    def delete_pending_bet(cls, pk):
        with sqlite3.connect(db) as conn:
            cursor = conn.cursor()
            sql = """DELETE FROM pending_bets WHERE
                    pk=?;"""
            cursor.execute(sql, (pk, ))
            return True
    
    @classmethod
    def get_all_pending_approval_bets(cls, friend_pk):
        with sqlite3.connect(db) as conn:
            cursor = conn.cursor()
            sql = """SELECT * FROM pending_bets 
                    JOIN user ON user.pk = pending_bets.friend_pk
                    WHERE friend_pk=?"""
            cursor.execute(sql, (friend_pk, ))
            result = cursor.fetchall()
            return result

    @classmethod
    def get_all_pending_user_response_bets(cls, user_pk):
        with sqlite3.connect(db) as conn:
            cursor = conn.cursor()
            sql = """SELECT * FROM pending_bets 
                    JOIN user ON user.pk = pending_bets.user_pk
                    WHERE user_pk=?"""
            cursor.execute(sql, (user_pk, ))
            result = cursor.fetchall()
            return result



    def add_active_bet(self):
        with sqlite3.connect(db) as conn:
            cursor = conn.cursor()
            sql = """INSERT INTO active_bets 
                    (priv, betCreator, amountUserAtRisk, amountUserWin, betUser, 
                    typeOfBet, line, odds, betDate, betDescription, 
                    amountAtRisk, amountWin, friend_pk, user_pk) 
                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);"""
            values = (self.priv, self.betCreator, self.amountUserAtRisk, self.amountUserWin, 
                    self.betUser, self.typeOfBet, self.line, self.odds, 
                    self.betDate, self.betDescription, self.amountAtRisk, self.amountWin,                    
                    self.friend_pk, self.user_pk,)
            cursor.execute(sql, (values))


    @classmethod
    def get_all_made_active_bets(cls, user_pk):
        with sqlite3.connect(db) as conn:
            cursor = conn.cursor()
            sql = """SELECT * FROM active_bets 
                    JOIN user ON user.pk = active_bets.user_pk
                    WHERE user_pk=?"""
            cursor.execute(sql, (user_pk, ))
            result = cursor.fetchall()
            return result

    @classmethod
    def get_all_against_active_bets(cls, friend_pk):
        with sqlite3.connect(db) as conn:
            cursor = conn.cursor()
            sql = """SELECT * FROM active_bets 
                    JOIN user ON user.pk = active_bets.friend_pk
                    WHERE friend_pk=?"""
            cursor.execute(sql, (friend_pk, ))
            result = cursor.fetchall()
            return result


    def add_past_bet(self):
        with sqlite3.connect(db) as conn:
            cursor = conn.cursor()
            sql = """INSERT INTO previous_bets 
                    (priv, betCreator, amountUserAtRisk, amountUserWin, betUser, 
                    typeOfBet, line, odds, betDate, betDescription, 
                    amountAtRisk, amountWin, result, friend_pk, user_pk) 
                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"""
            values = (self.priv, self.betCreator, self.amountUserAtRisk, self.amountUserWin, 
                    self.betUser, self.typeOfBet, self.line, self.odds, 
                    self.betDate, self.betDescription, self.amountAtRisk, self.amountWin,                    
                    self.result, self.friend_pk, self.user_pk,)
            cursor.execute(sql, (values))

    @classmethod
    def delete_active_bet(cls, pk):
        with sqlite3.connect(db) as conn:
            cursor = conn.cursor()
            sql = """DELETE FROM active_bets WHERE
                    pk=?;"""
            cursor.execute(sql, (pk, ))
            return True

    @classmethod
    def get_history(cls, pk):
        with sqlite3.connect(db) as conn:
            cursor = conn.cursor()
            sql = """SELECT * FROM previous_bets 
                    JOIN user ON user.pk = previous_bets.user_pk
                    WHERE user_pk=?"""
            cursor.execute(sql, (pk, ))
            result = cursor.fetchall()
            return result

    @classmethod
    def get_past(cls, pk):
        with sqlite3.connect(db) as conn:
            cursor = conn.cursor()
            sql = """SELECT * FROM previous_bets 
                    JOIN user ON user.pk = previous_bets.friend_pk
                    WHERE friend_pk=?"""
            cursor.execute(sql, (pk, ))
            result = cursor.fetchall()
            return result

    # def update_pending_bet(self):
    #     with sqlite3.connect(db) as conn:
    #         cursor = conn.cursor()
    #         sql = """UPDATE pending_bets SET
    #                 how=? betUser=?, type=?, line=?, odds=?, betDate=?, description=?, 
    #                 amountRisk=?, amountWin=?
    #                 WHERE pk=?;"""
    #         values = (self.how, self.betUser, self.type, self.line, self.odds, 
    #                 self.betDate, self.description, self.amountRisk, self.amountWin,
    #                 self.pk)
    #         cursor.execute(sql, (values))





# if __name__ == "__main__":
    # new_user = Account('Christian', 'Outcault', 'Cout', 'password', 'email@email.com')
    # new_user.addUser()
    # new_user2 = Account('Billy', 'Over', 'Bover', 'password', 'new@email.com')
    # new_user2.addUser()
    # print(Account.search('Cout'))
    # print(Account.search('Cout'))


    
