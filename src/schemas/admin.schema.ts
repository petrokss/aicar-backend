import { object, string, TypeOf, z, optional, number, boolean } from 'zod';
import { ParkingPlaceType } from '../entity/ParkingPlace';
import { AdditionalModuleType } from '../entity/AdditionalModule';

// CAMERA
export const createCameraSchema = object({
  body: object({
    url: string({ required_error: 'Url is required' }),
    username: string({ required_error: 'Username is required' }),
    password: string({ required_error: 'Password is required' }),
    name: string({ required_error: 'Name is required' }),
    description: optional(string())
  })
});

export type createCameraInput = TypeOf<typeof createCameraSchema>['body'];

// PARKING
export const createParkingSchema = object({
  body: object({
    name: string({ required_error: 'Name is required' }),
    locLat: number({ required_error: 'Lattitude is required' }),
    locLong: number({ required_error: 'Longtitude is required' }),
    description: optional(string())
  })
});

export type createParkingInput = TypeOf<typeof createParkingSchema>['body'];

// PARKING SECTOR
export const createParkingSectorSchema = object({
  body: object({
    name: string({ required_error: 'Name is required' }),
    numberOfPlaces: number({ required_error: 'Number of places is required' }),
    parkingId: number({ required_error: 'Parking is requred' }),
    description: optional(string())
  })
});

export type createParkingSectorInput = TypeOf<
  typeof createParkingSectorSchema
>['body'];

// PARKING PLACE
export const createParkingPlaceSchema = object({
  body: object({
    name: string({ required_error: 'Name is required' }),
    x1: number({ required_error: 'X1 is required' }),
    y1: number({ required_error: 'Y1 is required' }),
    x2: number({ required_error: 'X2 is required' }),
    y2: number({ required_error: 'Y2 is required' }),
    x3: number({ required_error: 'X3 is required' }),
    y3: number({ required_error: 'Y3 is required' }),
    x4: number({ required_error: 'X4 is required' }),
    y4: number({ required_error: 'Y4 is required' }),
    isPrimary: boolean({ required_error: 'Is Primary is required' }),
    type: z.nativeEnum(ParkingPlaceType, {
      required_error: 'Type is required'
    }),
    cameraId: number({ required_error: 'Camera is requred' }),
    parkingSectorId: number({ required_error: 'Parking Sector is requred' }),
    description: optional(string())
  })
});

export type createParkingPlaceInput = TypeOf<
  typeof createParkingPlaceSchema
>['body'];

// ADDITIONAL MODULE
export const createAdditionalModuleSchema = object({
  body: object({
    ipAddress: string({ required_error: 'IP address is required' }),
    port: number({ required_error: 'Port is required' }),
    type: z.nativeEnum(AdditionalModuleType, {
      required_error: 'Type is required'
    }),
    description: optional(string())
  })
});

export type createAdditionalModuleInput = TypeOf<
  typeof createAdditionalModuleSchema
>['body'];
