import {
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  DeleteDateColumn,
} from 'typeorm';

export class BaseEntity {
  @CreateDateColumn({ name: 'created_at' })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  // created_at!: Date;
  created_at?: Date;

  @UpdateDateColumn()
  @Column({
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: true,
    select: false,
  })
  updated_at?: Date;

  @DeleteDateColumn({ select: false })
  deleted_at?: Date;
}
