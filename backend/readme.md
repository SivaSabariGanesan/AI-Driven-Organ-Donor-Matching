# Backend - AI-Driven Organ Donor Matching System

A Node.js/Express backend API for an organ donation matching platform with AI-powered chatbot support.

## 🚀 Features

- **User Authentication**: JWT-based registration and login
- **Organ Management**: Create and manage organ donations
- **Request System**: Handle organ requests with status tracking
- **AI Matching**: Intelligent organ-to-request matching algorithm
- **Medical Chatbot**: Google Gemini AI-powered medical guidance chatbot
- **Chat History**: Persistent chat history for authenticated users

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection configuration
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── models/
│   │   ├── User.js            # User schema with chat history
│   │   ├── Organ.js           # Organ donation schema
│   │   └── Request.js         # Organ request schema
│   ├── routes/
│   │   ├── auth.js            # Authentication endpoints
│   │   ├── organs.js          # Organ management endpoints
│   │   ├── requests.js        # Request management endpoints
│   │   └── chat.js            # AI chatbot endpoints
│   ├── .env                   # Environment variables
│   └── index.js               # Main server file
├── package.json
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Google AI API key (for Gemini chatbot)

### Installation

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Edit `src/.env` file with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/organ_donation
   JWT_SECRET=your-secure-jwt-secret-here
   PORT=4000
   GOOGLE_API_KEY=your-google-ai-api-key-here
   ```

4. **Start MongoDB**:
   - For local MongoDB: `mongod`
   - For MongoDB Atlas: Use your connection string

5. **Run the server**:
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:4000`

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT token signing | Yes |
| `PORT` | Server port (default: 4000) | No |
| `GOOGLE_API_KEY` | Google AI API key for chatbot | Yes |

## 📚 API Endpoints

### Authentication (`/api/auth`)

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile (requires auth)

### Organs (`/api/organs`)

- `POST /api/organs` - Create organ donation (requires auth)
- `GET /api/organs` - List available organs
- `GET /api/organs/mine` - List user's donated organs (requires auth)

### Requests (`/api/requests`)

- `POST /api/requests` - Create organ request (requires auth)
- `GET /api/requests` - List all requests (requires auth)
- `GET /api/requests/mine` - List user's requests (requires auth)
- `GET /api/requests/matches` - AI-powered organ matching (requires auth)
- `PATCH /api/requests/:id/status` - Update request status (requires auth)

### Chat (`/api/chat`)

- `POST /api/chat` - Send message to AI chatbot (requires auth)
- `GET /api/chat/history` - Get user's chat history (requires auth)

## 🤖 AI Chatbot Features

The chatbot provides:
- General medical information and guidance
- Organ donation guidance and support
- Content filtering for inappropriate topics
- Response length optimization (under 120 words)
- Follow-up questions for better user engagement
- Persistent chat history storage

## 🗄️ Database Models

### User
- `name`, `email`, `passwordHash`, `phone`, `address`
- `chatHistory[]` - Array of chat messages with timestamps

### Organ
- `type`, `bloodGroup`, `gender`, `donor` (User ref)
- `availabilityStatus` - "available", "reserved", "donated"

### Request
- `organ` (Organ ref), `requester` (User ref)
- `requestedType`, `requestedBloodGroup` (for general requests)
- `status` - "pending", "approved", "rejected", "fulfilled"
- `notes`

## 🔒 Security Features

- JWT-based authentication with 7-day expiration
- Password hashing using bcryptjs
- Input validation and sanitization
- Content filtering for chatbot interactions
- CORS enabled for frontend integration

## 🚨 Error Handling

The API provides consistent error responses with:
- HTTP status codes
- Descriptive error messages
- Structured JSON error format

## 📝 Development

### Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT implementation
- **bcryptjs** - Password hashing
- **@google/generative-ai** - Google Gemini AI integration
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 🔍 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Ensure MongoDB is running
   - Check MONGODB_URI in .env file
   - Verify network connectivity

2. **JWT Authentication Errors**
   - Verify JWT_SECRET is set
   - Check token format in Authorization header
   - Ensure token hasn't expired

3. **Chatbot Not Working**
   - Verify GOOGLE_API_KEY is valid
   - Check Google AI API quota and billing
   - Review chatbot request format

4. **CORS Issues**
   - Ensure frontend URL is allowed
   - Check CORS configuration in index.js

### Logs

Server logs include:
- Database connection status
- Server startup confirmation
- Error messages with stack traces
- Request/response information (in development)

## 🤝 Contributing

1. Follow existing code style and structure
2. Add appropriate error handling
3. Include input validation
4. Update documentation for new endpoints
5. Test thoroughly before submitting changes