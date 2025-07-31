# 🎵 BEAT-DISTRICT

A modern, full-stack music streaming application built with React, Node.js, and MongoDB. Experience seamless music playback with a beautiful dark/light theme interface.

![BEAT-DISTRICT](https://img.shields.io/badge/BEAT-DISTRICT-Music%20Streaming-blue?style=for-the-badge&logo=spotify)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-15.7.0-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6.4.4-47A248?style=for-the-badge&logo=mongodb)

## ✨ Features

### 🎧 Music Features
- **Music Player**: Full-featured audio player with play/pause, skip, volume control
- **Playlist Management**: Create, edit, and manage custom playlists
- **Song Upload**: Upload and manage your music library
- **Search & Filter**: Find songs quickly with search functionality
- **Queue Management**: Add songs to queue and manage playback order

### 👤 User Features
- **User Authentication**: Secure JWT-based login/registration system
- **User Profiles**: Personalized user experience with profile management
- **Dark/Light Theme**: Beautiful theme switching with smooth transitions
- **Responsive Design**: Optimized for desktop and mobile devices

### 🔧 Admin Features
- **Admin Dashboard**: Comprehensive admin panel for content management
- **Song Management**: Add, edit, and delete songs from the platform
- **User Management**: Monitor and manage user accounts
- **Analytics**: View platform usage statistics

### 🎨 UI/UX Features
- **Modern Interface**: Clean, intuitive design with Tailwind CSS
- **Smooth Animations**: Framer Motion powered animations
- **Real-time Updates**: Live updates without page refresh
- **Toast Notifications**: User-friendly feedback system

## 🛠️ Tech Stack

### Frontend
- **React.js** (18.2.0) - Modern UI library
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Axios** - HTTP client
- **React Hot Toast** - Notification system

### Backend
- **Node.js** (15.7.0) - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Cloud image/video management

### Development Tools
- **Nodemon** - Development server
- **Concurrently** - Run multiple commands
- **dotenv** - Environment variables

## 📦 Installation

### Prerequisites
- Node.js (v15.7.0 or higher)
- npm (v7.4.3 or higher)
- MongoDB (local or MongoDB Atlas)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/BEAT-DISTRICT.git
   cd BEAT-DISTRICT
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   npm install
   
   # Install client dependencies
   npm run client-install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   MONGO_URL=mongodb://localhost:27017/music
   # OR for MongoDB Atlas:
   # MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/music
   
   SECRET_KEY=your_jwt_secret_key_here
   
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the application**
   ```bash
   # Development mode (runs both server and client)
   npm run dev
   
   # Or run separately:
   # Server only
   npm run server
   
   # Client only
   npm run client
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🚀 Usage

### For Users
1. **Register/Login**: Create an account or sign in
2. **Browse Music**: Explore the music library
3. **Create Playlists**: Organize your favorite songs
4. **Upload Music**: Add your own songs (if enabled)
5. **Enjoy Music**: Use the player controls for playback

### For Admins
1. **Admin Login**: Access admin panel with admin credentials
2. **Manage Songs**: Add, edit, or remove songs
3. **User Management**: Monitor user accounts
4. **Platform Analytics**: View usage statistics

## 📁 Project Structure

```
BEAT-DISTRICT/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/     # Reusable components
│       ├── pages/         # Page components
│       ├── context/       # React context
│       ├── redux/         # Redux store & slices
│       └── App.js         # Main app component
├── routes/                # API routes
│   ├── userRoute.js       # User authentication routes
│   ├── songsRoute.js      # Song management routes
│   └── adminRoute.js      # Admin routes
├── models/                # Database models
│   ├── userModel.js       # User schema
│   └── songModel.js       # Song schema
├── middlewares/           # Custom middleware
│   └── authMiddleware.js  # JWT authentication
├── config/               # Configuration files
├── uploads/              # File upload directory
├── server.js             # Express server
└── package.json          # Dependencies & scripts
```

## 🔧 API Endpoints

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `POST /api/users/get-user-data` - Get user data (protected)

### Songs
- `GET /api/songs/get-all-songs` - Get all songs
- `POST /api/songs/add-song` - Add new song (admin)
- `PUT /api/songs/update-song` - Update song (admin)
- `DELETE /api/songs/delete-song` - Delete song (admin)

### Admin
- `GET /api/admin/get-all-users` - Get all users (admin)
- `DELETE /api/admin/delete-user` - Delete user (admin)

## 🎨 Theme System

The application features a sophisticated dark/light theme system:

- **Theme Context**: Manages theme state globally
- **Local Storage**: Persists theme preference
- **Tailwind Classes**: Uses `dark:` prefix for theme variants
- **Smooth Transitions**: Framer Motion animations

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for password security
- **Protected Routes**: Middleware for route protection
- **Input Validation**: Server-side validation
- **CORS Configuration**: Cross-origin resource sharing

## 🚀 Deployment

### Heroku Deployment
```bash
# Build the application
npm run heroku-postbuild

# Start the server
npm start
```

### Environment Variables for Production
- Set all environment variables in your hosting platform
- Ensure MongoDB connection string is properly configured
- Configure Cloudinary credentials

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Meet2135**
- GitHub: [@Meet2135](https://github.com/Meet2135)


## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [MongoDB](https://www.mongodb.com/) - Database
- [Cloudinary](https://cloudinary.com/) - Cloud media management

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

⭐ **Star this repository if you found it helpful!** 
