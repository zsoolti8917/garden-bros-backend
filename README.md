# Garden Bros Backend

## Overview

Garden Bros Backend is a comprehensive content management system built with **Strapi v4.24.5** for a Czech gardening company. This headless CMS provides a robust API for managing website content, including services (sluzby), projects (projekty), articles, and global site configuration. The application features multilingual support (i18n), dynamic content sections, and a sophisticated component-based architecture.

## Key Features

### 🏗️ **Architecture & Technology Stack**
- **Strapi CMS v4.24.5:** Modern headless CMS with REST/GraphQL APIs
- **Node.js 18+:** Runtime environment with npm package management
- **PostgreSQL:** Primary database for production environments
- **SQLite:** Development database (better-sqlite3)
- **Docker Support:** Containerized deployment with multi-stage builds
- **Dokku Deployment:** PaaS deployment on VPS infrastructure

### 🌍 **Internationalization (i18n)**
- Multi-language content support
- Localized content types and components
- Language-specific SEO optimization

### 📄 **Content Types**
- **Articles:** Blog posts with categories, authors, and dynamic content blocks
- **Pages:** Dynamic pages with customizable content sections
- **Authors:** Author profiles with avatar and contact information
- **Categories:** Content categorization system
- **Global:** Site-wide settings including navigation, footer, and metadata

### 🧩 **Component System**
- **Layout Components:** Navbar, Footer, Header/Footer Info
- **Section Components:** Hero, Services (Sluzby), Features, FAQ, Contact Info, Projects (Projekty)
- **Element Components:** Feature Links, Addresses, Questions, Service Sections
- **Shared Components:** SEO, Media, Rich Text, Quotes, Sliders, Video Embeds
- **Link Components:** Buttons, Navigation Links, Social Links, Contact Links

## Project Structure

```
garden-bros-backend/
├── config/                     # Strapi configuration files
│   ├── admin.js               # Admin panel configuration
│   ├── api.js                 # API configuration
│   ├── database.js            # Database connection settings
│   ├── middlewares.js         # Middleware configuration
│   ├── plugins.js             # Plugin configuration
│   └── server.js              # Server configuration
├── src/
│   ├── api/                   # API endpoints and business logic
│   │   ├── article/           # Article content type
│   │   ├── author/            # Author content type
│   │   ├── category/          # Category content type
│   │   ├── global/            # Global settings (single type)
│   │   └── page/              # Page content type with middleware
│   ├── components/            # Reusable Strapi components
│   │   ├── elements/          # UI elements (features, addresses, etc.)
│   │   ├── layout/            # Layout components (navbar, footer)
│   │   ├── links/             # Link components (buttons, social links)
│   │   ├── meta/              # Metadata components
│   │   ├── sections/          # Page sections (hero, services, FAQ)
│   │   └── shared/            # Shared components (SEO, media, rich text)
│   ├── admin/                 # Admin panel customizations
│   └── index.js               # Application entry point
├── types/generated/           # TypeScript type definitions
├── database/migrations/       # Database migration files
├── public/uploads/            # Media upload directory
├── Dockerfile                 # Docker configuration for development
├── Dockerfile.prod           # Docker configuration for production
└── package.json              # Dependencies and scripts
```

## Getting Started

### Prerequisites

- **Node.js 18+:** Required runtime environment
- **npm 6+:** Package manager
- **PostgreSQL:** For production database
- **Docker:** Optional, for containerized development
- **Git:** Version control

### Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd garden-bros-backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Copy the example environment file and configure:
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   HOST=0.0.0.0
   PORT=1337
   APP_KEYS="your-app-keys-here"
   API_TOKEN_SALT=your-api-token-salt
   ADMIN_JWT_SECRET=your-admin-jwt-secret
   TRANSFER_TOKEN_SALT=your-transfer-token-salt
   JWT_SECRET=your-jwt-secret
   
   # Database Configuration
   DATABASE_HOST=127.0.0.1
   DATABASE_PORT=5432
   DATABASE_NAME=gardenbros
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=your-password
   DATABASE_SSL=false
   ```

4. **Development Server**
   ```bash
   npm run develop
   ```
   
   Access the admin panel at: `http://localhost:1337/admin`

5. **Production Build**
   ```bash
   npm run build
   npm start
   ```

## Content Architecture

### Content Types Overview

#### 📰 **Articles** (Collection Type)
- **Purpose:** Blog posts and news articles
- **Features:** i18n support, draft/publish workflow
- **Fields:** Title, description, slug, cover image, category relation, author relation
- **Dynamic Content:** Rich text, media, quotes, sliders, video embeds
- **SEO:** Built-in SEO component with meta tags and social sharing

#### 👤 **Authors** (Collection Type)
- **Purpose:** Author profiles and biographical information
- **Fields:** Name, avatar, email
- **Relations:** One-to-many with articles

#### 🏷️ **Categories** (Collection Type)
- **Purpose:** Content categorization system
- **Relations:** One-to-many with articles

#### 📄 **Pages** (Collection Type)
- **Purpose:** Dynamic website pages with flexible content sections
- **Features:** i18n support, slug-based routing
- **Content Sections:** Hero, Services, Features, Projects, FAQ, Contact Info
- **Custom Middleware:** Enhanced population for nested components

#### 🌐 **Global** (Single Type)
- **Purpose:** Site-wide configuration and settings
- **Components:** Navigation, footer, metadata, favicon
- **Features:** i18n support for multi-language sites

### Component System

The application uses a sophisticated component-based architecture:

