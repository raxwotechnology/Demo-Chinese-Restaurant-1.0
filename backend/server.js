const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db"); // Import db.js
const authRoute = require("./routes/authRoute");
const path = require("path");
const fs = require("fs");
const app = express();

// Serve static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

dotenv.config();

app.use(express.json());
app.use(cors());

// Connect to DB
connectDB();

app.use("/api/auth", authRoute);

// Serve static frontend if it exists
const frontendPath = path.join(__dirname, "../frontend/build");
if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
  app.get("*", (req, res) => {
    if (!req.path.startsWith("/api")) {
      res.sendFile(path.join(frontendPath, "index.html"));
    }
  });
} else {
  app.get("/", (req, res) => {
    res.send("Gasma Chinese Restaurant API is running...");
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));