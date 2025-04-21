const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://nikhilkosi89:N1papaji@cluster0.ex7chlf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
