import Koa from 'koa';
import {
  findCamera,
  createCamera,
  findCameraBy,
  updateCamera,
  findParking,
  createParking,
  findParkingBy,
  updateParking,
  findParkingSectorBy,
  createParkingSector,
  findParkingPlaceBy,
  createParkingPlace,
  findParkingPlace,
  updateParkingPlace,
  createAdditionalModule,
  findAdditionalModule,
  findAdditionalModuleBy,
  updateAdditionalModule
} from '../services/admin.service';
import {
  createCameraInput,
  createParkingInput,
  createParkingSectorInput,
  createParkingPlaceInput,
  createAdditionalModuleInput
} from '../schemas/admin.schema';

// CAMERA controllers
export const createCameraController = async (ctx: Koa.Context) => {
  const { url, name } = ctx.request.body as createCameraInput;
  const camera = await findCamera({ where: [{ name }, { url }] });
  if (camera.length > 0) {
    ctx.status = 409;
    ctx.body = { error: 'Camera already exists' };
    return;
  }
  const newCamera = await createCamera(ctx.request.body);
  ctx.status = 200;
  ctx.body = newCamera.identifiers[0];
};

export const findCameraController = async (ctx: Koa.Context) => {
  const id: string = ctx.params.id;
  const camera = await findCameraBy({ id: parseInt(id) });
  if (camera) {
    ctx.status = 200;
    ctx.body = { res: camera };
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Camera not found' };
    return;
  }
};

export const updateCameraController = async (ctx: Koa.Context) => {
  const id: string = ctx.params.id;
  const cameraId = parseInt(id);
  const { url, name } = ctx.request.body as createCameraInput;
  const cameraToBeUpdated = await findCameraBy({ id: cameraId });
  if (cameraToBeUpdated) {
    const camera = await findCamera({ where: [{ name }, { url }] });
    if (camera.length > 0 && camera[0].id.toString() !== id) {
      ctx.status = 409;
      ctx.body = { error: 'Camera with such url or name already exists' };
    } else {
      const result = await updateCamera(cameraId, ctx.request.body);
      ctx.status = 200;
      ctx.body = !!result.affected;
    }
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Camera not found' };
    return;
  }
};

// PARKING controllers
export const createParkingController = async (ctx: Koa.Context) => {
  const { name, locLat, locLong } = ctx.request.body as createParkingInput;
  const parking = await findParking({
    where: [{ name }, { locLat }, { locLong }]
  });
  if (parking.length > 0) {
    ctx.status = 409;
    ctx.body = {
      error: 'Parking with such name or coordinates already exists'
    };
    return;
  }
  const newParking = await createParking(ctx.request.body);
  ctx.status = 200;
  ctx.body = newParking.identifiers[0];
};

export const findParkingController = async (ctx: Koa.Context) => {
  const id: string = ctx.params.id;
  const parking = await findParkingBy({ id: parseInt(id) });
  if (parking) {
    ctx.status = 200;
    ctx.body = { res: parking };
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Parking not found' };
    return;
  }
};

export const updateParkingController = async (ctx: Koa.Context) => {
  const id: string = ctx.params.id;
  const parkingId = parseInt(id);
  const { name, locLat, locLong } = ctx.request.body as createParkingInput;
  const parkingToBeUpdated = await findParkingBy({ id: parkingId });
  if (parkingToBeUpdated) {
    const parking = await findParking({
      where: [{ name }, { locLat }, { locLong }]
    });
    if (parking.length > 0 && parking[0].id.toString() !== id) {
      ctx.status = 409;
      ctx.body = {
        error: 'Parking with such name or coordinates already exists'
      };
    } else {
      const result = await updateParking(parkingId, ctx.request.body);
      ctx.status = 200;
      ctx.body = !!result.affected;
    }
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Camera not found' };
    return;
  }
};

// PARKING SECTOR controllers
export const createParkingSectorController = async (ctx: Koa.Context) => {
  const { name, parkingId } = ctx.request.body as createParkingSectorInput;
  const parkingSector = await findParkingSectorBy({ name });
  if (parkingSector) {
    ctx.status = 409;
    ctx.body = { error: 'Parking sector with such name already exists' };
    return;
  }
  const parking = await findParkingBy({ id: parkingId });
  if (!parking) {
    ctx.status = 404;
    ctx.body = { error: 'Parking not found' };
    return;
  }
  const newParking = await createParkingSector(ctx.request.body);
  ctx.status = 200;
  ctx.body = newParking.identifiers[0];
};

