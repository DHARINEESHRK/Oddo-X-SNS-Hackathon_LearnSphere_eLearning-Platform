const express = require("express");
const { connectDB1 } = require("./database/db");
const router = require("./routes/routes");
const multerErrorHandler = require("./middleware/multererror");
const cors = require("cors");

connectDB1();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(multerErrorHandler);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
