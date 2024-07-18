import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from 'src/auth/models/customer.entity';
import { Repository } from 'typeorm';
import { Customer } from './customer.interface';

@Injectable()
export class CustomerService {

    constructor (
        @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
    ) {

    }

    // Adding a customer to the DB
    async create(customer: Customer): Promise<Customer> {
        return await this.customerRepository.save(customer);   
      }
    
    
    // Finding all of the customers.
    async findAll(): Promise<Customer[]> {
        return await this.customerRepository.find();
      }

    // finding a customer in DB in order to display later in the front-end.
    async findOne(idNumber: string): Promise<Customer> {
        return await this.customerRepository.findOne({where: {idNumber}});
    }
}
