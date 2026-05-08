const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const createmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    const minEmail = "min@example.com";
    const minPassword = "min123password";

    // Delete existing min if any
    await User.deleteOne({ email: minEmail });
    console.log("Existing min deleted (if any).");

    const min = new User({
      name: "Super min",
      email: minEmail,
      password: minPassword, // Model will hash this automatically
      role: "min",
      isActive: true
    });

    await min.save();
    console.log("min created successfully!");
    console.log("Email:", minEmail);
    console.log("Password:", minPassword);

    process.exit();
  } catch (err) {
    console.error("Error creating min:", err.message);
    process.exit(1);
  }
};

createmin();
