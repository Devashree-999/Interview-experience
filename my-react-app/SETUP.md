🚀 SETUP INSTRUCTIONS - Interview Experience Platform

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 1: Get Firebase Credentials
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Go to: https://console.firebase.google.com

2. Click "Create a new project" or select an existing one

3. Go to Project Settings (gear icon) > Your apps > Web

4. Copy the config object - it looks like:
   {
     apiKey: "AIzaSyD...",
     authDomain: "your-project-id.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project-id.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc..."
   }

5. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable "Email/Password"

6. Create Firestore Database:
   - Go to Firestore Database
   - Click "Create Database"
   - Start in Test mode

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 2: Update .env File
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Open: .env (in project root folder)

Replace the placeholders with your Firebase values:

VITE_FIREBASE_API_KEY=YOUR_API_KEY_HERE
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id

Example (DO NOT use these - use your own values):
VITE_FIREBASE_API_KEY=AIzaSyDp20K70HV9TT2ykvgBKnTU_kWOSmVNjXY
VITE_FIREBASE_AUTH_DOMAIN=interview-experience-5eb33.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=interview-experience-5eb33
VITE_FIREBASE_STORAGE_BUCKET=interview-experience-5eb33.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=836183698568
VITE_FIREBASE_APP_ID=1:836183698568:web:699855f5e256407ebc433d

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 3: Install & Run
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Install dependencies
npm install

# Run locally
npm run dev

# Open in browser: http://localhost:5173

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 4: Deploy (Optional)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Option A: Deploy to Vercel (Easiest)
1. Push code to GitHub
2. Go to vercel.com
3. Click "Add New Project"
4. Select your GitHub repo
5. Add environment variables (.env values)
6. Click Deploy

Your app will be live at: https://your-project.vercel.app

Option B: Deploy to Firebase Hosting
1. npm install -g firebase-tools
2. firebase login
3. firebase init hosting
4. npm run build
5. firebase deploy

Your app will be live at: https://your-project.web.app

Option C: Deploy to Netlify
1. npm run build
2. Go to netlify.com
3. Drag & drop the 'dist' folder
4. Add environment variables
5. Your app is live!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IMPORTANT: Security Notes
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ .env is in .gitignore - It will NOT be pushed to GitHub
✅ Safe to push code to GitHub
✅ Environment variables are added on deployment platform

❌ DO NOT commit .env to GitHub
❌ DO NOT share your .env file
❌ DO NOT paste credentials in code

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SHARE YOUR APP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Once deployed, share the live link:
https://your-vercel-url.vercel.app

Others can:
- Browse all interview experiences
- Sign up and add their own
- Search and filter experiences
- No installation needed!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FEATURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Search interview experiences
✓ Filter by company, role, difficulty, topics
✓ User authentication (email/password)
✓ Submit interview experiences (after login)
✓ View full interview details
✓ Mobile responsive design
✓ Real-time Firestore database
✓ Anonymous submissions allowed

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TROUBLESHOOTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Issue: "Can't connect to Firebase"
→ Check .env file has correct values
→ Restart dev server: npm run dev

Issue: "Firebase auth not working"
→ Check Email/Password is enabled in Firebase
→ Check Firestore Database exists

Issue: "Build failed"
→ Delete node_modules: rm -rf node_modules
→ Reinstall: npm install
→ Build: npm run build

Issue: ".env variables not working"
→ Restart dev server after updating .env
→ Make sure you used VITE_ prefix

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MORE HELP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

See DEPLOYMENT_GUIDE.md for:
- Complete setup walkthrough
- Step-by-step deployment instructions
- Project structure explanation
- Security best practices

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ready to go! 🚀
