import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'translations' })
export default class Translation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'source' })
  source: string;

  @Column({ name: 'target' })
  target: string;

  @Column({ name: 'source_language' })
  sourceLanguage: string;

  @Column({ name: 'target_language' })
  targetLanguage: string;
}
