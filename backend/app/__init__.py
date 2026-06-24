from flask import Flask
from flask_cors import CORS
from app.routes.task_routes import task_bp

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(task_bp)
    return app