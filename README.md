# Knowledge Base POC Application

A proof-of-concept web application for searching across multiple knowledge base repositories with role-based access control.

## Features

- 🔍 **Unified Search**: Query multiple knowledge bases simultaneously
- 👥 **Role-Based Access**: Support Agent (read-only) and Admin (full access)
- 📚 **Two Knowledge Bases**:
  - Product Documentation (technical guides, API reference, troubleshooting)
  - Internal Wiki (HR policies, engineering processes, sales playbooks)
- 🎨 **Modern UI**: Clean, responsive interface built with Tailwind CSS
- 🔐 **Authentication**: JWT-based login system

## Tech Stack

- **Frontend/Backend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Authentication**: JWT tokens with bcrypt password hashing
- **Data Storage**: JSON files (simulating external KBs)
- **Language**: TypeScript

## Project Structure

```
kb-poc-app/
├── app/
│   ├── api/
│   │   ├── auth/login/route.ts    # Login endpoint
│   │   └── search/route.ts        # Search endpoint
│   ├── admin/page.tsx             # Admin settings page
│   ├── search/page.tsx            # Main search interface
│   ├── page.tsx                   # Login page
│   ├── layout.tsx                 # Root layout
│   └── globals.css                # Global styles
├── data/
│   ├── kb1-product-docs.json      # Product documentation KB
│   ├── kb2-internal-wiki.json     # Internal wiki KB
│   └── users.json                 # User accounts
├── lib/
│   ├── auth.ts                    # Authentication utilities
│   └── kb-search.ts               # Knowledge base search logic
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd kb-poc-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Test Accounts

**Support Agent** (Read-only access):
- Email: `agent@kbpoc.com`
- Password: `password123`

**Admin** (Full access):
- Email: `admin@kbpoc.com`
- Password: `password123`

## Usage

### As a Support Agent

1. Login with the support agent credentials
2. Use the search bar to query across both knowledge bases
3. Click on search results to view full article details
4. View categories, tags, and metadata for each article

### As an Admin

1. Login with the admin credentials
2. Access all support agent features
3. Navigate to Admin Settings (click "Admin" in header when available)
4. View connected knowledge bases
5. See statistics and analytics

## Knowledge Base Content

### KB1: Product Documentation (10 articles)
- Getting Started guides
- API Reference
- Administration guides
- Troubleshooting
- Best practices
- Security information

### KB2: Internal Wiki (12 articles)
- HR Policies (onboarding, time off, remote work, expenses)
- Engineering Processes (code review, incidents, meetings)
- Sales Playbooks (discovery calls, objection handling, escalations)
- Security Guidelines (data classification, authentication)

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Create a GitHub repository** and push your code
2. **Go to [vercel.com](https://vercel.com)** and sign up
3. **Import your repository**
4. **Deploy** - Vercel auto-detects Next.js and configures everything
5. **Access your live app** at the provided URL

### Option 2: Netlify

1. **Create a GitHub repository** and push your code
2. **Go to [netlify.com](https://netlify.com)** and sign up
3. **Import your repository**
4. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. **Deploy**

### Option 3: Traditional Server (DigitalOcean, AWS, etc.)

1. **SSH into your server**
2. **Install Node.js 18+**
3. **Clone your repository**
4. **Install dependencies**: `npm install`
5. **Build the app**: `npm run build`
6. **Start production server**: `npm start`
7. **Set up nginx as reverse proxy** (port 3000 → 80)
8. **Configure SSL certificate** (Let's Encrypt)

## Adding a Custom Domain

### On Vercel:
1. Go to your project settings
2. Click "Domains"
3. Add your domain (e.g., `kb-poc.yourdomain.com`)
4. Update DNS records at your domain registrar:
   - Type: `CNAME`
   - Name: `kb-poc` (or `@` for root domain)
   - Value: `cname.vercel-dns.com`

### On Netlify:
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Follow DNS configuration instructions

## API Endpoints

### POST /api/auth/login
Login endpoint for authentication.

**Request**:
```json
{
  "email": "agent@kbpoc.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "user": {
    "id": "user001",
    "email": "agent@kbpoc.com",
    "name": "Sarah Agent",
    "role": "support_agent"
  },
  "token": "jwt-token-here"
}
```

### POST /api/search
Search across all knowledge bases.

**Request**:
```json
{
  "query": "password policy"
}
```

**Response**:
```json
{
  "query": "password policy",
  "results": [
    {
      "id": "iw008",
      "title": "Password and Authentication Policy",
      "category": "Security Guidelines",
      "content": "...",
      "kb_name": "Internal Wiki",
      "kb_id": "kb2"
    }
  ],
  "total": 1
}
```

## Future Enhancements

- [ ] Connect to real knowledge base APIs (Notion, Confluence, etc.)
- [ ] Add PostgreSQL database for users and search logs
- [ ] Implement AI-powered semantic search using Claude API
- [ ] Add result ranking and relevance scoring
- [ ] Create analytics dashboard
- [ ] Enable user management (add/remove users)
- [ ] Add real-time search suggestions
- [ ] Implement search filters (date range, category, KB source)
- [ ] Add favorites/bookmarking functionality
- [ ] Export search results

## Troubleshooting

**Port already in use**:
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use a different port
npm run dev -- -p 3001
```

**Module not found errors**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors**:
```bash
# Regenerate types
npm run build
```

## Security Notes

⚠️ **For Production**:
- Change the JWT secret in `/app/api/auth/login/route.ts`
- Use environment variables for secrets
- Implement proper password hashing (current bcrypt is for demo)
- Add rate limiting to prevent brute force attacks
- Enable HTTPS
- Implement session management
- Add CSRF protection

## License

This is a proof-of-concept application for demonstration purposes.

## Support

For questions or issues, please refer to the documentation or contact your system administrator.
