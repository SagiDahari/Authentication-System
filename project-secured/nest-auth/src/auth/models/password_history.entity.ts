import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';


@Entity("password_history")
export class PasswordHistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, user => user.passwordHistory)
  user: UserEntity;

  @Column({ nullable: true })
  password1: string;

  @Column({ nullable: true })
  password2: string;

  @Column({ nullable: true })
  password3: string;
}