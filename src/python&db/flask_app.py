from flask_cors import CORS
from flask import Flask, request, jsonify
from seed import Account

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
    account = Account(first, last, username, password, email)
    account.addUser()
    return jsonify({"creation": "success"})

# login user / if user exists / verify_user
@app.route("/login", methods=["POST"])
def login():
    user = request.get_json()
    username = user.get('username')
    password = user.get('password')
    data = Account.login(username, password)
    if data:
        return jsonify(data)
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
def add_friend():
    info = request.get_json()
    username = info.get('user')
    valid = Account.search(username)
    if valid:
        return jsonify(valid)
    else:
        return jsonify(False)

if __name__=="__main__":
    app.run(debug=True)