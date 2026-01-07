# Library Management System

A simple Library Management System (Node.js + Express) that uses JSON files for data storage (sample data under `data/`). This repository provides RESTful API endpoints to manage users, books and subscriptions. The code follows a lightweight MVC pattern (models, controllers, routes).

## Table of contents

- Features
- API routes / Endpoints
- Subscription types
- Project structure
- Prerequisites
- Quick start
- Data files
- Notes & next steps

## Features

- Create, read, update and delete users
- Create and manage books
- Track issued books and fines
- Subscription handling (3, 6, 12 months)
- Simple MVC layout: routes → controllers → models

## API routes / Endpoints

All endpoints are rooted at your server host (for example `http://localhost:3000`).

Users
- `POST /users` — Create a new user
- `GET /users` — Get list of all users
- `GET /users/{id}` — Get a user by ID
- `PUT /users/{id}` — Update a user by ID
- `DELETE /users/{id}` — Delete a user by ID. (Controller should check: user has no issued books and no outstanding fine)
- `GET /users/subscription-details/{id}` — Get subscription details for a user:
  - Date of subscription
  - Valid until
  - Any fine due

Books
- `GET /books` — Get all books
- `POST /books` — Create/add a new book
- `GET /books/{id}` — Get book by ID
- `PUT /books/{id}` — Update a book by ID
- `GET /books/issued` — Get all issued books (with fine information)

Subscription Types
- Basic — 3 months
- Standard — 6 months
- Premium — 12 months

## Project structure (high level)

- `index.js` — App entry (server bootstrap, middleware, route wiring)
- `databaseConnection.js` — (placeholder) connection logic (if migrating to MongoDB)
- `routes/` — Express route definitions (`books.js`, `users.js`)
- `controllers/` — Route handlers and business logic (`book-controller.js`, `user-controller.js`)
- `models/` — Data models / schema-like helpers (`book-model.js`, `user-model.js`)
- `dtos/` — Data transfer objects (mapping/validation helpers)
- `data/` — Sample JSON data files used by the app (`books.json`, `users.json`)

## Prerequisites

- Node.js (v14+ recommended)
- npm (comes with Node)

## Quick start (development)

1. Open a PowerShell terminal and change to the project folder:

```powershell
cd "C:\Users\Ruchi\Library Management\LibraryManagement"
```

2. Install dependencies:

```powershell
npm install
```

3. Start the server:

```powershell
node index.js
# or if package.json defines a start script:
npm start
```

4. Open `http://localhost:3000` (or your configured port) and test endpoints with Postman / curl.

Example: Get all users

```powershell
curl http://localhost:3000/users
```

Example: Create a new user (JSON body)

```powershell
curl -Method POST -ContentType 'application/json' -Body (@{
  name='Alice';
  email='alice@example.com';
  subscriptionType='Basic'
} | ConvertTo-Json) http://localhost:3000/users
```

## Data files

- `data/users.json` — sample user records
- `data/books.json` — sample book records

These JSON files are used as a simple datastore for the current demo app. When ready to move to production, replace this with a real database (MongoDB recommended) and update `databaseConnection.js`.

## Notes, validation & business rules

- When deleting a user, verify the user has no issued books and no outstanding fine.
- Subscription validity is calculated from the subscription date + subscription duration (3/6/12 months).
- Fines should be computed based on your rules (e.g., per-day overdue rate). The controllers expose an endpoint to list issued books and their fines.

## Next steps / suggestions

1. Replace JSON data files with MongoDB + Mongoose models.
2. Add request validation (Joi or express-validator) in controllers.
3. Add automated tests (Jest / Supertest) for API endpoints.
4. Build a React frontend (single-page app) that consumes these APIs and shows user/book management screens.

## Contributing

If you'd like to contribute, fork the repo and open a pull request. Keep secrets out of commits and add/update tests for any new behavior.

---

Thank you for using the Library Management System demo. If you'd like, I can:

- Add MongoDB integration and update models/controllers to persist to the database.
- Scaffold a small React frontend and wire it to these APIs.
- Add tests and a CI workflow.

Tell me which of these you'd like next.
