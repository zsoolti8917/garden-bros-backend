# Complete Deployment Guide - Garden Bros Backend

## Pre-Deployment Checklist

### 1. Environment Preparation
- [ ] Server/VPS with Docker installed
- [ ] Domain name configured (if using custom domain)
- [ ] SSL certificate ready (Let's Encrypt recommended)
- [ ] Backup of existing data (if migrating)

### 2. Required Files
- [ ] `.env` file configured
- [ ] Docker images built
- [ ] Database credentials ready

## Deployment Scenarios

### Scenario A: Fresh Docker Compose Deployment

#### Step 1: Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker and Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Logout and login to apply group changes
```

#### Step 2: Project Setup
```bash
# Clone repository
git clone <your-repo-url> garden-bros-backend
cd garden-bros-backend

# Create environment file
cp .env.example .env
nano .env
```

#### Step 3: Configure Environment
```env
# .env file configuration
HOST=0.0.0.0
PORT=1337
APP_KEYS="generate-4-random-keys-here"
API_TOKEN_SALT=your-random-salt
ADMIN_JWT_SECRET=your-random-jwt-secret
TRANSFER_TOKEN_SALT=your-random-transfer-salt
JWT_SECRET=your-random-jwt-secret

# Database Configuration
DATABASE_CLIENT=postgres
DATABASE_HOST=strapiDB
DATABASE_PORT=5432
DATABASE_NAME=gardenbros
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=secure-password-here
DATABASE_SSL=false
```

#### Step 4: Deploy
```bash
# Development deployment
docker-compose up -d

# OR Production deployment
docker-compose -f docker-compose.prod.yml up -d

# Check status
docker-compose ps
docker-compose logs -f strapi
```

### Scenario B: Dokku Deployment (VPS with Dokku)

#### Step 1: Dokku App Creation
```bash
# On your Dokku server
dokku apps:create garden-bros-backend

# Create PostgreSQL database
dokku postgres:create garden-bros-db
dokku postgres:link garden-bros-db garden-bros-backend
```

#### Step 2: Configure Persistent Storage
```bash
# Create storage directory
sudo mkdir -p /var/lib/dokku/data/storage/garden-bros-backend/uploads
sudo chown -R dokku:dokku /var/lib/dokku/data/storage/garden-bros-backend

# Mount uploads directory
dokku storage:mount garden-bros-backend /var/lib/dokku/data/storage/garden-bros-backend/uploads:/opt/app/public/uploads
```

#### Step 3: Environment Configuration
```bash
# Set environment variables
dokku config:set garden-bros-backend \
  APP_KEYS="key1,key2,key3,key4" \
  API_TOKEN_SALT=your-salt \
  ADMIN_JWT_SECRET=your-secret \
  TRANSFER_TOKEN_SALT=your-transfer-salt \
  JWT_SECRET=your-jwt-secret \
  NODE_ENV=production
```

#### Step 4: Deploy
```bash
# On your local machine
git remote add dokku dokku@your-server-ip:garden-bros-backend
git push dokku main

# Check deployment
dokku logs garden-bros-backend --tail
```

#### Step 5: Domain and SSL
```bash
# Add domain
dokku domains:add garden-bros-backend your-domain.com

# Enable SSL with Let's Encrypt
dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git
dokku letsencrypt:enable garden-bros-backend
dokku letsencrypt:cron-job --add
```

### Scenario C: Existing Container Migration

#### Step 1: Backup Current Data
```bash
# Backup uploads from existing container
docker exec existing-container tar czf /tmp/uploads-backup.tar.gz -C /opt/app/public/uploads .
docker cp existing-container:/tmp/uploads-backup.tar.gz ./uploads-backup.tar.gz

# Backup database (if using PostgreSQL)
docker exec existing-db-container pg_dump -U username dbname > db-backup.sql
```

#### Step 2: Stop Existing Container
```bash
docker stop existing-container
docker rm existing-container
```

#### Step 3: Deploy New Setup
```bash
# Use Docker Compose method from Scenario A
docker-compose up -d
```

#### Step 4: Restore Data
```bash
# Wait for containers to be ready
sleep 30

# Restore uploads
docker run --rm \
  -v garden-bros_uploads:/data \
  -v $(pwd):/backup \
  alpine tar xzf /backup/uploads-backup.tar.gz -C /data

# Restore database
docker exec -i garden-bros-db-container psql -U strapi -d gardenbros < db-backup.sql
```

## Post-Deployment Steps

### 1. Verify Installation
```bash
# Check container status
docker-compose ps

# Check logs
docker-compose logs strapi

# Test API endpoint
curl http://localhost:1337/api/articles

# Access admin panel
# Navigate to http://your-domain:1337/admin
```

### 2. Create Admin User
```bash
# Access the admin panel and create your first admin user
# http://your-domain:1337/admin
```

### 3. Configure Strapi Settings
- [ ] Set up user roles and permissions
- [ ] Configure API tokens if needed
- [ ] Set up webhooks if required
- [ ] Configure email provider (optional)

### 4. Test Upload Functionality
- [ ] Upload test images through admin panel
- [ ] Restart container: `docker-compose restart strapi`
- [ ] Verify images are still accessible

## Monitoring and Maintenance

### Health Checks
```bash
# Check container health
docker-compose ps
docker stats

# Check disk usage
df -h
docker system df

# Check logs
docker-compose logs --tail=100 strapi
```

### Backup Strategy
```bash
# Create backup script
cat > backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)

# Backup uploads
docker run --rm \
  -v garden-bros_uploads:/data \
  -v $(pwd)/backups:/backup \
  alpine tar czf /backup/uploads_$DATE.tar.gz -C /data .

# Backup database
docker exec garden-bros-db pg_dump -U strapi gardenbros | gzip > backups/db_$DATE.sql.gz

echo "Backup completed: $DATE"
EOF

chmod +x backup.sh
```

### Updates
```bash
# Update application
git pull origin main
docker-compose build --no-cache
docker-compose up -d

# Update system
sudo apt update && sudo apt upgrade -y
```

## Troubleshooting

### Common Issues

1. **Container won't start**
   ```bash
   docker-compose logs strapi
   # Check for environment variable issues
   ```

2. **Database connection failed**
   ```bash
   docker-compose exec strapi ping strapiDB
   # Verify database container is running
   ```

3. **Uploads not persisting**
   ```bash
   docker volume ls
   docker volume inspect garden-bros_uploads
   ```

4. **Permission issues**
   ```bash
   docker-compose exec strapi chown -R node:node /opt/app/public/uploads
   ```

### Emergency Recovery
```bash
# Stop all containers
docker-compose down

# Remove containers but keep volumes
docker-compose down --remove-orphans

# Restart with fresh containers
docker-compose up -d --force-recreate
```

## Security Considerations

- [ ] Change default passwords
- [ ] Use strong JWT secrets
- [ ] Configure firewall rules
- [ ] Set up regular backups
- [ ] Monitor logs for suspicious activity
- [ ] Keep Docker and system updated

## Performance Optimization

- [ ] Configure reverse proxy (Nginx)
- [ ] Set up CDN for media files
- [ ] Configure database connection pooling
- [ ] Monitor resource usage
- [ ] Set up log rotation