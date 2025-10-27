# Frontend - AI-Driven Organ Donor Matching System

A modern, responsive web frontend for an organ donation matching platform with integrated AI chatbot support.

## 🚀 Features

- **User Authentication**: Login and registration system
- **Dashboard**: Comprehensive overview of donations and requests
- **Organ Management**: Create and browse organ donations
- **Request System**: Submit and track organ requests
- **AI Chatbot**: Medical guidance and organ donation support
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Real-time Updates**: Dynamic content loading and updates

## 📁 Project Structure

```
frontend/
├── js/
│   └── api.js                 # API helper functions and authentication
├── dashboard.html             # Main dashboard with chatbot
├── login.html                 # User login page
├── donate.html                # Organ donation form
├── donor.html                 # Donor profile and management
├── organ.html                 # Browse available organs
├── request.html               # Create organ requests
├── my-requests.html           # View user's requests
├── public-requests.html       # Browse all requests
├── support.html               # Support chat interface
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Backend API server running (see backend README)
- Web server (optional, for local development)

### Installation

1. **Clone or download the frontend files**

2. **Serve the files**:
   
   **Option A: Simple HTTP Server (Python)**
   ```bash
   cd frontend
   python -m http.server 8080
   ```
   
   **Option B: Node.js HTTP Server**
   ```bash
   cd frontend
   npx http-server -p 8080
   ```
   
   **Option C: Live Server (VS Code Extension)**
   - Install Live Server extension
   - Right-click on any HTML file → "Open with Live Server"

3. **Access the application**:
   Open `http://localhost:8080` in your browser

### Configuration

The frontend is configured to connect to the backend at `http://localhost:4000`. If your backend runs on a different port or domain, update the `API_BASE_URL` in `js/api.js`:

```javascript
const API_BASE_URL = "http://localhost:4000"; // Update this if needed
```

## 📱 Pages Overview

### 🔐 Authentication Pages

#### `login.html`
- User login form
- Registration link
- Automatic redirect to dashboard on successful login
- Form validation and error handling

### 📊 Main Application Pages

#### `dashboard.html` - Main Dashboard
- **Overview Cards**: Quick stats and summaries
- **AI Chatbot**: Integrated medical guidance chatbot
- **Recent Activity**: Latest donations and requests
- **Quick Actions**: Fast access to common tasks
- **Chat History**: Previous chatbot conversations

#### `donate.html` - Organ Donation
- Organ donation form (type, blood group, gender)
- Form validation
- Success/error feedback
- Redirect to donor profile after submission

#### `donor.html` - Donor Profile
- View donated organs
- Donation history
- Profile management
- Status tracking for donations

#### `organ.html` - Browse Organs
- List of available organs
- Filter and search functionality
- Donor contact information
- Request organ directly

#### `request.html` - Create Requests
- Two request types:
  - Specific organ request (from available organs)
  - General request (specify type and blood group)
- Notes and additional information
- Form validation

#### `my-requests.html` - User Requests
- Personal request history
- Request status tracking
- Edit/cancel functionality
- Progress updates

#### `public-requests.html` - All Requests
- Browse all pending requests
- AI-powered matching suggestions
- Contact information for requesters
- Match compatibility indicators

#### `support.html` - Support Chat
- Dedicated chat interface
- Extended chat history
- Support-focused chatbot responses
- Help documentation links

## 🎨 Design System

