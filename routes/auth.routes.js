const express = require("express");
const router = express.Router();

// ℹ️ Maneja la encriptación de contraseñas
const bcrypt = require("bcrypt");

// ℹ️ Maneja la generación de JWT
const jwt = require("jsonwebtoken");

// Requiere el modelo User para interactuar con la base de datos
const User = require("../models/User.js");

// Requiere el middleware isAuthenticated para controlar el acceso a rutas específicas
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// Número de rondas para la generación del salt de bcrypt (por defecto 10 rondas)
const saltRounds = 10;

// POST /auth/signup - Crea un nuevo usuario en la base de datos
router.post("/signup", (req, res, next) => {
  const { email, password, name, role } = req.body;

  // Verifica si el email, password o name están vacíos
  if (!email || !password || !name) {
    return res.status(400).json({ message: "Provide email, password, and name" });
  }

  // Verificación del formato del email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Provide a valid email address." });
  }

  // Verificación de la contraseña
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
  }

  // Verifica si el usuario ya existe
  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        return res.status(400).json({ message: "User already exists." });
      }

      // Encriptar la contraseña
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Crear un nuevo usuario en la base de datos con el rol proporcionado (si no se proporciona, por defecto será 'user')
      return User.create({
        email,
        password: hashedPassword,
        name,
        role: role || 'user',  // Asignar 'user' por defecto o el rol proporcionado
      });
    })
    .then((createdUser) => {
      // Verifica que el usuario se haya creado correctamente
      if (!createdUser) {
        return res.status(500).json({ message: "User could not be created." });
      }

      // Deconstruir el usuario recién creado para omitir la contraseña
      const { email, name, _id, role } = createdUser;

      // Crear un objeto que no exponga la contraseña
      const user = { email, name, _id, role };

      // Enviar una respuesta JSON con los datos del usuario
      res.status(201).json({ user: user });
    })
    .catch((err) => {
      console.error(err);
      next(err); // Manejo de errores
    });
});

// POST /auth/login - Verifica el email y la contraseña y devuelve un JWT
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  // Verifica si el email o la contraseña están vacíos
  if (!email || !password) {
    return res.status(400).json({ message: "Provide email and password." });
  }

  // Verifica si el usuario existe
  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(401).json({ message: "User not found." });
      }

      // Compara la contraseña proporcionada con la almacenada en la base de datos
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        const { _id, email, name, role } = foundUser;

        // Crear el payload del JWT
        const payload = { _id, email, name, role };

        // Crear un token JWT y firmarlo
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        // Enviar el token como respuesta
        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => next(err)); // Manejo de errores
});

// GET /auth/verify - Usado para verificar el JWT almacenado en el cliente
router.get("/verify", isAuthenticated, (req, res, next) => {
  // Si el token JWT es válido, el payload será decodificado por el middleware isAuthenticated y estará disponible en req.payload
  res.status(200).json(req.payload);
});

module.exports = router;


