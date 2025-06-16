// server.js
import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './config/database.js';

import usuarioRoutes from './routes/UsuariosRouters.js';
import filmeRoutes from './routes/FilmesRouters.js';
import canalRoutes from './routes/CanaisRouters.js';
import summaryRouters from './routes/SummaryRouters.js';
import playlistRoutes from './routes/PlaylistsRouters.js';
import comentariosRoutes from './routes/ComentariosRouters.js';  // <-- Aqui a nova rota

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/version', (req, res) => {
  res.json({ status: 'ok', version: '1.0.1' });
});

app.use('/usuarios', usuarioRoutes);
app.use('/filmes', filmeRoutes);
app.use('/canais', canalRoutes);
app.use('/summary', summaryRouters);
app.use('/playlists', playlistRoutes);             // <-- Aqui a rota de playlists
app.use('/comentarios', comentariosRoutes);        // <-- Aqui a rota de comentários

sequelize.sync({ alter: true }).then(() => {
  console.log('Database ok');
  app.listen(port, () => {
    console.log(`Server ok port ${port}`);
  });
})
.catch((error) => {
  console.error('Erro ao conectar:', error);
});
