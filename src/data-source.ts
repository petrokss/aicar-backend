import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: ['entity/*.ts'],
  migrations: [],
  subscribers: []
});

export const initializeAppDataSource = async (
  setupServerCallback: () => void
) => {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');
    setupServerCallback();
  } catch (error) {
    console.log('initialize AppDataSource error: ', error);
  }
};
