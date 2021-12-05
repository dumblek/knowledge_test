from app.model.produk import Produk

from app import response, app, db
from flask import request
from flask_jwt_extended import get_jwt_identity

def index():
    try:
        produk = Produk.query.all()

        if not produk:
            return response.badRequest("", "Tidak ada data")

        result = []
        for p in produk:
            result.append({
                'id' : p.id,
                'nama' : p.nama,
                'harga' : p.harga,
                'keterangan' : p.keterangan,
                'user_id' : p.user_id
            })
        return response.succes(result, "sukses")

    except Exception as e:
        print(e)

def get_produk(id):
    try:
        produk = Produk.query.filter_by(id=id).first()

        if not produk:
            return response.badRequest("", "Produk tidak ditemukan")

        result = {
            'id' : produk.id,
            'nama' : produk.nama,
            'harga' : produk.harga,
            'keterangan' : produk.keterangan,
            'user_id' : produk.user_id
        }
        return response.succes(result, "sukses")

    except Exception as e:
        print(e)

def create():
    try:
        data = request.get_json()

        current_user = get_jwt_identity()

        new_produk = Produk(nama=data['nama'], harga=data['harga'], keterangan=data['keterangan'], user_id=current_user['id'])
        db.session.add(new_produk)
        db.session.commit()

        return response.succes("", "Produk berhasil ditambah")
    except Exception as e:
        print(e)

def update(id):
    try:
        produk = Produk.query.filter_by(id=id).first()

        if not produk:
            return response.badRequest("", "Produk tidak ditemukan")

        current_user = get_jwt_identity()

        data = request.get_json()
        produk.nama=data['nama']
        produk.harga=data['harga']
        produk.keterangan=data['keterangan']
        produk.user_id=current_user['id']
        
        db.session.commit()

        return response.succes("", "Data berhasil diupdate")
    except Exception as e:
        print(e)

def delete(id):
    try:
        produk = Produk.query.filter_by(id=id).first()

        if not produk:
            return response.badRequest("", "Produk tidak ditemukan")

        db.session.delete(produk)
        db.session.commit()

        return response.succes("", "Produk berhasil dihapus")
    except Exception as e:
        print(e)