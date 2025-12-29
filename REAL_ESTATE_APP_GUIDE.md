# RealEstate - Modern Property Selling Web App

A beautiful, fully functional real estate property selling web application built with React, Express, and modern web technologies.

## 🎯 Features

### Core Features Implemented
- ✅ **User Authentication**: Signup, Login, Logout with JWT cookies
- ✅ **Property Listings**: Dynamic property display with beautiful cards
- ✅ **Search & Filters**: Search by title/address, filter by city and price range
- ✅ **Property Details**: Full property information with image gallery
- ✅ **Add Properties**: Protected route for logged-in users to list properties
- ✅ **Contact Form**: Get in touch with support team
- ✅ **User Account**: View profile and manage listed properties
- ✅ **Responsive Design**: Works perfectly on mobile, tablet, and desktop

### Design Highlights
- Modern blue & teal color scheme
- Smooth transitions and animations
- Professional property cards with pricing
- Intuitive navigation
- Mobile-optimized sidebar and menus

## 🚀 Getting Started

### Development
The app is already running in development mode. You can access it at:
- **Frontend**: http://localhost:5173 (or your assigned port)
- **API**: http://localhost:5173/api

### Testing the App

#### 1. **Home Page** (`/`)
- View featured/latest properties
- Search properties
- Quick location filters
- Call-to-action for sellers

#### 2. **Properties Listing** (`/properties`)
- Browse all properties
- Filter by city, price range
- Search by title or address
- Responsive grid layout

#### 3. **Property Detail** (`/property/:id`)
- Full property information
- Image gallery (with navigation)
- Price and specifications
- Schedule a visit option
- Share property button

#### 4. **Authentication**
- **Login** (`/login`): Sign in with email/password
- **Signup** (`/signup`): Create new account
- Google OAuth integration option (requires setup)

#### 5. **Add Property** (`/add-property`)
- Protected route (login required)
- Form to list new properties
- Specify price, location, type, description
- Image URL support

#### 6. **Contact** (`/contact`)
- Contact form to reach support
- Company information display
- Multiple contact methods

#### 7. **My Account** (`/account`)
- Protected route (login required)
- View user profile
- Manage listed properties
- Quick access to list new property

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/signup      - Create new account
POST   /api/auth/login       - Sign in
POST   /api/auth/logout      - Sign out
GET    /api/auth/me          - Get current user (protected)
```

### Properties
```
GET    /api/properties              - List properties (supports filters)
GET    /api/properties/:id          - Get property details
POST   /api/properties              - Create property (protected)
GET    /api/users/me/properties     - Get user's properties (protected)
```

### Contact
```
POST   /api/contact         - Submit contact form
```

### Health
```
GET    /api/health          - Health check
GET    /api/ping            - Simple ping endpoint
```

## 📊 Query Parameters (Filters)

### GET /api/properties
- `q` - Search query (title, address, description)
- `city` - Filter by city
- `minPrice` - Minimum property price
- `maxPrice` - Maximum property price
- `limit` - Number of results (default: 10, max: 100)

**Example:**
```
/api/properties?city=New%20York&minPrice=500000&maxPrice=3000000&limit=20
```

## 🔐 Authentication

### Current Implementation (Demo)
- Uses in-memory storage (for demo purposes)
- JWT tokens stored in httpOnly cookies
- Automatic cookie-based authentication

### For Production
Replace the in-memory stores in:
- `server/routes/auth.ts` - User storage
- `server/routes/properties.ts` - Property storage
- `server/routes/contact.ts` - Contact storage

With MongoDB collections:
```typescript
// Example User Schema
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  passwordHash: String, // bcrypt hashed
  googleId: String (optional),
  createdAt: Date
}

// Example Property Schema
{
  _id: ObjectId,
  title: String,
  description: String,
  price: Number,
  city: String,
  address: String,
  images: [String], // Array of image URLs
  type: String, // House, Apartment, Condo, etc.
  status: String, // for sale, sold, pending
  ownerUserId: ObjectId (ref: User),
  createdAt: Date
}

// Example Contact Schema
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  message: String,
  createdAt: Date
}
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Lucide Icons** - Icon library
- **Radix UI** - Component primitives

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Cookie-Parser** - Cookie handling
- **Zod** - Validation (schema validation)
- **CORS** - Cross-origin requests

### Ready for Integration
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT handling
- **Passport.js** - OAuth integration

## 📁 Project Structure

