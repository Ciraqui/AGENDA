const prisma = require('../../prisma/prismaClient');
const bcrypt = require('bcrypt');

const usuarioController = {
  criarUsuario: async (req, res) => {
    try {
      const { nome, email, senha, dt_nascimento } = req.body;

      const senhaCriptografada = await bcrypt.hash(senha, 10);

      const novoUsuario = await prisma.usuario.create({
        data: {
          nome,
          email,
          senha: senhaCriptografada,
          dt_nascimento: dt_nascimento ? new Date(dt_nascimento) : null,
          status: true
        }
      });

      return res.status(201).json(novoUsuario);
    } catch (e) {
      console.error('Erro ao criar o usuário!');
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  },
  buscarUsuarios: async (_, res) => {
    try {
      const usuarios = await prisma.usuario.findMany();

      if (!usuarios.length) {
        return res.status(404).json({ error: "Ainda não há nenhum usuário cadastrado!" });
      }

      return res.status(200).json(usuarios);
    } catch (e) {
      console.error('Erro ao buscar os usuários!');
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  },
  buscarUsuario: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);

      const usuario = await prisma.usuario.findFirst({
        where: { id }
      });

      if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado!" });
      }

      return res.status(200).json(usuario);
    } catch (e) {
      console.error('Erro ao buscar o usuário!');
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  },
  atualizarUsuario: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const { nome, senha, dt_nascimento, status } = req.body;

      if (isNaN(id)) {
        return res.status(400).json({ error: 'Parâmetro inválido!' });
      }

      const usuario = await prisma.usuario.findFirst({
        where: { id }
      });

      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado!' });
      }

      const usuarioAtualiazado = await prisma.usuario.update({
        data: {
          nome: nome ?? usuario.nome,
          senha: senha ?? usuario.senha,
          dt_nascimento: new Date(dt_nascimento) ?? usuario.dt_nascimento,
          status: status ?? usuario.status
        },
        where: {
          id
        }
      });

      return res.status(200).json(usuarioAtualiazado);
    } catch (e) {
      console.error('Erro ao atualizar o usuário!');
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  },
  deletarUsuario: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return res.status(400).json({ error: 'Parâmetro inválido!' });
      }

      const usuario = await prisma.usuario.findFirst({
        where: { id }
      });

      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado!' });
      }

      const usuarioDeletado = await prisma.usuario.delete({
        where: { id }
      });

      return res.status(200).json(usuarioDeletado.id);
    } catch (e) {
      console.error('Erro ao deletar o usuário!')
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  }
}

module.exports = usuarioController;