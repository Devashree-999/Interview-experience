# Interview Experience Platform - Firebase Setup Guide

## Overview
This is a React + Vite application for sharing and browsing interview experiences with Firebase integration for authentication and data storage.

## Features
- ✅ User authentication (Login/Register) with Firebase
- ✅ Submit interview experiences with multiple rounds
- ✅ Browse and filter experiences by company, role, topic, difficulty
- ✅ Real-time data storage in Firestore
- ✅ Responsive design for all devices
- ✅ Anonymous submission option

## Firebase Setup Instructions

### 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a new project"
3. Enter project name (e.g., "interview-platform")
4. Accept terms and click "Create project"
5. Wait for project setup to complete

### 2. Enable Authentication
1. In Firebase Console, go to **Authentication**
2. Click **Get Started**
3. Select **Email/Password** provider
4. Enable it and click **Save**

### 3. Create Firestore Database
1. In Firebase Console, go to **Firestore Database**
2. Click **Create Database**
3. Start in **test mode** (for development)
4. Choose a location (closest to your users)
5. Click **Create**

### 4. Get Firebase Configuration
1. In Firebase Console, click the **Settings icon** (⚙️)
2. Select **Project Settings**
3. Scroll to **Your apps** section
4. Click **Config** and copy the Firebase config object

### 5. Setup Environment Variables
1. Create `.env` file in the project root (if not exists)
2. Copy the configuration from `.env.example`:
```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

3. Replace the values with your actual Firebase configuration

### 6. Install Dependencies
```bash
npm install
```

## Running the Application

### Development Mode
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Firestore Database Structure

### Collections

#### `experiences`
Stores all interview experiences submitted by users.

**Document Structure:**
```javascript
{
  id: "auto-generated",
  company: "Google",
  jobRole: "SDE Intern",
  experienceLevel: "Fresher",
  overallDifficulty: "Hard",
  result: "Selected",
  anonymous: false,
  rounds: [
    {
      name: "Online Assessment",
      difficulty: "Medium",
      topicsCovered: ["DSA"],
      questions: "Given an array, find..."
    }
  ],
  submittedAt: "1/13/2024",
  submittedBy: "user_uid",
  submittedByEmail: "user@example.com",
  createdAt: 1705142400000
}
```

## User Authentication Flow

1. **Register**: Users create account with email and password
2. **Login**: Users sign in with email and password
3. **Add Experience**: Only logged-in users can submit experiences
4. **Browse**: All users (logged in or not) can browse experiences
5. **Logout**: Users can logout from navbar

## Security Rules

### Firestore Rules (for production)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read experiences
    match /experiences/{document=**} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.submittedBy;
    }
  }
}
```

## Important Notes

⚠️ **Development Setup**
- The `.env` file uses test mode credentials
- Test mode allows unrestricted access (fine for development)
- Always switch to proper security rules before production

⚠️ **Production Setup**
- Update Firestore security rules (see above)
- Use environment variables for sensitive data
- Enable Firebase authentication options as needed

## Troubleshooting

### "Firebase is not initialized"
- Ensure `.env` file exists with correct Firebase credentials
- Check that environment variable names match in `firebase.js`

### "User not authenticated"
- User must be logged in to submit experiences
- Check Firebase Authentication is enabled in console

### "Firestore database not found"
- Ensure Firestore Database is created in Firebase Console
- Check that database location is selected

## Project Structure
```
src/
├── config/
│   └── firebase.js          # Firebase initialization
├── context/
│   ├── AuthContext.jsx      # Authentication context
│   └── InterviewContext.jsx # Interview data context
├── pages/
│   ├── Home.jsx
│   ├── AddExperience.jsx
│   ├── SearchResults.jsx
│   ├── ExperienceDetails.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── *.css
├── components/
│   ├── ExperienceCard.jsx
│   └── ExperienceCard.css
├── App.jsx
├── App.css
└── main.jsx
```

## Technologies Used
- **React** 19.2.0 - UI framework
- **React Router DOM** 6.x - Client-side routing
- **Firebase** 11.x - Backend, Auth & Database
- **Vite** 7.x - Build tool
- **CSS3** - Styling

## Support
For Firebase documentation: https://firebase.google.com/docs
For React documentation: https://react.dev
For Vite documentation: https://vite.dev
