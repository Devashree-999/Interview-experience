# Interview Experience Platform

A modern web platform where users can browse and share real interview experiences from Indian companies. Built with React, Vite, and Firebase.

## 🚀 Quick Start

### Local Development
```bash
npm install
npm run dev
```

Visit: `http://localhost:5173`

### Before Running
1. Update `.env` file with your Firebase credentials
2. See `DEPLOYMENT_GUIDE.md` for full setup instructions

## ⚡ Features

- **Browse Experiences**: Search and filter interview data
- **User Authentication**: Secure login/register
- **Submit Experiences**: Authenticated users can share interviews
- **Responsive Design**: Mobile-friendly with animations
- **Real-time Data**: Firebase Firestore integration

## 🔧 Tech Stack

- React 19 + Vite
- Firebase (Auth + Firestore)
- React Router v6
- Modern CSS with animations

## 📚 Documentation

- **Setup Instructions**: See `DEPLOYMENT_GUIDE.md`
- **Firebase Config**: Update `.env` file
- **Project Structure**: See below

## 📁 Project Structure

```
src/
├── components/     # Reusable components
├── pages/         # Page components
├── context/       # React Context (Auth, Interview data)
├── config/        # Firebase config
└── App.jsx        # Main app component
```

## 🌐 Deployment

### Easiest: Vercel + GitHub
1. Push code to GitHub
2. Connect to Vercel
3. Add .env variables
4. Deploy with one click!

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

## 🔒 Security

- `.env` file is git-ignored (safe!)
- Firestore security rules included
- Environment variables for sensitive data

## 📝 More Info

See `DEPLOYMENT_GUIDE.md` for:
- Complete Firebase setup
- Step-by-step deployment
- Troubleshooting guide
- Tips for sharing with others

---

Built with ❤️ for job seekers