### Styling
- **Framework**: Tailwind CSS (via CDN)
- **Color Scheme**: 
  - Primary: Red (#e92932) - for medical/urgent actions
  - Secondary: Blue (#3b82f6) - for informational elements
  - Neutral: Grays for backgrounds and text
- **Typography**: System fonts with careful hierarchy
- **Components**: Consistent cards, buttons, and form elements

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Responsive navigation
- Touch-friendly interface elements

## 🔧 JavaScript Architecture

### `js/api.js` - API Helper Module

#### Core Functions
```javascript
// Authentication
getToken()              // Get stored auth token
setToken(token)         // Store auth token
clearToken()            // Remove auth token
requireAuth()           // Redirect if not authenticated

// API Communication
apiFetch(path, options) // Make authenticated API requests
authHeader()            // Get authorization headers
```

#### Usage Examples
```javascript
// Login request
const response = await API.apiFetch('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password })
});

// Authenticated request
const organs = await API.apiFetch('/api/organs', {
  headers: { ...API.authHeader() }
});
```

### Page-Specific JavaScript

Each HTML page includes inline JavaScript for:
- Form handling and validation
- Dynamic content loading
- User interaction management
- Real-time updates
- Error handling and user feedback

## 🤖 Chatbot Integration

### Features
- **Medical Guidance**: General health and medical information
- **Organ Donation Support**: Specific guidance about donation process
- **Content Filtering**: Automatic filtering of inappropriate topics
- **Response Optimization**: Concise, helpful responses
- **Follow-up Questions**: Intelligent conversation flow
- **History Persistence**: Chat history saved per user

### Usage
```javascript
// Send chat message
const response = await API.apiFetch('/api/chat', {
  method: 'POST',
  headers: { ...API.authHeader() },
  body: JSON.stringify({ message: userInput })
});

// Load chat history
const history = await API.apiFetch('/api/chat/history', {
  headers: { ...API.authHeader() }
});
```

## 🔒 Security Features

### Client-Side Security
- JWT token storage in localStorage
- Automatic token validation
- Secure API communication
- Input sanitization
- XSS prevention through proper DOM manipulation

### Authentication Flow
1. User logs in → receives JWT token
2. Token stored in localStorage
3. Token included in all API requests
4. Automatic redirect to login if token invalid/expired

## 📱 User Experience Features

### Form Validation
- Real-time input validation
- Clear error messages
- Success feedback
- Prevent duplicate submissions

### Loading States
- Loading indicators for API calls
- Disabled buttons during processing
- Progress feedback for long operations

### Error Handling
- User-friendly error messages
- Fallback content for failed requests
- Retry mechanisms where appropriate
- Graceful degradation

## 🚀 Performance Optimizations

### Loading Performance
- Minimal external dependencies
- Efficient DOM manipulation
- Lazy loading of non-critical content
- Optimized image handling

### Runtime Performance
- Event delegation for dynamic content
- Debounced input handlers
- Efficient API request patterns
- Memory leak prevention

## 🔍 Troubleshooting

### Common Issues

1. **Login Not Working**
   - Check backend server is running
   - Verify API_BASE_URL in api.js
   - Check browser console for errors
   - Clear localStorage and try again

2. **Chatbot Not Responding**
   - Ensure user is logged in
   - Check Google API key in backend
   - Verify network connectivity
   - Check browser console for errors

3. **Pages Not Loading Data**
   - Verify authentication token
   - Check backend API endpoints
   - Review browser network tab
   - Ensure CORS is configured properly

4. **Styling Issues**
   - Verify Tailwind CSS CDN is loading
   - Check browser compatibility
   - Clear browser cache
   - Inspect element styles

### Browser Compatibility

**Supported Browsers:**
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

**Required Features:**
- ES6+ JavaScript support
- Fetch API
- LocalStorage
- CSS Grid and Flexbox

## 🛠️ Development

### Local Development Setup
1. Use a local web server (not file:// protocol)
2. Enable browser developer tools
3. Use browser's responsive design mode for mobile testing
4. Monitor console for errors and warnings

### Code Style
- Consistent indentation (2 spaces)
- Meaningful variable names
- Proper error handling
- Comments for complex logic
- Semantic HTML structure

### Testing
- Test all forms with valid/invalid data
- Verify responsive design on different screen sizes
- Test authentication flow thoroughly
- Validate chatbot functionality
- Check error handling scenarios

## 🤝 Contributing

1. Follow existing code style and structure
2. Test thoroughly across different browsers
3. Ensure responsive design works properly
4. Add appropriate error handling
5. Update documentation for new features
6. Validate HTML and check accessibility

## 📋 Future Enhancements

- Progressive Web App (PWA) features
- Offline functionality
- Push notifications
- Advanced filtering and search
- Real-time notifications
- Enhanced accessibility features
- Multi-language support