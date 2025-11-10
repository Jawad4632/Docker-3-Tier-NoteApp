

# Note App - Spring Boot Backend

A Spring Boot application for managing notes with PostgreSQL database integration.

## Prerequisites

- Docker installed on your system
- Java 17 (for local development)
- Gradle (for local development)

## Development

To run locally without Docker:

```
# Create .env.properties file with your local database credentials
POSTGRES_URL=jdbc:postgresql://localhost:5432/<DB_NAME>
POSTGRES_USER=<username>
POSTGRES_PASSWORD=<password>

# Then run:

./gradlew bootRun
```

```
# to run with your configuration
java -Dspring.datasource.url=jdbc:postgresql://localhost:5432/<db_name> -Dspring.datasource.username=<user-name> -Dspring.datasource.password=<password> -jar NoteApp.jar
```
# Docker Setup
## Build Information

- **Base Image:** eclipse-temurin:17-jdk-alpine
- **Build Tool:** Gradle
- **Spring Boot Version:** (as per your build.gradle)
- **Database:** PostgreSQL


## Quick Start

### Option 1: Run with Local PostgreSQL

If you have PostgreSQL already running on your host machine:

# Build the Docker image
```
docker build -t note-app:latest .
```
# Run the container
```
docker run -p 8080:8080 \
-e POSTGRES_URL=jdbc:postgresql://host.docker.internal:5432/mydb \
-e POSTGRES_USER=myuser \
-e POSTGRES_PASSWORD=mypassword \
note-app:latest

```

**Note:** `host.docker.internal` allows the container to connect to services running on your host machine.

### Option 2: Run with Containerized PostgreSQL (Same Network)

If you want to run both PostgreSQL and the application in Docker containers:

docker -p <HOST_PORT>:<CONTAINER_PORT>

#### Step 1: Create a Docker Network

```

docker network create note-network

```

#### Step 2: Run PostgreSQL Container

```

docker run -d \
--name postgres-db \
--network note-network \
-e POSTGRES_DB=mydb \
-e POSTGRES_USER=myuser \
-e POSTGRES_PASSWORD=mypassword \
-p 90:5432 \
postgres:15-alpine

```

#### Step 3: Build and Run Note App

```


# Build the image

docker build -t note-app:latest .

# Run the application

docker run -p 8080:8080 \
--name note-app \
--network note-network \
-e POSTGRES_URL=jdbc:postgresql://postgres-db/mydb \
-e POSTGRES_USER=myuser \
-e POSTGRES_PASSWORD=mypassword \
note-app:latest

```

**Note:** Use the container name `postgres-db` as the hostname when both containers are on the same network.

### Option 3: Using Docker Compose (Recommended)

Create a `docker-compose.yml` file in your project root:

```

version: '3.8'

services:
postgres:
image: postgres:15-alpine
container_name: postgres-db
environment:
POSTGRES_DB: mydb
POSTGRES_USER: myuser
POSTGRES_PASSWORD: mypassword
ports:
- "5432:5432"
  volumes:
- postgres-data:/var/lib/postgresql/data
  networks:
- note-network

backend:
build: .
container_name: note-app
ports:
- "8080:8080"
  environment:
  POSTGRES_URL: jdbc:postgresql://postgres-db/mydb
  POSTGRES_USER: myuser
  POSTGRES_PASSWORD: mypassword
  depends_on:
- postgres
  networks:
- note-network

volumes:
postgres-data:

networks:
note-network:

```

Then run:

```


# Start all services

docker-compose up --build

# Run in detached mode

docker-compose up -d --build

# Stop all services

docker-compose down

# Stop and remove volumes

docker-compose down -v

```

### Option 4: Using Environment File

Create a `.env.properties` file:

```

POSTGRES_URL=jdbc:postgresql://postgres-db:5432/mydb
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword

```

Run with:

```

docker run -p 8080:8080 --env-file .env.properties note-app:latest

```

## Configuration

The application uses the following environment variables:

- `POSTGRES_URL` - PostgreSQL connection URL
- `POSTGRES_USER` - Database username
- `POSTGRES_PASSWORD` - Database password

These are configured in `application.properties`:

```

spring.config.import=optional:file:.env.properties

spring.datasource.url=${POSTGRES_URL}
spring.datasource.username=${POSTGRES_USER}
spring.datasource.password=\${POSTGRES_PASSWORD}
spring.datasource.driver-class-name=org.postgresql.Driver

spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false

```
## Stopping the Application

### For docker run:
```


# Find container ID

docker ps

# Stop container

docker stop <container-id>

# Remove container

docker rm <container-id>

```

### For Docker Compose:
```

docker-compose down

```

## Troubleshooting

### Cannot connect to database

- Verify PostgreSQL is running: `docker ps`
- Check network connectivity between containers
- Ensure correct database credentials
- For host.docker.internal, ensure PostgreSQL accepts external connections

### View application logs

```
# For docker run

docker logs <container-id>

# For Docker Compose

docker-compose logs backend

```