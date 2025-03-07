import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Program extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sport: string;

  @Column('decimal')
  hourlyRate: number;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.id, { eager: false })
  coach: User;

  @Column({ default: false })
  deleted: boolean;
}
