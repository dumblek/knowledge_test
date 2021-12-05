from app.model.user import User

from app import response, app, db
from flask import request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import *
import datetime

def index():
    try:
        users = User.query.all()

        if not users:
            return response.badRequest("", "Tidak ada data")

        result = []
        for user in users:
            result.append({
                'id' : user.id,
                'nama' : user.nama,
                'email' : user.email,
                'gender' : user.gender.value,
            })
        return response.succes(result, "sukses")

    except Exception as e:
        print(e)

def get_user(id):
    try:
        user = User.query.filter_by(id=id).first()

        if not user:
            return response.badRequest("", "User tidak ditemukan")

        result = {
            'id' : user.id,
            'nama' : user.nama,
            'email' : user.email,
            'gender' : user.gender.value
        }
        return response.succes(result, "sukses")

    except Exception as e:
        print(e)

def create():
    try:
        data = request.get_json()

        hashed_password = generate_password_hash(data['password'], method='sha256')

        new_user = User(nama=data['nama'], password=hashed_password, email=data['email'], gender=data['gender'])
        db.session.add(new_user)
        db.session.commit()

        return response.succes("", "User berhasil ditambah")
    except Exception as e:
        print(e)

def update(id):
    try:
        user = User.query.filter_by(id=id).first()

        if not user:
            return response.badRequest([], "User tidak ditemukan")

        data = request.get_json()
        user.nama=data['nama']
        user.email=data['email']
        user.gender=data['gender']
        
        db.session.commit()

        return response.succes("", "Data berhasil diupdate")
    except Exception as e:
        print(e)

def login():
    data = request.get_json()

    user = User.query.filter_by(email=data['email']).first()

    if not user:
        return response.badRequest([], "Email tidak terdaftar")

    if not check_password_hash(user.password, data['password']):
        return response.badRequest([], "Password salah")

    data = {
            'id' : user.id,
            'nama' : user.nama,
            'email' : user.email,
            'gender' : user.gender.value
    }

    expires = datetime.timedelta(minutes=30)

    token = create_access_token(data, fresh=True, expires_delta=expires)
    
    return response.succes({
        "data" : data,
        "token" : token
    }, "Sukses")