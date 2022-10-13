import { Entity, Column } from 'typeorm';
import Model from './Model';

export enum AdditionalModuleType {
  ANALYTICS = 'ANALYTICS',
  PLATE_RECOGNITION = 'PLATE_RECOGNITION',
  VIOLATOR_DETECT = 'VIOLATOR_DETECT',
  RESERVATION = 'RESERVATION',
  VIDEO_SEARCH = 'VIDEO_SEARCH',
  SECURITY = 'SECURITY',
  DIGITAL_SIGNAGE = 'DIGITAL_SIGNAGE'
}

export enum AdditionalModuleStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  NOT_ADDED = 'NOT_ADDED'
}

@Entity()
export class AdditionalModule extends Model {
  @Column({ length: 100, unique: true })
  ipAddress: string;

  @Column({ unique: true })
  port: number;

  @Column({ length: 100 })
  type: AdditionalModuleType;

  @Column({ length: 100, nullable: true })
  status: AdditionalModuleStatus;

  @Column({ length: 100, nullable: true })
  description: string;
}
