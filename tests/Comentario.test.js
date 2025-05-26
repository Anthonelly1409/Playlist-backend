import { expect } from 'chai';
import { sequelize, db } from './setup.js';

describe('Comentario Model', () => {
  // Limpa o banco antes de cada teste para evitar duplicidade
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  // Função para criar usuário com login único
  const criarUsuario = () => db.Usuario.create({
    login: `teste_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
    nome: 'Usuário Teste',
  });

  // Função para criar filme (pode repetir, pois banco é limpo)
  const criarFilme = () => db.Filme.create({
    titulo: 'Filme Teste',
    genero: 'Ação',
    duracao: 120,
    ano_lancamento: 2023,
    nota_avaliacao: 8.5,
  });

  it('Deve criar um comentário com dados válidos', async () => {
    const usuario = await criarUsuario();
    const filme = await criarFilme();

    const comentario = await db.Comentario.create({
      id_usuario: usuario.id,
      id_filme: filme.id,
      texto: 'Ótimo filme!',
      avaliacao: 9.0,
    });

    expect(comentario).to.have.property('id');
    expect(comentario.id_usuario).to.equal(usuario.id);
    expect(comentario.id_filme).to.equal(filme.id);
    expect(comentario.texto).to.equal('Ótimo filme!');
    expect(parseFloat(comentario.avaliacao)).to.equal(9);
  });

  it('Não deve criar um comentário sem texto', async () => {
    const usuario = await criarUsuario();
    const filme = await criarFilme();

    try {
      await db.Comentario.create({
        id_usuario: usuario.id,
        id_filme: filme.id,
        // texto omitido para causar erro
        avaliacao: 9.0,
      });
      expect.fail('Deveria ter lançado um erro de validação');
    } catch (error) {
      expect(error.name).to.equal('SequelizeValidationError');
    }
  });

  it('Não deve criar um comentário com avaliação fora do intervalo', async () => {
    const usuario = await criarUsuario();
    const filme = await criarFilme();

    try {
      await db.Comentario.create({
        id_usuario: usuario.id,
        id_filme: filme.id,
        texto: 'Comentário Inválido',
        avaliacao: 11,
      });
      expect.fail('Deveria ter lançado um erro de validação');
    } catch (error) {
      expect(error.name).to.equal('SequelizeValidationError');
    }
  });
});
