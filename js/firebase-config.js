// ⚠️ Firebase console-оос авсан ӨӨРИЙН тохиргоогоо энд тавь.
// Project Settings > General > "Your apps" > Web app > SDK setup and configuration

const firebaseConfig = {
  apiKey: "AIzaSy...........................",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

firebase.initializeApp(firebaseConfig);
