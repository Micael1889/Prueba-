const roleMiddleware = (rolesPermitidos) => {
  return (req, res, next) => {
    try {
      const { user } = req;

      if (!user) {
        return res.status(401).json({ error: "Usuario no autenticado" });
      }

      if (!rolesPermitidos.includes(user.rol)) {
        return res
          .status(403)
          .json({ error: "Acceso denegado. Rol insuficiente." });
      }

      next();
    } catch (error) {
      return res.status(500).json({ error: "Error en validación de rol" });
    }
  };
};

module.exports = { roleMiddleware };
