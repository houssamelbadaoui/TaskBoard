import express from "express";
import session from "express-session";
import path from "node:path";
import { fileURLToPath } from "node:url";

import authRoute from "./routes/auth.register"; // endpoint for registration
import { requireAuth } from "./middleware/require-auth.js"; // authentication middleware

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPath = path.join(__dirname, "../public"); // public files
const privatePath = path.join(__dirname, "../private"); // private files

// middleware to parse json request bodies
app.use(express.json());

//  Configure sessions middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

// register authentication route
app.use("/api/auth", authRoute);

// serve the register page
app.get("/register", (req, res) => {
  res.sendFile(path.join(publicPath, "pages", "register.html"));
});

// serve the login page
app.get("/login", (req, res) => {
  res.sendFile(path.join(publicPath, "pages", "login.html"));
});

app.use(express.static(publicPath));

// handle unexpected errors
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "An unexpected server error occurred",
  });
});

export default app;
