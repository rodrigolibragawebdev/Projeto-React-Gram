const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
  // escrever certinho aqui
  const authHeader = req.headers["authorization"];
  // separando o array em duas partes tem que botar um espaço "<espaço>"
  // Bearer blablablalbatoken
  const token = authHeader && authHeader.split(" ")[1];

  //check if header has a token
  if (!token) return res.status(401).json({ errors: ["Acesso negado!"] });

  //check if token is valid
  try {
    // retorna um obj com tds propriedades do token
    const verified = jwt.verify(token, jwtSecret);
    req.user = await User.findById(verified.id).select("-password");
    next();
  } catch (err) {
    res.status(400).json({ errors: ["O Token é inválido!"] });
  }
};

module.exports = authGuard;
