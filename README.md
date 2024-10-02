# Vitruve Athlete Performance API

An API for managing athlete data and their performance metrics, built with Node.js, TypeScript, PostgreSQL, and Redis. It follows Domain-Driven Design (DDD) and SOLID principles for a clean and scalable architecture.

## Features

- **CRUD operations** for managing athletes and their performance metrics.
- **Aggregate metrics** (average, max, min, standard deviation) for athletes.
- **Leaderboard** of athletes ranked by the highest average value for a specific metric type.
- **Redis caching** for repeated queries of athlete performance metrics.
- **Prisma ORM** for database management with PostgreSQL.
- **JWT-based authentication** for secure access.
- **Input validation** with `class-validator` and `express-validator`.
- **Test coverage** with Jest for unit and integration tests.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (>= 18.x)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [PostgreSQL](https://www.postgresql.org/) (if not using Docker)
- Redis (optional, for caching)

### Environment Variables

The following environment variables need to be defined in `.env.local` for local development, and in `.env.prod` for production.

```bash
# PostgreSQL settings
POSTGRES_DB=vitruve_db
POSTGRES_USER=athlete_user
POSTGRES_PASSWORD=athlete_password
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

# Prisma Database URL
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}

# Redis
REDIS_URL=redis://localhost:6379

# Server settings
PORT=3001
NODE_ENV=dev

# JWT Secret
JWT_SECRET=your_jwt_secret_key
```
## Instalation

### Clone repository 
```
git clone https://github.com/METAWISER/vitruve-athlete-performance-api.git
cd vitruve-athlete-performance-api

```

### Install Dependencies
```npm i```

## Run the Aplication
There are two ways to run the application: using Docker or directly on your local machine.

### Option 1: Using Docker (Recommended)

####From DockerHub
1. Ensure that Docker and Docker Compose are installed on your machine.

2. Pull the Docker Image:
```docker pull metawiser/vitruve-athlete-performance-api```

3. Run the Docker Container:
```docker run -d -p 3001:3001 metawiser/vitruve-athlete-performance-api```

####From Repository
- Run the application:
```docker-compose up --build```

4. After starting the containers, you need to apply the migrations to the database to ensure it is synchronized with the schema defined in the code. Run the following command:
```docker-compose exec app npx prisma migrate dev --schema=src/shared/infrastructure/persistense/prisma/schema.prisma```

This will spin up PostgreSQL, Redis, and the API server in Docker containers.

### Option 2: Running Locally

1. Create the PostgreSQL database:

```psql -U ${POSTGRES_USER} -h ${POSTGRES_HOST} -c "CREATE DATABASE ${POSTGRES_DB};"```

2. Run Prisma migrations:

```npx prisma:migrate```

3. Start the server:

```npm run dev```

The API should be available at ```http://localhost:3001```


## API Documentation
### Endpoints
The API includes the following main endpoints:

Athletes

* POST /athletes: Create a new athlete.

* GET /athletes/{id}: Get details and performance metrics for a specific athlete.

* PUT /athletes/{id}: Update an athlete's information.

* DELETE /athletes/{id}: Delete an athlete and all their related performance metrics.

* GET /athletes/{id}/metrics: Retrieve the performance metrics for a specific athlete with optional filters.

* GET /athletes/{id}/metrics/aggregate: Get aggregate statistics (average, max, min) for a specific metric type.

Metrics

* POST /athletes/{id}/metrics: Add a new performance metric for an athlete.

* GET /metrics/leaderboard: Retrieve a leaderboard of athletes ranked by the highest average value for a specified metric type.

## Testing
Unit and integration tests are included and can be run using Jest.

- Run all tests
```npm test```
- Run tests with coverage
```npm run test:coverage```


## Architecture
This project is structured following the principles of Domain-Driven Design (DDD) and SOLID principles, organized into distinct modules:

- Domain Layer: Contains the business logic and core domain entities like Athlete and Metrics.
- Application Layer: Contains services that implement the use cases of the application.
- Infrastructure Layer: Contains the implementations for external systems like the database (PostgreSQL) and caching (Redis).
- API Layer: Contains the HTTP interface using the hono web framework, including route definitions and controllers.

## Stack

- Node.js: Runtime environment
- TypeScript: Static typing
- Prisma: ORM for database access
- Redis: In-memory cache for fast access to repeated queries
- Jest: Testing framework
- Docker: Containerization of the API and services
- Hono: Fast web framework for the API
- PostgreSQL: Relational database for storing athletes and metrics

## Example Requests

#### Create a New Athlete
```
curl -X POST http://localhost:3001/api/v1/athletes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "age": 25,
    "email": "john.doe@example.com",
    "password": "password123",
    "team": "Team A"
  }'
```

#### Get an Athlete’s Performance Metrics
```curl -X GET http://localhost:3001/api/v1/athletes/{id}/metrics```


## Author
Carlos Z - @metawiser
