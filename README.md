# INQ Portfolio - Production Ready

A production-ready personal portfolio website with Demon Slayer anime theme, built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Prisma ORM, and PostgreSQL.

## Features

- 🎨 **Demon Slayer Dark Theme** - Blood red (#c1121f) and flame orange (#e85d04) accents
- ✨ **Animations** - Breathing particles, typewriter effect, smoke effects, page transitions
- 📱 **Fully Responsive** - Mobile-first design
- 🔐 **Admin Panel** - JWT-protected with full CRUD for projects, blog, services, messages
- 📄 **PDF Blog Posts** - Upload PDFs via admin, stored in Vercel Blob
- 🛠️ **Full API** - RESTful endpoints for all data

## Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Database | PostgreSQL (Neon) |
| ORM | Prisma |
| File Storage | Vercel Blob |
| Auth | JWT |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (Neon recommended)
- Vercel account (for deployment)

### Installation

```bash
# Clone the repository
git clone <your-repo>
cd portfolio

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Create .env file (copy from .env.example)
cp .env.example .env
```

### Environment Variables

Create a `.env` file with:

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@host:5432/database"

# JWT Secret (generate a secure random string)
JWT_SECRET="your-super-secret-jwt-key"

# Vercel Blob (get from Vercel Dashboard > Storage > Blobs)
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
```

### Database Setup

```bash
# Push schema to database
npx prisma db push

# Seed with initial data (admin, services, sample projects)
npm run db:seed
```

### Development

```bash
# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Admin Panel

Access at `/admin/login`:
- Username: `INQ`
- Password: `fuckingrich@2026`

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL` (Neon connection string)
   - `JWT_SECRET` (generate secure key)
   - `BLOB_READ_WRITE_TOKEN` (from Vercel Storage)
4. Deploy!

### Neon Database

1. Create free account at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string
4. Add to Vercel environment variables

## Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Main portfolio
│   │   ├── admin/                # Admin panel
│   │   │   ├── login/            # Admin login
│   │   │   ├── projects/         # Project manager
│   │   │   ├── blog/             # Blog manager
│   │   │   ├── services/         # Services manager
│   │   │   └── messages/         # Messages inbox
│   │   ├── api/                  # API routes
│   │   └── blog/[slug]/         # Blog post pages
│   ├── components/
│   │   ├── ui/                   # Reusable components
│   │   ├── sections/             # Portfolio sections
│   │   └── effects/              # Animation effects
│   └── lib/                      # Utilities
├── prisma/
│   ├── schema.prisma              # Database schema
│   └── seed.ts                   # Seed data
└── package.json
```

## Admin Features

- **Projects** - Add, edit, delete portfolio projects
- **Blog** - Create posts with PDF uploads
- **Services** - Update pricing and descriptions
- **Messages** - View contact form submissions

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth` | POST | Admin login |
| `/api/projects` | GET/POST | List/Create projects |
| `/api/projects/[id]` | PUT/DELETE | Update/Delete |
| `/api/blog` | GET/POST | List/Create posts |
| `/api/blog/[slug]` | GET/PUT/DELETE | Single post |
| `/api/services` | GET | List services |
| `/api/contact` | POST | Submit contact form |
| `/api/messages` | GET | Admin: all messages |

## Customization

### Colors

Edit `tailwind.config.ts` to change theme colors:
- `--primary` - Blood red (#c1121f)
- `--accent` - Flame orange (#e85d04)
- `--background` - Pure black (#0a0a0a)

### Fonts

Change fonts in `src/app/globals.css`:
- Headings: Cinzel
- Body: Inter

## License

MIT
