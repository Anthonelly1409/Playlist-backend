import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV || 'development';

// Se for ambiente de teste, usa playlist_test
const database = env === 'test' ? `${process.env.DB_NAME}_test` : process.env.DB_NAME;

const sequelize = new Sequelize(
  database,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: false, // Mude para true se quiser ver os comandos SQL rodando
  }
);

export default sequelize;
