from flask import Flask, render_template, request, Blueprint
import pymongo
from pymongo import MongoClient
from util import hash_pwd
import re
import time
import os


client = MongoClient(os.environ['FAKETWITTER_MONGODB'])
db = client.FakeTwitter

api = Blueprint('api', __name__, url_prefix='/api')

@api.route('/register/', methods=['GET', 'POST'])
def register():
  email = request.json['email']
  if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
    return "email invalid"
  password = request.json['password']
  if len(password) < 8 or len(password) > 20:
    return "password length invalid"
  if not re.match(r"^[A-Za-z0-9]*((\d+[A-Za-z]+)|([A-Za-z]+\d+))[A-Za-z0-9]*$", password):
    return "password invalid"
  firstname = request.json['firstname']
  lastname = request.json['lastname']
  result = db.user.update_one({
    'email': email,
  }, {
    '$setOnInsert': {
      'firstname': firstname,
      'lastname': lastname,
      'email': email,
      'password': hash_pwd(password),
      'created_at': int(time.time()),
      'updated_at': int(time.time()),
    }
  }, upsert=True)
  if result.matched_count > 0:
    return "you already have an account"
  if not result.upserted_id:
    return "register failed"
  return "success"


@api.route('/login/', methods=['GET', 'POST'])
def login():
  email = request.json['email']
  password = request.json['password']
  result = db.user.update_one({
    'email': email,
    'password': hash_pwd(password),
  },{
    '$set': {
      'updated_at': int(time.time()),
    }
  })
  if result.modified_count == 0:
    return "login failed"
  return "login successful"