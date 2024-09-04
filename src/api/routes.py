"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/signup', methods=['POST'])
def signup():
    try:
        body = request.get_json()
        if not body.get("email") or not body.get("password"):
            return jsonify({"msg": "Email and password are required"}),400
        
        new_user = User(email=body['email'],password=body['password'], is_active=True)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"msg": "User created successfully"}), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': "An unexpected error occurred", "error":str(e)}), 500
    
@api.route('/login', methods=['POST'])
def login():
    try:
        body=request.get_json()
        user=User.query.filter_by(email=body.get('email')).first()

        if not user or not user.password == body.get('password'):
            return jsonify({"msg":"Invalid email or password"}), 401
        
        token=user.create_token()

        return jsonify({"token": token}), 200
    
    except Exception as e:
        return jsonify({'msg': "An unexpected error occurred", "error":str(e)}), 500