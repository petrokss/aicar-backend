import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import Model from './Model';
import { Parking } from './Parking';
import { ParkingPlace } from './ParkingPlace';

@Entity()
export class ParkingSector extends Model {
  @Column({ name: 'number_of_places' })
  numberOfPlaces: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column({ length: 100, nullable: true })
  description: string;

  @Column({ name: 'parking_id' })
  parkingId: number;

  @ManyToOne(() => Parking, (parking) => parking.parkingSectors)
  @JoinColumn({ name: 'parking_id' })
  parking: Parking;

  @OneToMany(() => ParkingPlace, (parkingPlace) => parkingPlace.parkingSector)
  parkingPlaces: ParkingPlace[];
}
