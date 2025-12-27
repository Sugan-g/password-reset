1️⃣ Forgot Password

User enters registered email ID.
Backend checks if the user exists in the database.

If user exists:
A secure random string (reset token) is generated.
Token and expiry time (15 minutes) are saved in DB.
Reset link is sent to the user’s email.

🔐 Example Reset Link:

http://localhost:5173/reset-password/<random_token>

2️⃣ Reset Password

User clicks the reset link from email.
Token is extracted from URL.
Backend validates:
Token exists
Token is not expired
User enters a new password.

Password is:
Hashed using bcrypt
Updated in database
Token and expiry are cleared from DB.
✔ Reset token becomes invalid after use

🔐 Random String (Reset Token) Concept

Generated using Node.js crypto module
Acts as a temporary password reset key
Stored in DB for verification
Expires automatically after defined time
Used only once

const token = crypto.randomBytes(32).toString('hex');

📌 This is NOT a refresh token (JWT).
It is only used for password reset.

⏰ Token Expiry Handling

Token validity: 15 minutes

If expired:

User receives “Invalid or expired token” message
Reset is blocked

🔒 Security Measures Implemented

Password hashing using bcrypt
One-time reset token
Token expiry enforcement
Token cleared after successful reset
No plaintext password storage

📸 Screens Implemented

Forgot Password Screen
Reset Password Screen
Success & Error messages
Responsive UI using Bootstrap

▶️ How to Run the Project
Backend
npm install
npm start

Frontend
npm install
npm run dev

✅ Project Status

✔ Fully functional
✔ Secure
✔ Meets all assignment requirements
✔ Ready for evaluation
