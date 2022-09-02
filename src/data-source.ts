import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from './config';

import { User } from './entity/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.dbHost,
  port: Number(config.dbPort),
  username: config.dbUsername,
  password: config.dbPassword,
  database: config.dbDatabase,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [`${__dirname}/migration/*.ts`],
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
