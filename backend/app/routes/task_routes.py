# backend/app/routes/task_routes.py
from flask import Blueprint, jsonify, request
from app.services.task_service import get_all_tasks, create_task, update_task_status, delete_task

task_bp = Blueprint("task_bp", __name__)

@task_bp.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Backend Flask funcionando correctamente"
    })

@task_bp.route("/tasks", methods=["GET"])
def list_tasks():
    search = request.args.get("q")
    tasks = get_all_tasks(search)
    return jsonify(tasks)

@task_bp.route("/tasks", methods=["POST"])
def register_task():
    data = request.get_json()
    if not data or not data.get("title"):
        return jsonify({
            "error": "El campo title es obligatorio"
        }), 400
    
    result = create_task(data)
    return jsonify(result), 201

@task_bp.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    data = request.get_json()
    if not data or not data.get("status"):
        return jsonify({"error": "El campo status es obligatorio"}), 400

    result = update_task_status(task_id, data)
    if result is None:
        return jsonify({"error": "Tarea no encontrada"}), 404

    return jsonify(result), 200

@task_bp.route("/tasks/<int:task_id>", methods=["DELETE"])
def remove_task(task_id):
    result = delete_task(task_id)
    if result is None:
        return jsonify({"error": "Tarea no encontrada"}), 404

    return jsonify(result), 200