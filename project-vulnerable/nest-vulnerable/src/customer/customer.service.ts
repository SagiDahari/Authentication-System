import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from 'src/auth/models/customer.entity';
import { DataSource, Repository } from 'typeorm';
import { Customer } from './customer.interface';

@Injectable()
export class CustomerService {

    constructor (
        @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
    private readonly dataSource: DataSource
    ) {

    }

    // Adding a customer to the DB
    async create(customer: Customer): Promise<Customer> {
      const query = `
      INSERT INTO customers (idNumber, first_name, last_name)
      VALUES ('${customer.idNumber}', '${customer.first_name}', '${customer.last_name}')`;
      await this.dataSource.query(query);
      return customer;   
      }
    
    
    // Finding all of the customers.
    async findAll(): Promise<Customer[]> {
        const query = `SELECT * FROM customers`
        return await this.dataSource.query(query);
      }

    // finding a customer in DB in order to display later in the front-end.
    async findOne(idNumber: string): Promise<Customer> {
        return await this.customerRepository.findOne({where: {idNumber}});
    }
}
