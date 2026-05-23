# lead-management-client

React + Vite frontend for the Lead Management System.

## Tech Stack

- **React 18** + **Vite** — UI framework & build tool
- **React Router v6** — Client-side routing
- **Axios** — HTTP client with JWT interceptor
- **DM Sans + DM Serif Display** — Typography (Google Fonts)
- Custom CSS with CSS Variables design system (no UI library)

## Pages

| Route               | Access  | Description                          |
|--------------------|---------|--------------------------------------|
| `/`                | Public  | Lead submission form                 |
| `/thank-you`       | Public  | Confirmation page after submission   |
| `/admin/login`     | Public  | Admin login (redirects if logged in) |
| `/admin/dashboard` | Private | Dashboard with stats + leads table   |

## Prerequisites

- Node.js v18+
- Backend server running at `http://localhost:5000`

## Setup & Run

```bash
# 1. Clone the repo
git clone https://github.com/your-username/lead-management-client.git
cd lead-management-client

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

App runs at: `http://localhost:5173`

The Vite dev server proxies `/api/*` to `http://localhost:5000` automatically.

## Build for Production

```bash
npm run build
# Output goes to /dist
```

## Features

- **Lead Form** — Validated form (name, email, phone, source). One submission per browser via localStorage.
- **Thank You Page** — Shown after successful submission.
- **Admin Login** — Email/password login with JWT stored in localStorage. Auto-redirects on 401.
- **Dashboard Overview** — Stat cards (total leads, today's leads, by source), source breakdown bar chart, recent leads list.
- **All Leads Table** — Searchable, filterable by source, sortable by date. Delete with confirmation.
- **Responsive** — Mobile-friendly layout with collapsible sidebar.

## Assumptions

- "One submission per browser" is enforced via a `leadSubmitted` flag in `localStorage`. Clearing browser data allows resubmission.
- Admin token stored in `localStorage`; expires per the server's `JWT_EXPIRES_IN` setting.
- All API calls are proxied through Vite dev server in development. For production, set `VITE_API_URL` and update the axios base URL.
