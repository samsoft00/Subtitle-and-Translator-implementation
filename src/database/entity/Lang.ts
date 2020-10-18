import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'langs' })
export default class Language extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'key' })
  key: string;

  @Column({ name: 'value' })
  value: string;
}