#### **Layout Components**
- `navbar`: Navigation with links and logo
- `footer`: Site footer with address, services, and contact info
- `header-info` & `footer-info`: Additional header/footer content

#### **Section Components**
- `hero`: Landing page hero sections with CTA buttons
- `sluzby`: Services showcase with features
- `features`: Feature listings with icons and descriptions
- `projekty`: Project galleries and showcases
- `faq`: Frequently asked questions
- `contact-info`: Contact forms and information

#### **Shared Components**
- `seo`: Meta tags, descriptions, and social sharing
- `media`: Image and video handling
- `rich-text`: WYSIWYG content editing
- `slider`: Image carousels and galleries

## API Endpoints

### REST API
- **Articles:** `/api/articles`
- **Authors:** `/api/authors`
- **Categories:** `/api/categories`
- **Pages:** `/api/pages`
- **Global:** `/api/global`

### GraphQL
Available at `/graphql` endpoint with full query and mutation support.

## Docker Deployment

> **⚠️ Important:** For persistent media storage, see [DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md) for detailed instructions.

### Quick Start with Docker Compose

**Development:**
```bash
cp .env.example .env
# Edit .env with your configuration
docker-compose up -d
```

**Production:**
```bash
cp .env.example .env
# Edit .env with production values
docker-compose -f docker-compose.prod.yml up -d
```

### Manual Docker Commands

**Development:**
```bash
docker build -f Dockerfile -t garden-bros-dev .
docker run -d -p 1337:1337 \
  -v garden-bros-uploads:/opt/app/public/uploads \
  --env-file .env garden-bros-dev
```

**Production:**
```bash
docker build -f Dockerfile.prod -t garden-bros-prod .
docker run -d -p 1337:1337 \
  -v garden-bros-uploads:/opt/app/public/uploads \
  --env-file .env garden-bros-prod
```

### Features
- **Persistent Storage:** Media uploads survive container restarts
- **Database Integration:** PostgreSQL container included
- **Environment Configuration:** Easy setup with .env files
- **Development/Production:** Separate configurations for different environments

## Dokku Deployment

1. **Setup Dokku App**
   ```bash
   dokku apps:create garden-bros-backend
   ```

2. **Configure Database**
   ```bash
   dokku postgres:create garden-bros-db
   dokku postgres:link garden-bros-db garden-bros-backend
   ```

3. **Set Environment Variables**
   ```bash
   dokku config:set garden-bros-backend APP_KEYS="key1,key2,key3,key4"
   dokku config:set garden-bros-backend API_TOKEN_SALT=your-salt
   dokku config:set garden-bros-backend ADMIN_JWT_SECRET=your-secret
   ```

4. **Deploy**
   ```bash
   git remote add dokku dokku@your-server:garden-bros-backend
   git push dokku main
   ```

5. **SSL Configuration**
   ```bash
   dokku domains:add garden-bros-backend your-domain.com
   dokku letsencrypt:enable garden-bros-backend
   ```

## Data Management

### Content Transfer
Transfer content between environments:
```bash
npm run strapi transfer -- --to https://your-domain.com/admin --to-token your-transfer-token
```

### Database Backup
```bash
# Backup
dokku postgres:export garden-bros-db > backup.sql

# Restore
dokku postgres:import garden-bros-db < backup.sql
```

## Development Workflow

1. **Local Development:** Use SQLite for rapid development
2. **Content Creation:** Build content structure in admin panel
3. **API Testing:** Test endpoints with Postman or similar tools
4. **Production Deploy:** Deploy to Dokku with PostgreSQL
5. **Content Migration:** Transfer content using Strapi transfer tool

## Available Scripts

```bash
npm run develop    # Start development server with auto-reload
npm run start      # Start production server
npm run build      # Build admin panel for production
npm run strapi     # Access Strapi CLI commands
```

## Key Dependencies

- **@strapi/strapi:** Core Strapi framework (v4.24.5)
- **@strapi/plugin-i18n:** Internationalization support
- **@strapi/plugin-users-permissions:** User authentication and permissions
- **pg:** PostgreSQL database driver
- **better-sqlite3:** SQLite database for development
- **react:** Frontend framework for admin panel

## Custom Features

### Page Population Middleware
The application includes a custom middleware (`page-populate-middleware.js`) that automatically populates nested components and relations for page requests, ensuring complete data retrieval for complex page structures.

### Czech Language Support
The CMS is specifically configured for Czech content with components named in Czech (e.g., "sluzby" for services, "projekty" for projects), reflecting the target market.

### Dynamic Content Sections
Pages use a dynamic zone system allowing content editors to mix and match different section types (hero, services, features, etc.) to create flexible page layouts.

## Security & Performance

- **Environment Variables:** Sensitive configuration stored in environment variables
- **Database SSL:** Configurable SSL support for database connections
- **Media Optimization:** Built-in image processing with Sharp
- **CORS Configuration:** Proper cross-origin resource sharing setup
- **Rate Limiting:** Built-in API rate limiting and security middleware

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify PostgreSQL is running
   - Check database credentials in `.env`
   - Ensure database exists and user has proper permissions

2. **Build Failures**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility (18-20.x)

3. **Media Upload Issues**
   - Verify `public/uploads` directory permissions
   - Check available disk space
   - Review file size limits in Strapi configuration

### Logs and Debugging
```bash
# View application logs
npm run develop -- --debug

# View Dokku logs
dokku logs garden-bros-backend --tail
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the package.json file for details.

---

**Garden Bros Backend** - A modern, scalable CMS solution for the gardening industry, built with Strapi and designed for Czech market requirements.
