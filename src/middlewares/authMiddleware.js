const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // 1. Leo el header
  if (!authHeader) {
    return res.status(401).json({ error: "Token no proporcionado" }); // 2. Si no hay token, corto
  }

  const token = authHeader.split(" ")[1]; // "Bearer <token>"
  if (!token) {
    return res.status(401).json({ error: "Token inválido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // 3. Verifico token
    req.user = decoded; // 4. Guardo datos del usuario en req
    next(); // 5. Paso al siguiente handler
  } catch (err) {
    return res.status(403).json({ error: "Token no válido o expirado" });
  }
};

module.exports = { authMiddleware };
