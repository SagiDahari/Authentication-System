import { Body, ConflictException, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, UseInterceptors } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from 'src/auth/dto/customer.dto';
import { Customer } from './customer.interface';
import { AuthInterceptor } from 'src/auth/auth.interceptor';

@Controller('customer')
export class CustomerController {

    constructor ( private customerService: CustomerService) {

    }
@UseInterceptors(AuthInterceptor) // this interceptor is used to verify if the session cookie still exists in order to let only users that are logged in permission to use this method.
@Post('')
async create(@Body() customerDto: CustomerDto) {
    const customer = await this.customerService.findOne(customerDto.idNumber);

        if (customer) {
            throw new ConflictException('This customer is already in the DB.');
        }
    return await this.customerService.create(customerDto);
    }

@UseInterceptors(AuthInterceptor)
@Get('')
async findAll() {
    return await this.customerService.findAll();
    }

@UseInterceptors(AuthInterceptor)
@Get(':idNumber')
async findOne (@Param('idNumber')idNumber: string) {
    const customer = await this.customerService.findOne(idNumber);
  if (!customer) {
    throw new NotFoundException(`Customer with ID Number ${idNumber} not found`);
  }
    return customer;
}


}
