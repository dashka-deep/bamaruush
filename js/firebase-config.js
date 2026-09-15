// ⚠️ Firebase console-оос авсан ӨӨРИЙН тохиргоогоо энд тавь.
// Project Settings > General > "Your apps" > Web app > SDK setup and configuration

const firebaseConfig = {
  apiKey: "AIzaSyAd1vjbLNGkaqV2Y9TbR9CGS_62R72Zff0",
  authDomain: "dashka-96333.firebaseapp.com",
  // ⚠️ Realtime Database-аа үүсгэсний дараа Firebase console дээрх
  // Realtime Database хуудасны URL мөрөнд гарч ирэх утгыг энд тавь, жишээ нь:
  // "https://dashka-96333-default-rtdb.<region>.firebasedatabase.app"
  databaseURL: "PUT_YOUR_REALTIME_DATABASE_URL_HERE",
  projectId: "dashka-96333",
  storageBucket: "dashka-96333.firebasestorage.app",
  messagingSenderId: "488607437519",
  appId: "1:488607437519:web:78d7d430190ca070e99dba"
};

firebase.initializeApp(firebaseConfig);
