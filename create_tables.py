from app import app, db
from models import User, Camera, PostalStats, StatisticsEntry

def create_tables():
    with app.app_context():
        # Барлық кестелерді өшіру (егер бар болса)
        db.drop_all()
        
        # Жаңа кестелерді жасау
        db.create_all()
        
        print("✅ Кестелер сәтті жасалды!")
        print("📋 Жасалған кестелер:")
        print("   - User (пайдаланушылар) - email/телефон міндетті")
        print("   - Camera (камералар)")
        print("   - PostalStats (пошта статистикасы)")
        print("   - StatisticsEntry (статистика деректері)")
        
        # Кестелерді тексеру
        tables = db.engine.table_names()
        print(f"\n📊 Базадағы кестелер: {tables}")

if __name__ == "__main__":
    create_tables() 