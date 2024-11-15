import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { HandleExceptions } from 'src/common/exceptions/handleExceptions';

@Injectable()
export class CustomersService {

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>
  ) { }

  create(createCustomerDto: CreateCustomerDto) {

    try {
      // const vehicle = this.vehicleRepository.create(createVehicleDto);
      // await this.vehicleRepository.insert(vehicle);

      // return vehicle;
      return createCustomerDto;
    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all customers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
