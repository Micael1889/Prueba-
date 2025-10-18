function setupSocket(io) {
  io.on("connection", (socket) => {
    console.log("Cliente conectadooo:", socket.id);

    socket.on("disconnect", () => {
      console.log("Cliente desconectado:", socket.id);
    });

    // Eventos personalizados
    socket.on("miEvento", (data) => {
      console.log("Evento recibido:", data);
      io.emit("notificacion", { mensaje: "Nueva notificación" });
    });
  });
}

module.exports = setupSocket;
