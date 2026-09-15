const auth = firebase.auth();
const db = firebase.database();

// --- Хэрэв аль хэдийн нэвтэрсэн бол шууд чат руу шилжинэ ---
auth.onAuthStateChanged((user) => {
  if (user) {
    window.location.href = "chat.html";
  }
});

// --- Login/Signup хооронд солих ---
const loginView = document.getElementById("login-view");
const signupView = document.getElementById("signup-view");

document.getElementById("show-signup").addEventListener("click", () => {
  loginView.classList.add("hidden");
  signupView.classList.remove("hidden");
});

document.getElementById("show-login").addEventListener("click", () => {
  signupView.classList.add("hidden");
  loginView.classList.remove("hidden");
});

// --- Login ---
document.getElementById("login-btn").addEventListener("click", () => {
  const email = document.getElementById("login-email").value.trim();
  const pass = document.getElementById("login-pass").value;
  const errorEl = document.getElementById("login-error");
  errorEl.textContent = "";

  auth.signInWithEmailAndPassword(email, pass)
    .then(() => { window.location.href = "chat.html"; })
    .catch((err) => { errorEl.textContent = friendlyError(err); });
});

// --- Signup ---
document.getElementById("signup-btn").addEventListener("click", () => {
  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const pass = document.getElementById("signup-pass").value;
  const errorEl = document.getElementById("signup-error");
  errorEl.textContent = "";

  if (!name) {
    errorEl.textContent = "Нэрээ оруулна уу.";
    return;
  }

  auth.createUserWithEmailAndPassword(email, pass)
    .then((cred) => {
      return cred.user.updateProfile({ displayName: name }).then(() => {
        // Хэрэглэгчийн нэрийг Database-д ч бас хадгална
        return db.ref("users/" + cred.user.uid).set({ name, email });
      });
    })
    .then(() => { window.location.href = "chat.html"; })
    .catch((err) => { errorEl.textContent = friendlyError(err); });
});

function friendlyError(err) {
  switch (err.code) {
    case "auth/invalid-email": return "Имэйл хаяг буруу байна.";
    case "auth/user-not-found": return "Хэрэглэгч олдсонгүй.";
    case "auth/wrong-password": return "Нууц үг буруу байна.";
    case "auth/email-already-in-use": return "Энэ имэйл аль хэдийн бүртгэлтэй байна.";
    case "auth/weak-password": return "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой.";
    default: return "Алдаа гарлаа: " + err.message;
  }
}
