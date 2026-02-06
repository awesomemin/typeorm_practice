import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  Generated,
} from 'typeorm';

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;

  @Column()
  @Generated('uuid')
  additionalId: string;
}
