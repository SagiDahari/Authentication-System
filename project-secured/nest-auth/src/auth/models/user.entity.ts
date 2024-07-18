import { Exclude } from "class-transformer";
import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm"
import { PasswordHistoryEntity } from "./password_history.entity";





@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string; 

    @Column()
    last_name: string;

    @Column({unique:true})
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ default: 0 })
    loginAttempts: number;

    @Column({ default: false })
    isLocked: boolean;

    @OneToOne(() => PasswordHistoryEntity, passwordHistory => passwordHistory.user)
    @JoinColumn()
    passwordHistory: PasswordHistoryEntity;

  

}
