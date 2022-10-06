import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import Model from './Model';
import { ParkingSector } from './ParkingSector';
import { Camera } from './Camera';

export enum ParkingPlaceType {
  STANDARD = 'STANDARD',
  STAFF = 'STAFF',
  EMERGENCY = 'EMERGENCY',
  ELECTRIC = 'ELECTRIC'
}

@Entity()
export class ParkingPlace extends Model {
  @Column({ length: 100, unique: true })
  name: string;

  @Column({ type: 'decimal' })
  x1: number;

  @Column({ type: 'decimal' })
  y1: number;

  @Column({ type: 'decimal' })
  x2: number;

  @Column({ type: 'decimal' })
  y2: number;

  @Column({ type: 'decimal' })
  x3: number;

  @Column({ type: 'decimal' })
  y3: number;

  @Column({ type: 'decimal' })
  x4: number;

  @Column({ type: 'decimal' })
  y4: number;

  @Column({ name: 'is_primary' })
  isPrimary: boolean;

  @Column({ length: 100, default: ParkingPlaceType.STANDARD })
  type: ParkingPlaceType;

  @Column({ name: 'camera_id' })
  cameraId: number;

  @Column({ name: 'parking_sector_id' })
  parkingSectorId: number;

  @ManyToOne(
    () => ParkingSector,
    (parkingSector) => parkingSector.parkingPlaces
  )
  @JoinColumn({ name: 'parking_sector_id' })
  parkingSector: ParkingSector;

  @ManyToOne(() => Camera, (camera) => camera.parkingPlaces)
  @JoinColumn({ name: 'camera_id' })
  camera: Camera;

  @Column({ length: 100, nullable: true })
  description: string;
}
