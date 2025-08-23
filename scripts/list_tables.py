from app import app
from extensions import db

with app.app_context():
    # Барлық таблицаларды шығару
    tables = db.engine.table_names()
    print("Базадағы таблицалар:", tables)
    # Show a "database panel" in the terminal: print each table and its columns in a readable way
    inspector = db.inspect(db.engine)
    print("\n=== DATABASE PANEL ===")
    for table in tables:
        print(f"\nТаблица: {table}")
        print("  Бағандар:")
        columns = inspector.get_columns(table)
        for col in columns:
            print(f"    - {col['name']} ({col['type']})")
    print("\n======================\n")

