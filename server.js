require("dotenv").config();
const express = require("express");
const connectDB = require("./database/connectDb");
const route = require("./routes");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
connectDB();

app.use("/v1", route);
app.listen(process.env.PORT || 8001, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
