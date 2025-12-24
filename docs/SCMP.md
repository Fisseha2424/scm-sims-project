# Software Configuration Management Plan (SCMP)

## Project Overview

The Student Information Management System (SIMS) is a web-based application designed for university students to manage their academic information. The system provides a simple interface for students to:

- Authenticate using student ID and password
- Access a dashboard with available modules
- Update personal information (e.g., phone number)
- View profile, courses, and grades

### Technology Stack

- **Frontend**: React 18 with Vite build tool
- **Backend**: Laravel 10 (PHP framework)
- **Database**: MySQL 8.0+
- **Version Control**: Git
- **Package Managers**: npm (Node.js), Composer (PHP)

## Tools Used

- **React**: Frontend framework for building user interfaces
- **Laravel**: PHP framework for backend API development
- **MySQL**: Relational database management system
- **Vite**: Fast build tool and development server for React
- **React Router**: Client-side routing for React applications
- **Axios**: HTTP client for API requests
- **Git**: Version control system
- **Composer**: PHP dependency manager
- **npm**: Node.js package manager

## Project Structure

The project follows a modular structure with clear separation between frontend, backend, and database components:

- `src/frontend/` - React application source code
- `src/backend/` - Laravel API source code
- `src/database/` - Database schema and migration files
- `tests/` - Test files for both frontend and backend
- `docs/` - Project documentation

## Configuration Management

### Branching Strategy

- `main` - Production-ready code
- `feature/frontend-setup` - Frontend development branch
- `feature/backend-setup` - Backend development branch

### Commit Conventions

- `feat(frontend):` - Frontend feature additions
- `feat(backend):` - Backend feature additions
- `chore(db):` - Database-related changes
- `docs:` - Documentation updates

