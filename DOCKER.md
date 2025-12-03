# Docker Setup Guide for Cortin

This guide explains how to run Cortin using Docker with an included MongoDB database.

## Quick Start with Docker Compose (Recommended)

This is the easiest way to run the entire stack including MongoDB:

### 1. Build and Start All Services

```bash
docker-compose up --build
```

This will:
- Start a MongoDB container
- Build the Cortin application
- Start the application server
- Connect everything together

The application will be available at: **http://localhost:8080**

### 2. Run in Background (Detached Mode)

```bash
docker-compose up -d --build
```

### 3. View Logs

```bash
# All services
docker-compose logs -f

# Just the app
docker-compose logs -f app

# Just MongoDB
docker-compose logs -f mongodb
```

### 4. Stop All Services

```bash
docker-compose down
```

### 5. Stop and Remove All Data (Fresh Start)

```bash
docker-compose down -v
```

## Using MongoDB Atlas Instead of Local MongoDB

If you want to use MongoDB Atlas (cloud) instead of the local MongoDB container:

1. Create a `.env` file in the project root:

```bash
DB_USERNAME=your_atlas_username
PASSWORD=your_atlas_password
DB=your_database_name
CLUSTER_NAME=your_cluster_name
SUBDOMAIN=your_subdomain
```

2. Update [docker-compose.yml](docker-compose.yml) to remove the MongoDB service dependency:

```yaml
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: cortin-app
    restart: unless-stopped
    ports:
      - "8080:8080"
    env_file:
      - .env
    # Remove the depends_on and MONGODB_URI sections
```

## Standalone Docker (Without Docker Compose)

If you prefer to use Docker without docker-compose:

### 1. Build the Image

```bash
docker build -t cortin:latest .
```

### 2. Run with External MongoDB

You'll need to provide MongoDB connection details:

```bash
docker run -p 8080:8080 \
  -e DB_USERNAME=your_username \
  -e PASSWORD=your_password \
  -e DB=your_database \
  -e CLUSTER_NAME=your_cluster \
  -e SUBDOMAIN=your_subdomain \
  cortin:latest
```

## Troubleshooting

### Frontend Build Fails

If you see webpack-cli errors, the updated Dockerfile should handle this by installing dev dependencies during build.

### MongoDB Connection Issues

**For docker-compose setup:**
- Ensure MongoDB container is healthy: `docker-compose ps`
- Check MongoDB logs: `docker-compose logs mongodb`
- The app waits for MongoDB to be ready before starting

**For Atlas setup:**
- Verify your connection credentials in `.env`
- Check your Atlas cluster allows connections from your IP
- Ensure your Atlas user has proper permissions

### Port Already in Use

If port 8080 is already in use:

```bash
# Change the port mapping in docker-compose.yml
ports:
  - "3000:8080"  # Use port 3000 instead
```

### Clean Rebuild

If you need a completely fresh build:

```bash
# Remove all containers, volumes, and images
docker-compose down -v
docker system prune -a

# Rebuild from scratch
docker-compose up --build
```

## Development vs Production

The current setup is configured for production. For development with hot-reload:

1. Use local development instead: `yarn dev`
2. Or modify docker-compose to mount volumes for live code updates

## MongoDB Data Persistence

MongoDB data is stored in a Docker volume named `mongodb_data`. This persists between container restarts unless you explicitly remove it with `docker-compose down -v`.

## Environment Variables

Available environment variables:

| Variable | Description | Default (docker-compose) |
|----------|-------------|-------------------------|
| `DB_USERNAME` | MongoDB username | `admin` |
| `PASSWORD` | MongoDB password | `adminpassword` |
| `DB` | Database name | `cortin` |
| `CLUSTER_NAME` | Cluster name (Atlas) or host (local) | `mongodb` |
| `SUBDOMAIN` | Subdomain (Atlas) or connection string | `localhost` |
| `MONGODB_URI` | Full MongoDB connection string (overrides above) | `mongodb://admin:adminpassword@mongodb:27017/cortin?authSource=admin` |
| `PORT` | Application port | `8080` |
| `NODE_ENV` | Node environment | `production` |

## Security Notes

**Important**: The default MongoDB credentials (`admin`/`adminpassword`) are for local development only.

For production:
1. Use strong passwords
2. Use MongoDB Atlas or secure your MongoDB instance
3. Never commit `.env` files with real credentials
4. Consider using Docker secrets for sensitive data
