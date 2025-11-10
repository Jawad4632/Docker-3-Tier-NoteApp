
# Note App - Full Stack Application

A full-stack note-taking application with React frontend, Spring Boot backend, and PostgreSQL database, fully containerized with Docker.

<img width="811" height="388" alt="Screenshot 2025-11-10 141058" src="https://github.com/user-attachments/assets/da8b1d53-0700-4581-82e4-c4f655316828" />

##  Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 1.29 or higher)

##  Architecture

This application consists of three services:

- **Frontend**: React + Vite application (accessible at `http://localhost:5173`)
- **Backend**: Spring Boot REST API (accessible at `http://localhost:8080`)
- **Database**: PostgreSQL 15 (accessible at `localhost:90`)

All services run in isolated Docker containers and communicate through a custom Docker network (`note-network`).

##  Project Structure

```
project-root/
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
├── backend/
│   ├── Dockerfile
│   ├── build.gradle
│   └── src/
└── README.md

```

##  Quick Start

### Start All Services

```
# Build and start all containers

docker-compose up --build

# Or run in detached mode (background)

docker-compose up -d --build

```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080
- **PostgreSQL**: localhost:90 (port 5432 inside container)

### Stop All Services

```

# Stop and remove containers

docker-compose down

# Stop and remove containers + volumes (deletes all data)

docker-compose down -v

```

##  Configuration

### Environment Variables

The application uses the following configuration:

**Database (PostgreSQL)**
- Database Name: `mydb`
- Username: `myuser`
- Password: `mypassword`
- Internal Port: `5432`
- External Port: `90`

**Backend (Spring Boot)**
- Port: `8080`
- Database URL: `jdbc:postgresql://database/mydb`

**Frontend (React + Vite)**
- Port: `5173` (external) / `80` (internal)
- API Base URL: `http://localhost:8080/api`

### Modifying Configuration

To change database credentials or other settings, edit the `docker-compose.yml` file:

```
environment:
POSTGRES_DB: your_database_name
POSTGRES_USER: your_username
POSTGRES_PASSWORD: your_password

```

**Important**: If you change the API URL, update the `VITE_API_BASE_URL` build argument in the frontend service:

```

frontend:
  build:
    args:
    VITE_API_BASE_URL: http://localhost:8080/api

```

## Data Persistence

Database data is persisted using Docker volumes. The `postgres-data` volume ensures your data survives container restarts:

```

volumes:
postgres-data:

```

To completely reset the database:

```

docker-compose down -v
docker-compose up --build

```

##  Development

### View Logs

```
# View all logs

docker-compose logs

# Follow logs in real-time

docker-compose logs -f

# View logs for specific service

docker-compose logs backend
docker-compose logs frontend
docker-compose logs postgres

```

### Rebuild Specific Service

```
# Rebuild and restart backend only

docker-compose up -d --build backend

# Rebuild and restart frontend only

docker-compose up -d --build frontend

```

### Access Running Containers

```
# List running containers

docker-compose ps

# Execute command in backend container

docker-compose exec backend sh

# Execute command in database container

docker-compose exec postgres psql -U myuser -d mydb

```

### Database Access

Connect to PostgreSQL from your host machine:

```
# Using psql

psql -h localhost -p 90 -U myuser -d mydb

# Or access from inside the container

docker-compose exec postgres psql -U myuser -d mydb

```
