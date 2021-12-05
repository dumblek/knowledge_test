from flask import request
from flask_migrate import current
from app import app, response
from app.controller import UserController, ProdukController
from flask_jwt_extended import jwt_required, get_jwt_identity

@app.route('/')
def index():
    return "Flask JWT"

# Token required
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()

    return response.succes(current_user, "Sukses")

# Login
@app.route('/login', methods=['POST'])
def login():
    return UserController.login()

# User
@app.route('/user', methods=['GET', 'POST'])
def user():
    if request.method == 'GET':
        return UserController.index()
    else:
        return UserController.create()

@app.route('/user/<id>', methods=['GET', 'PUT'])
@jwt_required()
def user_detail(id):
    if request.method == 'GET':
        return UserController.get_user(id)
    else:
        return UserController.update(id)

# Produk
@app.route('/produk', methods=['GET', 'POST'])
@jwt_required()
def produk():
    if request.method == 'GET':
        return ProdukController.index()
    else:
        return ProdukController.create()

@app.route('/produk/<id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def produk_detail(id):
    if request.method == 'GET':
        return ProdukController.get_produk(id)
    elif request.method == 'PUT':
        return ProdukController.update(id)
    else:
        return ProdukController.delete(id)