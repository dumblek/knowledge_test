from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, migrate
from flask_jwt_extended import *
from flask_cors import CORS, cross_origin


app = Flask(__name__)
app.config.from_object(Config)
cors = CORS(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

jwt = JWTManager(app)

from app.model import user, produk
from app import routes