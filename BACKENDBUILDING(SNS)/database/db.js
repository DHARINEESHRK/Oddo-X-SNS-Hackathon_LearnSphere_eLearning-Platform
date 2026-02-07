const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB1 = async () => {
  try {
    await mongoose.connect(process.env.DB1);
    console.log("MongoDB1 Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};


// const connectDB2 = async () => {
//   try {
//     await mongoose.connect(process.env.DB2);
//     console.log("MongoDB2 Connected");
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };

  module.exports = {connectDB1};