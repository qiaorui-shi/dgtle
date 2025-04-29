import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', comment: '用户ID' })
  id: string; // bigint 用 string 表示，避免精度丢失

  @Column({ type: 'varchar', length: 20, comment: '用户昵称' })
  username: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    comment: '用户手机号',
  })
  phone?: string;

  @Column({ type: 'varchar', length: 128, comment: '用户密码' })
  password: string;

  @Column({ type: 'tinyint', comment: '用户账号等级' })
  level: number;

  @Column({ type: 'int', comment: '用户账号等级经验' })
  level_exp: number;
}
