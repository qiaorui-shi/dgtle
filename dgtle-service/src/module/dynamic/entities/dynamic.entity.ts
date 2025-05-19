import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('dynamic')
export class DynamicEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', comment: '动态ID' })
  id: number;

  @Index('idx_user_id')
  @Column({ name: 'user_id', type: 'bigint', comment: '用户ID' })
  userId: number;

  @Column({
    name: 'dynamic_text',
    type: 'text',
    nullable: true,
    comment: '动态文本内容',
    charset: 'utf8mb4',
    collation: 'utf8mb4_0900_ai_ci',
  })
  dynamicText: string | null;

  @Column({ name: 'dynamic_images', type: 'json', nullable: true, comment: '图片地址列表' })
  dynamicImages: any;

  @CreateDateColumn({ name: 'dynamic_publish_time', type: 'datetime', comment: '发布时间' })
  dynamicPublishTime: Date;

  @UpdateDateColumn({ name: 'dynamic_update_time', type: 'datetime', comment: '修改时间' })
  dynamicUpdateTime: Date;
}
