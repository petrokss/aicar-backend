import { Entity, Column } from 'typeorm';
import Model from './Model';

@Entity()
export class RecognitionSettings extends Model {
  @Column({ name: 'process_every_n_frame' })
  processEveryNFrame: number;
}
