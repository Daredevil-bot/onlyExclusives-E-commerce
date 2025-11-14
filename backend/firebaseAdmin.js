const admin = require("firebase-admin");
const serviceAccount = require("./config/fbServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log("🔥 Firebase Admin initialized");

const adminAuth = admin.auth();
module.exports = { adminAuth };
