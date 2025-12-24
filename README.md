# Student Information Management System (SIMS)

A comprehensive Student Information Management System built with React, Laravel, and MySQL.

## Project Overview

SIMS is a modern web application that allows students to:
- **Secure Login**: Authentication using Laravel Sanctum.
- **Dashboard**: Quick overview of academic status.
- **Profile Management**: View details and update contact information.
- **Course Management**: View enrolled courses and credit hours.
- **Grade Checking**: View color-coded grades for completed courses.

## Tech Stack

- **Frontend**: React 18, Vite, Vanilla CSS (Premium Dark Theme)
- **Backend**: Laravel 10, Sanctum (Auth)
- **Database**: MySQL

## Project Structure

```
sims-scm-project/
├── src/
│   ├── frontend/          # React application (Pages, Components, API)
│   ├── backend/           # Laravel API (Controllers, Models, Auth)
│   └── database/          # MySQL schema
├── docs/                  # User Guide and Architecture
└── releases/              # Release notes
```

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- PHP (v8.1+)
- Composer
- MySQL (v8.0+)

### 1. Database Setup
1. Create the database and import the schema:
   ```bash
   mysql -u root -p
   create database sims_db;
   use sims_db;
   source src/database/sims-schema.sql;
   exit
   ```
   *Note: The schema now includes a `grade` column in `enrollments` table.*

### 2. Backend Setup
1. Navigate to backend:
   ```bash
   cd src/backend
   ```
2. Install dependencies:
   ```bash
   composer install
   ```
3. Setup Environment:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   *Update `.env` with your DB credentials.*
4. Run Migrations (for Sanctum):
   ```bash
   php artisan migrate
   ```
5. Start Server:
   ```bash
   php artisan serve
   ```

### 3. Frontend Setup
1. Navigate to frontend:
   ```bash
   cd src/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start Dev Server:
   ```bash
   npm run dev
   ```

## Testing credentials
- **Student ID**: `ETS0456/13`
- **Password**: `password123`

## Documentation
- [User Guide](docs/User-Guide.md)
