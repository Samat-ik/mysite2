from flask_login import UserMixin
from extensions import db
from datetime import datetime

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)

    username = db.Column(db.String(100), unique=True, nullable=False)

    email = db.Column(db.String(150), unique=True, nullable=True)
    phone_number = db.Column(db.String(20), unique=True, nullable=True)

    password = db.Column(db.String(200), nullable=False)
    otp_secret = db.Column(db.String(64), nullable=False)

    avatar = db.Column(db.String(200))
    postal_code = db.Column(db.String(20))

    cameras = db.relationship('Camera', backref='owner', lazy=True)
    postal_stats = db.relationship('PostalStats', backref='user', lazy=True)
    statistics_entries = db.relationship('StatisticsEntry', backref='user', lazy=True)


class Camera(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(500))
    stream_url = db.Column(db.String(500))
    type = db.Column(db.String(100), default="Общая")
    status = db.Column(db.String(20), default="active")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)


class PostalStats(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(100))
    print2card = db.Column(db.Integer)
    storage_14_31 = db.Column(db.Integer)
    storage_over_31 = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)


class StatisticsEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(100))
    print2card = db.Column(db.Integer)
    storage_14_31 = db.Column(db.Integer)
    storage_over_31 = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
