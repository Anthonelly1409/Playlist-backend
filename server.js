// server.js
import { sequelize, Usuario, Filme, Canal, CanalFilme, Playlist, Comentario } from './models/Index.js';

(async () => {
  try {
    // Tenta autenticar a conexão com o banco de dados
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');

    // Cria ou altera as tabelas conforme os modelos
    await sequelize.sync({ alter: true });
    console.log('✅ Tabelas sincronizadas com sucesso.');

    // Cria usuário apenas se ainda não existir
    const [novoUsuario, criado] = await Usuario.findOrCreate({
      where: { login: 'thiago.oliveira' },
      defaults: {
        nome: 'Thiago Oliveira',
        email: 'thiago.oliveira@ifal.edu.br'
      }
    });

    if (criado) {
      console.log('✅ Novo usuário criado com sucesso.');
    } else {
      console.log('ℹ️ Usuário já existia. Nenhum novo registro foi criado.');
    }

    // Lista todos os usuários
    const usuarios = await Usuario.findAll();
    console.log(`👥 Total de usuários: ${usuarios.length}`);
  } catch (error) {
    console.error('❌ Erro ao conectar ou sincronizar o banco de dados:', error);
  } finally {
    // Fecha a conexão com o banco
    await sequelize.close();
  }
})();
