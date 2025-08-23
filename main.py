from app import app
from flask_cors import CORS

# CORS рұқсаттарын қосу
CORS(app, origins=[
    "http://localhost:3000",
    "http://127.0.0.1:3000"
])

if __name__ == '__main__':
    app.run(debug=True)
