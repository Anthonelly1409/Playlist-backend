import express from 'express';
import { Usuario } from '../models/Index.js';

const router = express.Router();

// Rota GET - Listar todos os usuários
router.get('/', async (_req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar usuários.' });
  }
});

// Rota GET - Buscar usuário por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar usuário.' });
  }
});

// Rota POST - Criar um novo usuário
router.post('/', async (_req, res) => {
  try {
    const usuario = await Usuario.create(_req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao criar usuário.' });
  }
});

// Rota DELETE - Deletar um usuário pelo ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    await usuario.destroy();
    res.json({ mensagem: 'Usuário deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar usuário.' });
  }
});

export default router;
