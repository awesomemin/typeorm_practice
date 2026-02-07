import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  Generated,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { ProfileModel } from './profile.entity';
import { PostModel } from './post.entity';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  // @Column({
  //   type: 'varchar',
  //   name: 'title',
  //   length: 300,
  //   nullable: true,
  //   update: true,
  //   select: true,
  //   default: 'default value',
  //   unique: false,
  // })
  // title: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;

  @Column()
  @Generated('uuid')
  additionalId: string;

  @OneToOne(() => ProfileModel, (profile) => profile.user, {
    eager: false, // 쿼리에서 relation: true를 안해도 자동으로 가져오도록 설정
    cascade: false, // 저장할 때 한 번에 리터럴로 넣어도 생성되는지 / 안되는지 설정하는 옵션
    nullable: true, // 기본값: true
    onDelete: 'CASCADE', // 참조 당하는 row가 삭제됐을 때 참조하는 row의 행동 설정
  })
  profile: ProfileModel;

  @OneToMany(() => PostModel, (post) => post.author)
  posts: PostModel[];
}
