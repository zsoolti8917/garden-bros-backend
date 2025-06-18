# Docker Deployment Guide for Garden Bros Backend

## Problem: Lost Media Files on Container Restart

When using Docker containers, uploaded media files (images) are stored inside the container's filesystem. When the container restarts, these files are lost because containers are ephemeral by nature.

## Solution: Persistent Volumes

We've implemented persistent volumes to ensure uploaded media files survive container restarts.

## Quick Start

### 1. Development with Docker Compose

```bash
# Copy environment file
cp .env.example .env

# Edit .env with your configuration
nano .env

# Start development environment
docker-compose up -d

# View logs
docker-compose logs -f strapi
```

### 2. Production with Docker Compose

```bash
# Copy environment file
cp .env.example .env

# Edit .env with production values
nano .env

# Start production environment
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f strapi
```

## Manual Docker Commands

### Development
```bash
# Build image
docker build -f Dockerfile -t garden-bros-dev .

# Run with volume mount
docker run -d \
  --name garden-bros-backend \
  -p 1337:1337 \
  -v garden-bros-uploads:/opt/app/public/uploads \
  --env-file .env \
  garden-bros-dev
```

### Production
```bash
# Build production image
docker build -f Dockerfile.prod -t garden-bros-prod .

# Run with volume mount
docker run -d \
  --name garden-bros-backend-prod \
  -p 1337:1337 \
  -v garden-bros-uploads:/opt/app/public/uploads \
  --env-file .env \
  garden-bros-prod
```

## Volume Management

### List volumes
```bash
docker volume ls
```

### Inspect volume
```bash
docker volume inspect garden-bros_uploads
```

### Backup uploads
```bash
# Create backup
docker run --rm \
  -v garden-bros_uploads:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/uploads-backup.tar.gz -C /data .

# Restore backup
docker run --rm \
  -v garden-bros_uploads:/data \
  -v $(pwd):/backup \
  alpine tar xzf /backup/uploads-backup.tar.gz -C /data
```

## Dokku Deployment with Persistent Storage

### 1. Create Dokku app
```bash
dokku apps:create garden-bros-backend
```

### 2. Create persistent storage
```bash
# Create storage directory
dokku storage:ensure-directory garden-bros-backend

# Mount uploads directory
dokku storage:mount garden-bros-backend /var/lib/dokku/data/storage/garden-bros-backend/uploads:/opt/app/public/uploads
```

### 3. Setup database
```bash
dokku postgres:create garden-bros-db
dokku postgres:link garden-bros-db garden-bros-backend
```

### 4. Configure environment
```bash
dokku config:set garden-bros-backend \
  APP_KEYS="key1,key2,key3,key4" \
  API_TOKEN_SALT=your-salt \
  ADMIN_JWT_SECRET=your-secret \
  TRANSFER_TOKEN_SALT=your-transfer-salt \
  JWT_SECRET=your-jwt-secret
```

### 5. Deploy
```bash
git remote add dokku dokku@your-server:garden-bros-backend
git push dokku main
```

## Troubleshooting

### Check if volumes are mounted
```bash
docker exec -it garden-bros-backend ls -la /opt/app/public/uploads
```

### Check volume contents
```bash
docker run --rm -v garden-bros_uploads:/data alpine ls -la /data
```

### Restart containers
```bash
# Development
docker-compose restart

# Production
docker-compose -f docker-compose.prod.yml restart
```

### Clean up (WARNING: This will delete all data)
```bash
# Stop and remove containers
docker-compose down

# Remove volumes (THIS DELETES ALL DATA)
docker-compose down -v

# Remove images
docker rmi garden-bros-backend garden-bros-backend-prod
```

## File Permissions

If you encounter permission issues:

```bash
# Fix ownership in container
docker exec -it garden-bros-backend chown -R node:node /opt/app/public/uploads

# Or rebuild with correct permissions
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```