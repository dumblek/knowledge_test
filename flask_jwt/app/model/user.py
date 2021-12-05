from operator import index
from re import T
from app import db
from datetime import datetime
import enum

class GenderType(enum.Enum):
    L = "Laki-Laki"
    P = "Perempuan"

    def __repr__(self):
        return '<GenderType {}>'.format(self.P)

class User(db.Model):
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    nama = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(50), index=True, unique=True, nullable=False)
    gender = db.Column(db.Enum(GenderType))
    password = db.Column(db.String(250), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return '<User {}>'.format(self.nama)