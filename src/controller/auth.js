const prisma = require('./../../prisma/prismaClient')
const bcrypt = require('bcrypt');
const jwtConfig = require('./../config/jwtConfig');

const authController = {
  login: async (req, res) => {
    const { email, senha } = req.body;

    const usuario = await prisma.usuario.findUnique({ where: { email } });

    const senhasConferem = await bcrypt.compare(senha, usuario.senha);

    if (!usuario || !senhasConferem) {
      return res.status(401).json({ message: 'Credenciais inválidas!' });
    }

    const token = jwtConfig.generateToken(usuario.id, usuario.role);

    return res.status(200).json({ token });
  },
  autenticarToken: async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    try {
      const user = jwtConfig.verifyToken(token);
      req.user = user;
      next();
    } catch (error) {
      return res.sendStatus(403);
    }
  },
  logout: async (req, res) => {
    try {
      const token = req.headers['authorization'].split(' ')[1];

      jwtConfig.blackListToken(token);

      return res.status(200).json({ message: 'Logout realizado com sucesso!' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao realizar logout.' });
    }
  },
}

module.exports = authController;