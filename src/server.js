import express from "express";

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("TaskFlow server is running!");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
