const { expressjwt: jwt } = require("express-jwt");

// Verifica la autenticación usando el JWT
const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,  // Usamos la variable de entorno TOKEN_SECRET
  algorithms: ["HS256"],
  requestProperty: "payload",  // Esto guardará el contenido del JWT en req.payload
  getToken: (req) => {
  
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
      return req.headers.authorization.split(" ")[1];  // Retorna el token sin el 'Bearer'
    }
    return null;  // Si no hay token, no continúa
  },
});

// Middleware para verificar si el usuario es admin
const isAdmin = (req, res, next) => {
  if (req.payload && req.payload.role === "admin") {
    return next();  // Si es admin, continúa con la siguiente función
  }
  return res.status(403).json({ message: "No tienes permisos de administrador" });
};

// Middleware de manejo de errores de autenticación
const handleAuthError = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "Token no válido o expirado" });
  }
  next(err);
};

module.exports = { isAuthenticated, isAdmin, handleAuthError };




