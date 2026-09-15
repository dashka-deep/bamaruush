const auth = firebase.auth();
const db = firebase.database();

// Хоёулаа ижил "өрөө"-нд бичиж байгаа эсэхийг баталгаажуулах түлхүүр.
// Хүсвэл нэрийг өөрчилж болно — гол нь index.html/chat.js хоёулаа адилхан байх ёстой.
const ROOM_ID = "us";
const messagesRef = db.ref("rooms/" + ROOM_ID + "/messages");

const messagesEl = document.getElementById("messages");
const input = document.getElementById("msg-input");
const sendBtn = document.getElementById("send-btn");
const whoAmI = document.getElementById("who-am-i");

let currentUser = null;

// --- Нэвтрээгүй бол login хуудас руу буцаана ---
auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }
  currentUser = user;
  whoAmI.textContent = (user.displayName || user.email) + " ❤";
  listenForMessages();
});

// --- Гарах товч ---
document.getElementById("signout-btn").addEventListener("click", () => {
  auth.signOut().then(() => { window.location.href = "index.html"; });
});

// --- Мессеж илгээх ---
function sendMessage() {
  const text = input.value.trim();
  if (!text || !currentUser) return;

  messagesRef.push({
    text,
    senderId: currentUser.uid,
    senderName: currentUser.displayName || currentUser.email,
    timestamp: firebase.database.ServerValue.TIMESTAMP
  });

  input.value = "";
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

// --- Шинэ мессеж ирэх бүрт дэлгэцэнд нэмнэ ---
function listenForMessages() {
  messagesRef.limitToLast(200).on("child_added", (snapshot) => {
    const msg = snapshot.val();
    appendMessage(msg);
  });
}

function appendMessage(msg) {
  const bubble = document.createElement("div");
  bubble.className = "msg " + (msg.senderId === currentUser.uid ? "msg-mine" : "msg-theirs");

  const textEl = document.createElement("div");
  textEl.textContent = msg.text;
  bubble.appendChild(textEl);

  const metaEl = document.createElement("div");
  metaEl.className = "msg-meta";
  const time = msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";
  metaEl.textContent = (msg.senderId === currentUser.uid ? "Чи" : msg.senderName) + " · " + time;
  bubble.appendChild(metaEl);

  messagesEl.appendChild(bubble);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}
