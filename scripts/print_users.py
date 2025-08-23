from app import app
from extensions import db
from models import User

def list_users():
    with app.app_context():
        users = User.query.all()
        print("Қолданушылар тізімі:")
        if not users:
            print("Базада ешқандай қолданушы жоқ.")
        else:
            for u in users:
                print(f"ID: {u.id}, Username: {u.username}, Email: {u.email}")

def add_user(username, email, password):
    with app.app_context():
        user = User(username=username, email=email, password=password)
        db.session.add(user)
        db.session.commit()
        print("Қолданушы сәтті қосылды!")

# Негізгі функция
if __name__ == "__main__":
    # Мұнда True болса — қосу, False болса — тек шығару
    do_add_user = true

    if do_add_user:
        add_user("admin", "admin@example.com", "1234")
    else:
        list_users()





from app import app
from extensions import db
from models import User

with app.app_context():
    users = User.query.all()
    for user in users:
        print(f"ID: {user.id}, Username: {user.username}, Email: {user.email}, Password: {user.password}")
