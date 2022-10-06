import { Entity, Column, OneToMany } from 'typeorm';
import Model from './Model';
import { ParkingPlace } from './ParkingPlace';

@Entity()
export class Camera extends Model {
  @Column({ length: 500 })
  url: string;

  @Column({ length: 200, nullable: true })
  username: string;

  @Column({ length: 200, nullable: true })
  password: string;

  @Column({ length: 100, unique: true })
  name: string;

  @Column({ length: 100, nullable: true })
  description: string;

  @OneToMany(() => ParkingPlace, (parkingPlace) => parkingPlace.camera)
  parkingPlaces: ParkingPlace[];
}
