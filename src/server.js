import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPath = path.join(__dirname, "../public");

// serve the login page
app.get("/login", (req, res) => {
  res.sendFile(path.join(publicPath, "pages", "login.html"));
});

// serve the register page
app.get("/register", (req, res) => {
  res.sendFile(path.join(publicPath, "pages", "register.html"));
});
app.use(express.static(publicPath));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
