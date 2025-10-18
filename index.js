const app = require("./src/server");
const { sequelize } = require("./src/models");
const http = require("http");
const { Server } = require("socket.io");
const setupSocket = require("./src/sockets/socket");
const PORT = 3001;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
setupSocket(io);

// Sincroniza la base de datos y luego inicia el servidor
sequelize
  .sync({ alter: false })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
