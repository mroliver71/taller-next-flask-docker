from app.db import get_connection

def get_all_tasks(search=None):
    conn = get_connection()
    cursor = conn.cursor()
    if search:
        cursor.execute(
            """
            SELECT id, title, description, status
            FROM tasks
            WHERE title ILIKE %s OR description ILIKE %s
            ORDER BY id
            """,
            (f"%{search}%", f"%{search}%")
        )
    else:
        cursor.execute("""
            SELECT id, title, description, status
            FROM tasks
            ORDER BY id
        """)
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return [
        {"id": row[0], "title": row[1], "description": row[2], "status": row[3]}
        for row in rows
    ]

def create_task(data):
    title = data.get("title")
    description = data.get("description")
    status = data.get("status", "PENDIENTE")
    
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        """
        INSERT INTO tasks (title, description, status)
        VALUES (%s, %s, %s)
        RETURNING id
        """,
        (title, description, status)
    )
    task_id = cursor.fetchone()[0]
    conn.commit()
    cursor.close()
    conn.close()
    
    return {
        "id": task_id,
        "message": "Tarea registrada correctamente"
    }

def get_task_by_id(task_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT id, title, description, status FROM tasks WHERE id = %s",
        (task_id,)
    )
    row = cursor.fetchone()
    cursor.close()
    conn.close()
    if row is None:
        return None
    return {"id": row[0], "title": row[1], "description": row[2], "status": row[3]}

def update_task_status(task_id, data):
    status = data.get("status")
    if not status:
        return None

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        """
        UPDATE tasks
        SET status = %s
        WHERE id = %s
        RETURNING id
        """,
        (status, task_id)
    )
    updated = cursor.fetchone()
    conn.commit()
    cursor.close()
    conn.close()

    if updated is None:
        return None

    return {"id": task_id, "message": "Estado actualizado correctamente"}


def delete_task(task_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "DELETE FROM tasks WHERE id = %s RETURNING id",
        (task_id,)
    )
    deleted = cursor.fetchone()
    conn.commit()
    cursor.close()
    conn.close()

    if deleted is None:
        return None

    return {"id": task_id, "message": "Tarea eliminada correctamente"}