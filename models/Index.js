import sequelize from '../config/database.js';

import Canal from './Canal.js';
import Filme from './Filme.js';
import Usuario from './Usuario.js';
import Playlist from './Playlist.js';
import PlaylistFilme from './PlaylistFilme.js';
import CanalFilme from './CanalFilme.js';
import Comentario from './Comentario.js';
import Mensalidade from './Mensalidade.js';

// Inicializa os models
const CanalModel = Canal(sequelize);
const FilmeModel = Filme(sequelize);
const UsuarioModel = Usuario(sequelize);
const PlaylistModel = Playlist(sequelize);
const PlaylistFilmeModel = PlaylistFilme(sequelize);
const CanalFilmeModel = CanalFilme(sequelize);
const ComentarioModel = Comentario(sequelize);
const MensalidadeModel = Mensalidade(sequelize);

// Exporta os models inicializados
export {
  sequelize,
  CanalModel as Canal,
  FilmeModel as Filme,
  UsuarioModel as Usuario,
  PlaylistModel as Playlist,
  PlaylistFilmeModel as PlaylistFilme,
  CanalFilmeModel as CanalFilme,
  ComentarioModel as Comentario,
  MensalidadeModel as Mensalidade,
};
