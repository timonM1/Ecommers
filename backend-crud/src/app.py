from flask import Flask, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from api.product import product_blueprint
from api.category import categories_blueprint
from api.client import client_blueprint
from api.order import order_blueprint
from capaPersistencia.mongo_connection import set_mongo

app = Flask(__name__)

app.config['MONGO_URI'] = 'mongodb+srv://diomedesmg:soyleyenda1@cluster0.08iuc.mongodb.net/e-commers?retryWrites=true&w=majority'
mongo = PyMongo(app)
CORS(app)
set_mongo(app)

app.register_blueprint(product_blueprint)
app.register_blueprint(categories_blueprint)
app.register_blueprint(client_blueprint)
app.register_blueprint(order_blueprint)


@app.route('/')
def home():
    return jsonify({"message": "Bienvenido a la API"})

if __name__ == '__main__':
    app.run(debug = True)