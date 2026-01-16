# 🚀 Interview Experience Platform - Complete Setup Guide

A modern web application for sharing and browsing real interview experiences from Indian companies.

## 📋 Quick Start

### Prerequisites
- Node.js v20.19.0 or higher
- npm or yarn
- Firebase Account (free)

### 1️⃣ Installation

```bash
# Navigate to project directory
cd my-react-app

# Install dependencies
npm install
```

### 2️⃣ Firebase Setup

#### Get Firebase Credentials:
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a new project" or select existing one
3. Go to **Project Settings** (gear icon in top left)
4. Under **Your apps**, select **Web** (looks like `</>``)
5. Copy the config object

#### Enable Services:
1. Go to **Authentication** > **Sign-in method**
2. Enable **Email/Password**
3. Go to **Firestore Database**
4. Click **Create Database** > Select **Start in test mode**

#### Update .env File:
Open `.env` file in the project root and fill in your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=YOUR_API_KEY_HERE
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### 3️⃣ Run Locally

```bash
npm run dev
```

Visit: `http://localhost:5173`

---

## 🌐 Deploy for Others to Use

### Option 1: GitHub + Vercel (Recommended - Easiest)

#### Step 1: Create GitHub Repository

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Interview Experience Platform"

# Create new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/interview-platform.git
git branch -M main
git push -u origin main
```

#### Step 2: Deploy on Vercel

1. Go to [Vercel](https://vercel.com/)
2. Click **Add New Project**
3. Select your GitHub repository
4. Click **Import**
5. Go to **Environment Variables**
6. Add all 6 Firebase environment variables from your `.env` file
7. Click **Deploy**

**Your app is now live!** Share the Vercel URL with anyone.

---

### Option 2: Firebase Hosting

#### Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

#### Step 2: Initialize Firebase

```bash
firebase login  # Sign in with your Google account
firebase init hosting
```

When prompted:
- Select your Firebase project
- Set public directory to: `dist`
- Configure as SPA: `Yes`
- Set up automatic builds: `No` (skip for now)

#### Step 3: Build and Deploy

```bash
npm run build
firebase deploy
```

Your app will be live at: `https://your-project-id.web.app`

---

### Option 3: Netlify

#### Step 1: Build the Project

```bash
npm run build
```

#### Step 2: Deploy

1. Go to [Netlify](https://netlify.com)
2. Drag and drop the `dist` folder
3. Add environment variables in **Site Settings**
4. Your app is live!

---

## 🏗️ Project Structure

```
my-react-app/
├── src/
│   ├── components/
│   │   └── ExperienceCard.jsx
│   │   └── ExperienceCard.css
│   ├── context/
│   │   ├── AuthContext.jsx         # User authentication logic
│   │   └── InterviewContext.jsx    # Interview data management
│   ├── pages/
│   │   ├── Home.jsx                # Landing page
│   │   ├── Login.jsx               # User login
│   │   ├── Register.jsx            # User registration
│   │   ├── AddExperience.jsx       # Submit interview (auth required)
│   │   ├── SearchResults.jsx       # Browse & filter
│   │   └── ExperienceDetails.jsx   # Full experience view
│   ├── config/
│   │   └── firebase.js             # Firebase setup
│   ├── App.jsx                     # Main app
│   ├── App.css                     # App styles
│   └── main.jsx                    # Entry point
├── .env                            # ⚠️ Keep secret!
├── .env.example                    # Template (safe to share)
├── .gitignore                      # Excludes .env
├── package.json
├── vite.config.js
└── README.md
```

---

## 👥 User Features

### For Anonymous Users
- ✅ View all interview experiences
- ✅ Search by company, role, difficulty
- ✅ Filter by topics (DSA, React, HR, System Design)
- ❌ Cannot add experiences (must sign up)

### For Registered Users
- ✅ Do everything anonymous users can do
- ✅ Click "Add Experience" button
- ✅ Submit interview details with:
  - Company name & role
  - Experience level
  - Multiple interview rounds
  - Topics covered in each round
  - Questions asked
  - Difficulty and final result
  - Option to stay anonymous

---

## 🔑 Key Features Explained

### 🔍 Search & Filter
- Real-time filtering
- Search by company or role
- Filter by difficulty, experience level, topics
- Instant results update

### 🏢 Experience Submission
- Support for multiple interview rounds
- Track different topics per round
- Record questions and difficulty per round
- Choose to stay anonymous

### 🛡️ Security
- Email/password authentication
- Firestore security rules
- Sensitive data not exposed
- .env file is git-ignored

---

## 🚨 Important Security Notes

### DO NOT share these files publicly:
- ❌ `.env` file (contains API keys)
- ❌ `firebase.json`

### DO share:
- ✅ `.env.example` (template)
- ✅ Code repository
- ✅ Deployed app link

### Protect Your .env:
The `.env` file is in `.gitignore` - it will NOT be pushed to GitHub. Safe!

---

## 🐛 Troubleshooting

### "Can't connect to Firebase"
```bash
# Check your .env file has correct values
# Restart dev server: npm run dev
```

### "Port 5173 already in use"
```bash
# Use a different port
npm run dev -- --port 3000
```

### "Build failed"
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### "Firebase auth not working"
- ✅ Check Email/Password is enabled in Firebase
- ✅ Check Firestore Database exists
- ✅ Check .env has correct project ID

---

## 📚 Learn More

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Firebase Docs](https://firebase.google.com/docs)
- [React Router](https://reactrouter.com)

---

## 📝 Next Steps

1. ✅ Update `.env` with Firebase credentials
2. ✅ Run `npm install`
3. ✅ Run `npm run dev` locally
4. ✅ Test the app
5. ✅ Push to GitHub
6. ✅ Deploy to Vercel/Firebase/Netlify
7. ✅ Share the link!

---

## 🎯 Tips for Sharing

Share this link with friends:
```
https://your-vercel-url.vercel.app
```

They can:
- Browse all interview experiences
- Register and add their own
- Share with others

No installation needed - it just works! 🎉

---

## 📞 Support

- Check error messages carefully
- Review Firebase console for issues
- Verify all .env variables are correct
- Ensure Firestore security rules allow read/write

---

**Happy interviewing! 🚀**
