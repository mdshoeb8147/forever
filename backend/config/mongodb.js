import mongoose from "mongoose";

const connectDB = async () => {
  //   mongoose.connection.on("connected ", () => {
  //     console.log("connected to MongoDB");
  //   });
  //   await mongoose.connect(process.env.MONGODB_URI);

  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.error("MongoDB connection failed:", err);
    });
};

export default connectDB;
