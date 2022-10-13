import Router from '@koa/router';
import { validateUserRole, checkIfTokenPresent } from '../middlewares';
import {
  createCameraController,
  findCameraController,
  updateCameraController,
  createParkingController,
  findParkingController,
  updateParkingController,
  createParkingSectorController,
  findParkingSectorController,
  createParkingPlaceController,
  findParkingPlaceController,
  updateParkingPlaceController,
  createAdditionalModuleController,
  findAdditionalModuleController,
  updateAdditionalModuleController
} from '../controllers/admin.controller';
import { Role } from '../entity/User';

const router = new Router();

// CAMERA CRUDs
router.post(
  '/config/camera',
  checkIfTokenPresent,
  validateUserRole(Role.ADMIN),
  createCameraController
);
router.get(
  '/config/camera/:id',
  checkIfTokenPresent,
  validateUserRole(Role.ADMIN),
  findCameraController
);
router.put(
  '/config/camera/:id',
  checkIfTokenPresent,
  validateUserRole(Role.ADMIN),
  updateCameraController
);
// TODO:
// router.get('/config/camera', checkIfTokenPresent, validateUserRole(Role.ADMIN), findCamerasController);

// PARKING CRUDs
router.post(
  '/config/parking',
  checkIfTokenPresent,
  validateUserRole(Role.ADMIN),
  createParkingController
);
router.get(
  '/config/parking/:id',
  checkIfTokenPresent,
  validateUserRole(Role.ADMIN),
  findParkingController
);
// TODO:
// router.get('/config/parking/', checkIfTokenPresent, validateUserRole(Role.ADMIN), findParkingsController);
router.put(
  '/config/parking/:id',
  checkIfTokenPresent,
  validateUserRole(Role.ADMIN),
  updateParkingController
);

// PARKING SECTOR CRUDs
router.post(
  '/config/parking-sector',
  checkIfTokenPresent,
  validateUserRole(Role.ADMIN),
  createParkingSectorController
);
router.get(
  '/config/parking-sector/:id',
  checkIfTokenPresent,
  validateUserRole(Role.ADMIN),
  findParkingSectorController
);
// TODO:
// router.get('/config/parking-sector/', checkIfTokenPresent, validateUserRole(Role.ADMIN), findParkingSectorsController);

// PARKING PLACE CRUDs
router.post(
  '/config/parking-place',
  checkIfTokenPresent,
  validateUserRole(Role.ADMIN),
  createParkingPlaceController
);
router.get(
  '/config/parking-place/:id',
  checkIfTokenPresent,
  validateUserRole(Role.ADMIN),
  findParkingPlaceController
);
router.put(
  '/config/parking-place/:id',
  checkIfTokenPresent,
  validateUserRole(Role.ADMIN),
  updateParkingPlaceController
);
// TODO:
// router.get('/config/parking-place/', checkIfTokenPresent, validateUserRole(Role.ADMIN), findParkingsController);

// ADDITIONAL MODULE CRUDs
router.post(
  '/config/additional-module',
  checkIfTokenPresent,
  validateUserRole(Role.ADMIN),
  createAdditionalModuleController
);
// router.get('/config/additional-module', checkIfTokenPresent, validateUserRole(Role.ADMIN), findAdditionalModulesController);
router.get(
  '/config/additional-module/:id',
  checkIfTokenPresent,
  validateUserRole(Role.ADMIN),
  findAdditionalModuleController
);
router.put(
  '/config/additional-module/:id',
  checkIfTokenPresent,
  validateUserRole(Role.ADMIN),
  updateAdditionalModuleController
);

// RECOGNITION SETTINGS CRUDs
// router.put('/config/recognition-settings', checkIfTokenPresent, validateUserRole(Role.ADMIN), updateRecognitionSettingsController);
// router.get('/config/recognition-settings', checkIfTokenPresent, validateUserRole(Role.ADMIN), findRecognitionSettingsController);

export default router;
