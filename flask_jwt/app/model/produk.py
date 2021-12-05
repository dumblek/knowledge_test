from operator import index
from re import T
from app import db
from datetime import datetime
import enum
from app.model.user import User

class Produk(db.Model):
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    nama = db.Column(db.String(250), unique=True, nullable=False)
    harga = db.Column(db.Integer, nullable=False)
    keterangan = db.Column(db.String(250), nullable=False)
    user_id = db.Column(db.BigInteger, db.ForeignKey(User.id), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return '<User {}>'.format(self.nama)