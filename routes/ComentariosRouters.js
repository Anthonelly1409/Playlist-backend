import express from 'express';
import { Comentario, Usuario, Filme } from '../models/Index.js';

const router = express.Router();

// GET /comentarios - Lista todos os comentários (pode filtrar por id_filme ou id_usuario)
router.get('/', async (req, res) => {
  const { id_filme, id_usuario } = req.query;

  const where = {};
  if (id_filme) where.id_filme = id_filme;
  if (id_usuario) where.id_usuario = id_usuario;

  try {
    const comentarios = await Comentario.findAll({
      where,
      include: [
        { model: Usuario, attributes: ['id', 'nome'] },
        { model: Filme, attributes: ['id', 'titulo'] },
      ],
      order: [['data_comentario', 'DESC']],
    });

    res.json(comentarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar comentários.' });
  }
});

// POST /comentarios - Criar um novo comentário
router.post('/', async (req, res) => {
  const { id_usuario, id_filme, texto } = req.body;

  if (!id_usuario || !id_filme || !texto) {
    return res.status(400).json({ error: 'Campos obrigatórios: id_usuario, id_filme e texto.' });
  }

  try {
    const comentario = await Comentario.create({
      id_usuario,
      id_filme,
      texto,
      data_comentario: new Date(),
    });

    res.status(201).json(comentario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar comentário.' });
  }
});

// DELETE /comentarios/:id - Excluir um comentário por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Comentario.destroy({
      where: { id },
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Comentário não encontrado.' });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar comentário.' });
  }
});

export default router;
