# Digital Press Kit Builder for Musicians

A full-stack web application that empowers musicians to create, share, and track professional press kits. This tool enables artists to assemble media-rich promotional materials that can be easily shared with industry professionals, venues, and media outlets.

## Features

### User Authentication & Management
- Secure account creation and login
- Password reset functionality
- Profile management

### Press Kit Creation & Customization
- Create multiple press kits for different purposes
- Pre-designed templates to match your brand
- Customize colors, fonts, and layouts
- Preview before publishing

### Content Management
- Biography writing and formatting
- High-quality photo galleries
- Audio integration from platforms like SoundCloud and Spotify
- Video embedding from YouTube and Vimeo
- Press quotes and achievements highlights
- Tour dates and upcoming shows
- Discography with album artwork

### Sharing & Distribution
- Generate unique URLs for press kits
- Download press kits as PDFs
- Share press kits directly via email
- Embed press kits on your website

### Analytics & Tracking
- View counts and visitor tracking
- Section engagement metrics
- Link click tracking
- Geographic data visualization
- Engagement notifications

## Technology Stack

### Frontend
- React.js with TypeScript
- Redux Toolkit for state management
- Tailwind CSS for styling
- Headless UI components
- React Hook Form for form handling
- react-beautiful-dnd for customizing layouts
- Media players for embedding audio/video

### Backend
- Node.js with Express
- RESTful API architecture
- JWT authentication
- Joi/Yup for validation

### Database
- MongoDB with Mongoose
- AWS S3 for media file storage

### DevOps & Infrastructure
- Vercel (frontend hosting)
- Heroku (backend hosting)
- GitHub Actions for CI/CD
- Sentry for monitoring
- Google Analytics

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB
- AWS account (for S3 storage)

### Installation

1. Clone the repository
```bash
git clone https://github.com/dxaginfo/musician-digital-press-kit.git
cd musician-digital-press-kit
```

2. Install dependencies
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Set up environment variables
```bash
# In the server directory, create a .env file
cp .env.example .env

# Edit .env with your configuration
# Do the same in the client directory
cd ../client
cp .env.example .env
```

4. Start the development servers
```bash
# Start backend server
cd ../server
npm run dev

# In a new terminal, start frontend server
cd ../client
npm start
```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
musician-digital-press-kit/
├── client/                  # Frontend React application
│   ├── public/              # Static files
│   └── src/                 # React source code
│       ├── components/      # UI components
│       ├── pages/           # Page components
│       ├── hooks/           # Custom React hooks
│       ├── store/           # Redux store
│       ├── utils/           # Utility functions
│       └── services/        # API services
│
├── server/                  # Backend Node.js application
│   ├── controllers/         # Route controllers
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── middleware/          # Express middleware
│   ├── services/            # Business logic
│   └── utils/               # Utility functions
│
└── docs/                    # Documentation
```

## Deployment

### Frontend Deployment (Vercel)
1. Connect your GitHub repository to Vercel
2. Configure build settings
3. Set environment variables
4. Deploy

### Backend Deployment (Heroku)
1. Create a new Heroku app
2. Connect your GitHub repository
3. Configure environment variables
4. Deploy

## Security Considerations
- All connections use HTTPS
- JWT authentication with secure practices
- Input validation for all form submissions
- Proper CORS policies
- Rate limiting for API endpoints
- File upload validation and sanitization
- Error handling that prevents information leakage

## Future Enhancements
- Integration with streaming platforms for automatic content updates
- Advanced analytics with heat mapping
- Collaboration features for bands/management teams
- AI-assisted content creation for bios and press releases
- Direct outreach to industry contacts from within the platform
- Mobile app for on-the-go press kit management

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
For any questions or feedback, please open an issue on this repository.