export const findParkingSectorController = async (ctx: Koa.Context) => {
  const id: string = ctx.params.id;
  const parkingSector = await findParkingSectorBy({ id: parseInt(id) });
  if (parkingSector) {
    ctx.status = 200;
    ctx.body = { res: parkingSector };
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Parking sector not found' };
  }
};

// PARKING PLACE Controllers
export const createParkingPlaceController = async (ctx: Koa.Context) => {
  const { name, cameraId, parkingSectorId } = ctx.request
    .body as createParkingPlaceInput;
  const parkingPlace = await findParkingPlace({
    where: [{ name, isPrimary: true }, { name }]
  });
  if (parkingPlace) {
    ctx.status = 409;
    ctx.body = { error: 'Parking place with such name already exists' };
    return;
  }
  const camera = await findCameraBy({ id: cameraId });
  const parkingSector = await findParkingSectorBy({ id: parkingSectorId });
  if (!camera || !parkingSector) {
    ctx.status = 404;
    ctx.body = { error: 'Camera or Parking Sector not found' };
    return;
  }
  const newParkingPlace = await createParkingPlace(ctx.request.body);
  ctx.status = 200;
  ctx.body = newParkingPlace.identifiers[0];
};

export const findParkingPlaceController = async (ctx: Koa.Context) => {
  const id: string = ctx.params.id;
  const parkingPlace = await findParkingPlaceBy({ id: parseInt(id) });
  if (parkingPlace) {
    ctx.status = 200;
    ctx.body = { res: parkingPlace };
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Parking place not found' };
  }
};

export const updateParkingPlaceController = async (ctx: Koa.Context) => {
  const id: string = ctx.params.id;
  const parkingPlaceId = parseInt(id);
  const { name, cameraId, parkingSectorId } = ctx.request
    .body as createParkingPlaceInput;
  const camera = await findCameraBy({ id: cameraId });
  if (!camera) {
    ctx.status = 404;
    ctx.body = { error: 'Camera not found' };
    return;
  }
  const parkingSector = await findParkingSectorBy({ id: parkingSectorId });
  if (!parkingSector) {
    ctx.status = 404;
    ctx.body = { error: 'Parking sector not found' };
    return;
  }

  const parkingPlaceToBeUpdated = await findParkingPlaceBy({
    id: parkingPlaceId
  });
  if (parkingPlaceToBeUpdated) {
    const parkingPlace = await findParkingPlace({
      where: [{ name }, { name, isPrimary: true }]
    });
    if (parkingPlace.length > 0 && parkingPlace[0].id.toString() !== id) {
      ctx.status = 409;
      ctx.body = { error: 'Parking place with such name already exists' };
    } else {
      const result = await updateParkingPlace(parkingPlaceId, ctx.request.body);
      ctx.status = 200;
      ctx.body = !!result.affected;
    }
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Camera not found' };
  }
};

// ADDITIONAL MODULE Controllers
//TODO: check licence server
export const createAdditionalModuleController = async (ctx: Koa.Context) => {
  const { ipAddress, port, type } = ctx.request
    .body as createAdditionalModuleInput;
  const additionalModule = await findAdditionalModule({
    where: { ipAddress, port, type }
  });
  if (additionalModule.length > 0) {
    ctx.status = 409;
    ctx.body = { error: 'Module already exists' };
    return;
  }
  const newAdditionalModule = await createAdditionalModule(ctx.request.body);
  ctx.status = 200;
  ctx.body = newAdditionalModule.identifiers[0];
};

export const findAdditionalModuleController = async (ctx: Koa.Context) => {
  const id: string = ctx.params.id;
  const additionalModule = await findAdditionalModuleBy({ id: parseInt(id) });
  if (additionalModule) {
    ctx.status = 200;
    ctx.body = { res: additionalModule };
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Additional Module not found' };
  }
};
//TODO: check licence server
export const updateAdditionalModuleController = async (ctx: Koa.Context) => {
  const id: string = ctx.params.id;
  const additionalModuleId = parseInt(id);
  const { ipAddress, port, type } = ctx.request
    .body as createAdditionalModuleInput;
  const additionalModuleToBeUpdated = await findAdditionalModuleBy({
    id: additionalModuleId
  });
  if (additionalModuleToBeUpdated) {
    const additionalModule = await findAdditionalModule({
      where: { ipAddress, port, type }
    });
    if (
      additionalModule.length > 0 &&
      additionalModule[0].id.toString() !== id
    ) {
      ctx.status = 409;
      ctx.body = {
        error:
          'Additional Module with such IP address, port and type already exists'
      };
    } else {
      const result = await updateAdditionalModule(
        additionalModuleId,
        ctx.request.body
      );
      ctx.status = 200;
      ctx.body = !!result.affected;
    }
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Additional Module not found' };
  }
};
