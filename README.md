# Auth App (React + FastAPI)

Email/password authentication with JWT tokens.

## Project structure

```
backend/     FastAPI API (uses ../env venv)
frontend/    React + Vite UI
env/         Python virtual environment
```

## Backend setup

From the project root:

```powershell
# Activate the existing venv
.\env\Scripts\Activate.ps1

# Install dependencies
pip install -r backend\requirements.txt

# Optional: copy and edit secrets
copy backend\.env.example backend\.env

# Run API (from backend folder)
cd backend
uvicorn app.main:app --reload --port 8000
```

API docs: http://localhost:8000/docs

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/register` | Create account (JSON: email, password) |
| POST | `/api/auth/login` | Login (form: username=email, password) → JWT |
| GET | `/api/auth/me` | Current user (Bearer token) |
| GET | `/api/health` | Health check |

## Frontend setup

In a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

The Vite dev server proxies `/api` to the backend on port 8000.

## Auth flow

1. **Register** — user signs up; password is hashed with bcrypt; account is stored in SQLite.
2. **Login** — credentials are verified; API returns a JWT access token.
3. **Protected routes** — frontend stores the token in `localStorage` and sends `Authorization: Bearer <token>` to `/api/auth/me`.
4. **Logout** — token is removed from `localStorage`.
