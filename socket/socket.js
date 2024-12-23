
const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chatMessage', async (data) => {
    console.log("🚀 ~ socket.on ~ data:", data)
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};

module.exports = setupSocket;
