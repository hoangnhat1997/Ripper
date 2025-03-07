import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Program } from '../programs/program.entity';

@Entity()
export class Booking extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  trainee: User;

  @ManyToOne(() => Program, (program) => program.id, { eager: true })
  program: Program;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column('decimal')
  price: number;

  @Column({ default: false })
  cancelled: boolean;
}
