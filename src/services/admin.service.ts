import { FindManyOptions, FindOptionsWhere } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Camera } from '../entity/Camera';
import { Parking } from '../entity/Parking';
import { ParkingSector } from '../entity/ParkingSector';
import { ParkingPlace } from '../entity/ParkingPlace';
import { AdditionalModule } from '../entity/AdditionalModule';
// import { RecognitionSettings } from '../entity/RecognitionSettings';
import {
  createCameraInput,
  createParkingInput,
  createParkingSectorInput,
  createParkingPlaceInput,
  createAdditionalModuleInput
} from '../schemas/admin.schema';

const cameraRepository = AppDataSource.getRepository(Camera);
const parkingRepository = AppDataSource.getRepository(Parking);
const parkingSectorRepository = AppDataSource.getRepository(ParkingSector);
const parkingPlaceRepository = AppDataSource.getRepository(ParkingPlace);
const additionalModuleRepository =
  AppDataSource.getRepository(AdditionalModule);
// const recognitionSettingsRepository = AppDataSource.getRepository(RecognitionSettings);

// CAMERA
export const createCamera = (cameraPayload: createCameraInput) =>
  cameraRepository.insert(cameraPayload);

export const findCameras = (query: FindOptionsWhere<Camera>) =>
  cameraRepository.findBy(query);

export const findCameraBy = (query: FindOptionsWhere<Camera>) =>
  cameraRepository.findOneBy(query);

export const findCamera = (query: FindManyOptions<Camera>) =>
  cameraRepository.find(query);

export const updateCamera = (id: number, query: Partial<createCameraInput>) =>
  cameraRepository.update(id, query);

// PARKING
export const createParking = (parkingPayload: createParkingInput) =>
  parkingRepository.insert(parkingPayload);

export const findParking = (query: FindManyOptions<Parking>) =>
  parkingRepository.find(query);

export const findParkingBy = (query: FindOptionsWhere<Parking>) =>
  parkingRepository.findOneBy(query);

export const updateParking = (id: number, query: Partial<createParkingInput>) =>
  parkingRepository.update(id, query);

// PARKING SECTOR
export const findParkingSectorBy = (query: FindOptionsWhere<ParkingSector>) =>
  parkingSectorRepository.findOneBy(query);

export const createParkingSector = (
  parkingSectorPayload: createParkingSectorInput
) => parkingSectorRepository.insert(parkingSectorPayload);

// PARKING PLACE
export const createParkingPlace = (
  parkingPlacePayload: createParkingPlaceInput
) => parkingPlaceRepository.insert(parkingPlacePayload);

export const findParkingPlaceBy = (query: FindOptionsWhere<ParkingPlace>) =>
  parkingPlaceRepository.findOneBy(query);

export const findParkingPlace = (query: FindManyOptions<ParkingPlace>) =>
  parkingPlaceRepository.find(query);

export const updateParkingPlace = (
  id: number,
  query: Partial<createParkingPlaceInput>
) => parkingPlaceRepository.update(id, query);

// ADDITIONAL MODULE

export const createAdditionalModule = (
  additionalModulePayload: createAdditionalModuleInput
) => additionalModuleRepository.insert(additionalModulePayload);

export const findAdditionalModule = (
  query: FindManyOptions<AdditionalModule>
) => additionalModuleRepository.find(query);

export const findAdditionalModuleBy = (
  query: FindOptionsWhere<AdditionalModule>
) => additionalModuleRepository.findOneBy(query);

export const updateAdditionalModule = (
  id: number,
  query: Partial<createAdditionalModuleInput>
) => additionalModuleRepository.update(id, query);
