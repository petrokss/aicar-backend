import { Entity, Column, OneToMany } from 'typeorm';
import Model from './Model';
import { ParkingSector } from './ParkingSector';

@Entity()
export class Parking extends Model {
  @Column({ length: 100, unique: true })
  name: string;

  @Column({ name: 'loc_lat', type: 'decimal', unique: true })
  locLat: number;

  @Column({ name: 'loc_long', type: 'decimal', unique: true })
  locLong: number;

  @Column({ length: 100, nullable: true })
  description: string;

  @OneToMany(() => ParkingSector, (parkingSector) => parkingSector.parking)
  parkingSectors: ParkingSector[];
}
