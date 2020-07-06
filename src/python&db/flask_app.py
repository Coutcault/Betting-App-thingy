from flask_cors import CORS
from flask import Flask, request, jsonify
from seed import Account, PendingBets





app = Flask(__name__)
CORS(app)

# add user
@app.route("/add_user", methods=["POST"])
def add_user():
    data = request.get_json()
    first = data.get("first")
    last = data.get("last")
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")
    account = Account(first=first, last=last, username=username, password=password, email=email)
    account.addUser()
    return jsonify({'success':True})

# login user / if user exists / verify_user
@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    account = Account.login(username, password)
    if account:
        return jsonify({"token": account.auth_token})
    else:
        return jsonify({"token":""})


@app.route("/api/logout", methods=["POST"])
def logout():
    data = request.get_json()
    auth_token = data.get('data')
    user_pk = Account.get_user_pk(auth_token)[0][0]
    account = Account.logout(user_pk)
    if account:
        return jsonify('Successfully logged out you fucking idiot!')
    else:
       return jsonify(False) 

# update user
# @app.route("/update_user", methods=["POST"])
# def update_user_info():
#     if request.method == "GET":
#         return render_template("login.html")
#     else:
#         username = request.form.get("username")
#         password = request.form.get("password")
#         account = Account.login(username, password)
#         if account:
#             return "<h2>Homepage</h2>"
#         return redirect("/login")
 


# search users (friends)
# @app.route("/search_users", methods=["GET", "POST"])
# def find_friends():
#     if request.method == "GET":
#         return render_template("login.html")
#     else:
#         username = request.form.get("username")
#         password = request.form.get("password")
#         account = Account.login(username, password)
#         if account:
#             return "<h2>Homepage</h2>"
#         return redirect("/login")



# add friend
@app.route("/find_user", methods=["POST"])
def find_user():
    info = request.get_json()
    username = info.get('username')
    valid = Account.search(username)
    if valid:
        return jsonify(valid)
    else:
        return jsonify(False)

@app.route("/add_friend",methods=["POST"])
def add_friend():
    info = request.get_json()
    username = info.get('username')
    friend_pk = Account.get_friend_pk(username)[0][0]
    auth_token = info.get('auth_token')
    user_pk = Account.get_user_pk(auth_token)[0][0]
    if friend_pk == user_pk:
        return jsonify({'FAILURE': 'CANNOT ADD YOURSELF AS FRIEND'})
    else:
        add = Account.add_friend(user_pk, friend_pk)
        if add == True:
            x = user_pk
            user_pk = friend_pk
            friend_pk = x
            add_back = Account.add_friend(user_pk, friend_pk)
            if (add == True) and (add_back == True):
                return jsonify(True)
            else:
                return jsonify({'FAIL': 'NO CLUE WTF IS HAPPENING'})

@app.route("/delete_friend",methods=["POST"])
def delete_friend():
    info = request.get_json()
    auth_token = info.get('auth_token')
    user_pk = Account.get_user_pk(auth_token)[0][0]
    username = info.get('username')
    friend_pk = Account.get_friend_pk(username)[0][0]
    delete = Account.delete_friend(user_pk, friend_pk)
    if delete == True:
        x = user_pk
        user_pk = friend_pk
        friend_pk = x
        delete_back = Account.delete_friend(user_pk, friend_pk)
        if delete_back == True:
            return jsonify({"Success":"Friend successfully deleted!"})
        else:
            return jsonify({'FAIL': 'NO CLUE WTF IS HAPPENING'})
    


@app.route("/get_friends", methods=["POST"])
def get_friends():
    info = request.get_json()
    auth_token = info.get('auth_token')
    user_pk = Account.get_user_pk(auth_token)[0][0]
    friends = Account.get_all_friends(user_pk)
    users = []
    for i in range(0, len(friends)):
        users.append(friends[i][0])
    return jsonify(users)

@app.route("/get_user_info", methods=["POST"])
def get_user_info():
    info = request.get_json()
    auth_token = info.get('auth_token')
    user_pk = Account.get_user_pk(auth_token)[0][0]
    user_info = Account.get_user_pk(auth_token)[0]
    friends = Account.get_all_friends_info(user_pk)
    # users = []
    # for i in range(0, len(friends)):
    #     users.append(friends[i][0])
    return jsonify(friends, user_info)



