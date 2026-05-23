# lead-management-server

Express + MongoDB backend API for the Lead Management System.

## Tech Stack

- **Node.js** + **Express** — REST API
- **MongoDB** + **Mongoose** — Database & ODM
- **bcryptjs** — Password hashing
- **jsonwebtoken** — JWT-based authentication
- **dotenv** — Environment variable management

## Prerequisites

- Node.js v18+
- MongoDB running locally or a MongoDB Atlas URI

## Setup & Run

```bash
# 1. Clone the repo
git clone https://github.com/your-username/lead-management-server.git
cd lead-management-server

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env
# Edit .env with your values:
#   MONGO_URI=mongodb://localhost:27017/lead-management
#   JWT_SECRET=your_super_secret_key
#   JWT_EXPIRES_IN=7d
#   PORT=5000

# 4. Seed default admin
npm run seed
# Creates: admin@leads.com / Admin@123

# 5. Start the server
npm run dev      # development (nodemon)
npm start        # production
```

Server runs at: `http://localhost:5000`

## API Endpoints

### Auth
| Method | Endpoint         | Access  | Description              |
|--------|-----------------|---------|--------------------------|
| POST   | /api/auth/login | Public  | Admin login → JWT token  |
| GET    | /api/auth/me    | Private | Get current admin info   |

### Leads
| Method | Endpoint        | Access  | Description              |
|--------|----------------|---------|--------------------------|
| POST   | /api/leads      | Public  | Submit a new lead        |
| GET    | /api/leads      | Private | Fetch all leads + stats  |
| DELETE | /api/leads/:id  | Private | Delete a lead            |

### GET /api/leads query params
- `search` — filter by name, email, or phone
- `source` — filter by source (Website, Facebook, Google, Referral)
- `sort` — `newest` (default) or `oldest`

## Assumptions

- Only one admin account is supported by design — created via the seed script.
- No self-registration route is exposed to prevent unauthorized admin creation.
- Lead submission is public (no auth required) — one submission per browser (enforced client-side via localStorage).
- Phone validation allows only 10-digit numbers (Indian standard).
