import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from './config';

import { User } from './entity/User';
import { Camera } from './entity/Camera';
import { Parking } from './entity/Parking';
import { ParkingSector } from './entity/ParkingSector';
import { ParkingPlace } from './entity/ParkingPlace';
import { AdditionalModule } from './entity/AdditionalModule';
import { RecognitionSettings } from './entity/RecognitionSettings';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.dbHost,
  port: Number(config.dbPort),
  username: config.dbUsername,
  password: config.dbPassword,
  database: config.dbDatabase,
  synchronize: true,
  logging: false,
  entities: [
    User,
    Camera,
    Parking,
    ParkingSector,
    ParkingPlace,
    AdditionalModule,
    RecognitionSettings
  ],
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