```
code/
├── client/                 # React frontend
│   ├── pages/             # Route components
│   │   ├── Home.tsx
│   │   ├── Properties.tsx
│   │   ├── PropertyDetail.tsx
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── AddProperty.tsx
│   │   ├── Contact.tsx
│   │   ├── Account.tsx
│   │   └── NotFound.tsx
│   ├── components/        # Reusable components
│   │   ├── Header.tsx
│   │   ├── PropertyCard.tsx
│   │   └── ui/           # UI primitives
│   ├── App.tsx           # Main app with routing
│   ├── global.css        # Global styles & variables
│   └── lib/              # Utilities
├── server/               # Express backend
│   ├── index.ts         # Server setup
│   ├── routes/          # API routes
│   │   ├── auth.ts      # Authentication
│   │   ├── properties.ts # Properties CRUD
│   │   ├── contact.ts   # Contact form
│   │   ├── health.ts    # Health check
│   │   └── demo.ts      # Demo route
│   └── models/          # (Ready for MongoDB)
├── tailwind.config.ts   # Tailwind configuration
├── tsconfig.json        # TypeScript config
└── package.json         # Dependencies
```

## 🎨 Customization Guide

### Change Brand Colors
Edit `client/global.css` - update HSL color values:
```css
:root {
  --primary: 200 100% 35%;      /* Main brand color */
  --secondary: 186 100% 42%;    /* Accent color */
  --accent: 186 100% 42%;       /* Highlight color */
}
```

### Update Content
- **Company Name**: Search for "RealEstate" in components
- **Footer Links**: Edit `client/pages/Home.tsx`
- **Contact Info**: Update `client/pages/Contact.tsx`
- **Demo Properties**: Modify `server/routes/properties.ts`

### Add New Pages
1. Create file: `client/pages/YourPage.tsx`
2. Add route in `client/App.tsx`:
   ```tsx
   <Route path="/your-page" element={<YourPage />} />
   ```

### Add New API Routes
1. Create route handler: `server/routes/your-route.ts`
2. Import and register in `server/index.ts`:
   ```tsx
   app.post("/api/your-endpoint", handleYourRoute);
   ```

## 🚀 Production Deployment

### Build
```bash
pnpm build
```

### Environment Variables Needed
```
PORT=5000
MONGODB_URI=mongodb+srv://sayaliwaghmode19_db_user:1yFUqo1J69ZcSP12@cluster0.3jzfjjf.mongodb.net/realestateDB
JWT_SECRET=realestate_super_secret_19_Feb_2004
GOOGLE_CLIENT_ID=919820002598-bd24rj8sftdi3pdeop59sat3kjf154vk.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_CALLBACK_URL=http://localhost:5173/auth/google/callback
CLIENT_URL=http://localhost:5173
NODE_ENV=production
```

### Deployment Options
- **Netlify** - Full-stack hosting
- **Vercel** - React + API Routes
- **Heroku** - Classic Node.js hosting
- **AWS** - EC2 + RDS setup
- **DigitalOcean** - App Platform

## 📝 Sample API Calls

### Create User
```bash
curl -X POST http://localhost:5173/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### Get Properties
```bash
curl 'http://localhost:5173/api/properties?city=New%20York&minPrice=500000'
```

### Create Property (Authenticated)
```bash
curl -X POST http://localhost:5173/api/properties \
  -H "Content-Type: application/json" \
  -b "auth_token=YOUR_TOKEN" \
  -d '{
    "title": "Beautiful Modern House",
    "description": "A great home...",
    "price": 750000,
    "city": "Los Angeles",
    "address": "123 Main St",
    "type": "House",
    "images": ["https://example.com/image.jpg"]
  }'
```

### Submit Contact
```bash
curl -X POST http://localhost:5173/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+1-555-123-4567",
    "message": "I am interested in property listings"
  }'
```

## 🐛 Troubleshooting

### Properties page shows blank
- Clear browser cache (Ctrl+Shift+Del or Cmd+Shift+Delete)
- Refresh the page
- Check browser console for errors

### Login not working
- Ensure cookies are enabled
- Check if email/password was entered correctly
- Look at browser network tab to see API response

### Add Property button not showing
- Make sure you're logged in
- Clear cache and reload
- Check that /add-property route is defined

### Styling looks off
- Verify Tailwind CSS compiled correctly
- Check if global.css is imported
- Make sure color variables are valid HSL values

## 📚 Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [MongoDB](https://mongodb.com)
- [TypeScript](https://www.typescriptlang.org)

## 📄 License

This project is open source and available for commercial and personal use.

## 🤝 Support

For questions or issues:
1. Check this guide for solutions
2. Review the code comments
3. Check browser console for error messages
4. Verify API endpoints are returning data

---

**Happy selling! 🏠**