@app.route("/add_pending_bet", methods=["POST"])
def add_pending_bet():
    data = request.get_json()
    auth_token = data.get('auth_token')
    priv = data.get("priv")
    amountUserAtRisk = data.get("amountWin")
    amountUserWin = data.get("amountAtRisk")
    betUser = data.get("betUser")
    typeOfBet = data.get("typeOfBet")
    line = data.get("line")
    odds = data.get("odds")
    betDate = data.get("betDate")
    betDescription = data.get("betDescription")
    amountAtRisk = data.get("amountAtRisk")
    amountWin = data.get("amountWin")
    friend_pk = Account.get_friend_pk(betUser)[0][0]
    user_pk = Account.get_user_pk(auth_token)[0][0]
    betCreator = Account.get_username(user_pk)[0]
    # betCreator = Account.get_username(user_pk)[0]
    # return jsonify(betCreator)
    pending_bet = PendingBets(priv=priv, betCreator=betCreator, amountUserAtRisk=amountUserAtRisk,
                    amountUserWin=amountUserWin, betUser=betUser, typeOfBet=typeOfBet, line=line, odds=odds,
                    betDate=betDate, betDescription=betDescription, amountAtRisk=amountAtRisk, amountWin=amountWin,
                    friend_pk=friend_pk, user_pk=user_pk)
    pending_bet.add_pending_bet()
    return jsonify({'success':True})

@app.route("/get_pending_response_bet", methods=["POST"])
def get_pending_response_bet():
    data = request.get_json()
    auth_token = data.get('auth_token')
    user_pk = Account.get_user_pk(auth_token)[0][0]
    pending_bets = PendingBets.get_all_pending_user_response_bets(user_pk)
    return jsonify(pending_bets)

@app.route("/get_pending_approval_bet", methods=["POST"])
def get_pending_approval_bet():
    data = request.get_json()
    auth_token = data.get('auth_token')
    user_pk = Account.get_user_pk(auth_token)[0][0]
    friend_pk = user_pk
    pending_bets = list(PendingBets.get_all_pending_approval_bets(friend_pk))
    # betCreator_pk = pending_bets[11]
    # betCreator = Account.get_username(betCreator_pk)
    # pending_bets.append(betCreator[0])
    return jsonify(pending_bets)

@app.route("/accept_bet", methods=["POST"])
def accept_bet():
    data = request.get_json()
    bet_pk = data.get('bet_pk')
    priv = data.get("priv")
    betCreator = data.get("betCreator")
    amountUserAtRisk = data.get("amountUserAtRisk")
    amountUserWin = data.get("amountUserWin")
    betUser = data.get("betUser")
    typeOfBet = data.get("typeOfBet")
    line = data.get("line")
    odds = data.get("odds")
    betDate = data.get("betDate")
    betDescription = data.get("betDescription")
    amountAtRisk = data.get("amountAtRisk")
    amountWin = data.get("amountWin")
    friend_pk = data.get("friend_pk")
    user_pk = data.get("user_pk")
    accept_bet = PendingBets(priv=priv, betCreator=betCreator, amountUserAtRisk=amountUserAtRisk,
                amountUserWin=amountUserWin, betUser=betUser, typeOfBet=typeOfBet, line=line, odds=odds,
                betDate=betDate, betDescription=betDescription, amountAtRisk=amountAtRisk, amountWin=amountWin,
                friend_pk=friend_pk, user_pk=user_pk)
    accept_bet.add_active_bet()
    delete = PendingBets.delete_pending_bet(bet_pk)
    if delete:
        return jsonify({"Success":"Bet Accepted"})
    

@app.route("/decline_bet", methods=["POST"])
def decline_bet():
    data = request.get_json()
    bet_pk = data.get('bet_pk')
    delete = PendingBets.delete_pending_bet(bet_pk)
    if delete:
        return jsonify({"Success":"Bet Declined"})

@app.route("/get_all_made_active_bets", methods=["POST"])
def active_user_bets():
    data = request.get_json()
    auth_token = data.get('auth_token')
    user_pk = Account.get_user_pk(auth_token)[0][0]
    active_bets = PendingBets.get_all_made_active_bets(user_pk)
    return jsonify(active_bets)

@app.route("/get_all_against_active_bets", methods=["POST"])
def active_bets():
    data = request.get_json()
    auth_token = data.get('auth_token')
    friend_pk = Account.get_user_pk(auth_token)[0][0]
    active_bets = PendingBets.get_all_against_active_bets(friend_pk)
    return jsonify(active_bets)

@app.route('/pay_with_venmo')
def pay_with_venmo():
    data = request.get_json()
    venmo_username = data.get('venmo_username')
    venmo_password = data.get('venmo_password')
    auth_token = data.get('auth_token')
    user_pk = Account.get_user_pk(auth_token)[0][0]
    url = 'https://api.venmo.com/oauth/access_token'
    header = {
        "phone_email_or_username": (f'{venmo_username}'),
        "password": (f'{venmo_password}')
    }
    r = requests.get(url, header=header)

if __name__=="__main__":
    app.run(debug=True)