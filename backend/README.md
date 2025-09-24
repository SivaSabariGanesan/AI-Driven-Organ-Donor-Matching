# Backend (Express + MongoDB)

## Setup

1. Copy `.env.example` to `.env` and fill values:

```
MONGODB_URI=mongodb://localhost:27017/organ_donation
JWT_SECRET=change-this
PORT=4000
```

2. Install dependencies and run dev server:

```
npm install
npm run dev
```

## API Endpoints

- POST `/api/auth/register` { name, email, password }
- POST `/api/auth/login` { email, password } -> { token }
- GET `/api/organs` list available organs
- GET `/api/organs/mine` (Bearer token) organs donated by me
- POST `/api/organs` (Bearer token) { type, bloodGroup }
- POST `/api/requests` (Bearer token) { organId, notes }
- GET `/api/requests/mine` (Bearer token)
- PATCH `/api/requests/:id/status` (Bearer token) { status }


