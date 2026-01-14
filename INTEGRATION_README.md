# Next.js Frontend және Flask Backend интеграциясы

## Құрылым

- **Flask Backend**: `app.py` - порт 5000
- **Next.js Frontend**: `frontend/` папкасы - порт 3000

## Орнату және іске қосу

### 1. Flask Backend-ті іске қосу

```bash
# Виртуальды ортаны активациялау (Windows)
venv\Scripts\activate

# Flask серверін іске қосу
python main.py
```

Flask сервері `http://localhost:5000` адресінде жұмыс істейді.

### 2. Next.js Frontend-ті іске қосу

```bash
# frontend папкасына өту
cd frontend

# Тәуелділіктерді орнату (егер орнатылмаған болса)
npm install

# Development серверін іске қосу
npm run dev
```

Next.js сервері `http://localhost:3000` адресінде жұмыс істейді.

## API Endpoints

Flask backend келесі API endpoint-терін қамтамасыз етеді:

- `GET /api/health` - Health check
- `POST /api/login` - Кіру
- `POST /api/verify-2fa` - 2FA тексеру
- `POST /api/register` - Тіркелу
- `POST /api/logout` - Шығу
- `GET /api/user/current` - Ағымдағы пайдаланушы
- `GET /api/cameras` - Камералар тізімі
- `POST /api/cameras` - Жаңа камера қосу
- `GET /api/cameras/:id` - Камера мәліметтері
- `GET /api/statistics` - Статистика
- `GET /api/postal-services` - Пошта қызметтері
- `GET /api/users` - Пайдаланушылар тізімі
- `GET /api/storage` - Файлдар тізімі
- `POST /api/storage/upload` - Файл жүктеу
- `GET /api/dashboard` - Dashboard мәліметтері

## Frontend API пайдалану

Frontend-те API-ны пайдалану үшін `frontend/lib/api.ts` файлындағы функцияларды қолданыңыз:

```typescript
import { api } from '@/lib/api';

// Мысал: Камералар тізімін алу
const response = await api.getCameras();
if (response.data) {
  console.log(response.data.cameras);
}
```

## CORS конфигурациясы

CORS қазірдің өзінде Flask-та қосылған және `http://localhost:3000` адресіне рұқсат берілген.

## Ескертулер

- Ескі CSS (Bootstrap, custom.css) `templates/base.html` файлынан жойылды
- Next.js frontend енді Tailwind CSS пайдаланады
- API endpoint-тер JSON форматта мәліметтерді қайтарады

