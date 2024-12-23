require("dotenv").config();
const express = require("express");
const { createServer } = require("http");
const connectDB = require("./database/connectDb");
const route = require("./routes");
const cors = require("cors");
const { Server } = require("socket.io");
const setupSocket = require("./socket/socket");

const app = express();

// Create HTTP server
const server = createServer(app);

// Initialize Socket.IO with CORS
const io = new Server(server, { cors: { origin: "*" } });

// CORS setup
app.use(cors());

// JSON body parser
app.use(express.json());

// Define routes
app.use("/v1", route);

// Set up Socket.IO
setupSocket(io);

// Connect to DB
connectDB();

// Start the server
const PORT = process.env.PORT || 8001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
