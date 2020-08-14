import hashlib
import os
from base64 import b64encode

def hash_pwd(password):
  salt1 = os.environ['FAKETWITTER_SALT1']
  salt2 = os.environ['FAKETWITTER_SALT2']
  return hashlib.sha512((salt1 + password + salt2).encode('utf-8')).hexdigest()

def generate_token():
  return b64encode(os.urandom(64)).decode('utf-8')