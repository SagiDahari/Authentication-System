import { IsIdentityCard } from "class-validator";
import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm"


@Entity("customers")
export class CustomerEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    idNumber: string;

    @Column()
    first_name: string; 

    @Column()
    last_name: string;
}