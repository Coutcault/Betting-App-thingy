# from venmo_api import Client

# Get your access token. You will need to complete the 2FA process
# access_token = Client.get_access_token(username='',
#                                        password='')
# venmo = Client(access_token=access_token)

# Search for users. You get 50 results per page.
# users = venmo.user.search_for_users(query="Peter",
#                                     page=2)

# for user in users:
#    print(user.username)

# # Or, you can pass a callback to make it multi-threaded
# def callback(users):
#    for user in users:
#        print(user.username)
# venmo.user.search_for_users(query="peter",
#                             callback=callback,
#                             page=2,
#                             count=10)

# venmo.log_out('abb471a30b6a5fb0261b0c43b9a74deb81c548c90f10559f7ca47eddec601a72')

import requests

venmo_username = input('Username:')
venmo_password = input('Password:')

url = 'https://api.venmo.com/v1/oauth/access_token'
header ={
        'Content-Type':	'application/json'
    }
body = {
        "phone_email_or_username": (f'{venmo_username}'),
        "client_id": '1',
        "password": (f'{venmo_password}')
    }
r = requests.post(url, headers=header, data=body)

print (r)