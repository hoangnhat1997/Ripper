import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 1000 })
  wallet: number;

  @Column()
  salt: string;

  @BeforeInsert()
  async hashPassword() {
    this.salt = await bcrypt.genSalt();
    this.password = this.hash(this.password);
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

  private hash(password: string): string {
    return bcrypt.hash(password, this.salt);
  }
}
