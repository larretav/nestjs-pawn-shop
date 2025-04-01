import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { ILike, Like, Repository } from 'typeorm';
import { HandleExceptions } from 'src/common/exceptions/handleExceptions';
import { isUUID } from 'class-validator';

@Injectable()
export class CustomersService {

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>
  ) { }

  async create(createCustomerDto: CreateCustomerDto) {

    try {
      const customer = await this.findByIdCURP(createCustomerDto.curp);

      if (customer)
        throw new BadRequestException('Ya existe un cliente con esa CURP');

      const newCustomer = this.customerRepository.create(createCustomerDto);
      await this.customerRepository.insert(newCustomer);

      return newCustomer;
    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async findAll() {
    try {
      const customers = await this.customerRepository.find({
        where: { status: 'A' },
      })
      return customers;
    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async findOne(id: string) {
    try {
      const customer = await this.customerRepository.findOne({ where: { id, status: 'A' } });

      if (!customer)
        throw new NotFoundException('Cliente no encontrado')

      return customer
    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    try {
      await this.findOne(id);
      await this.customerRepository.update({ id }, updateCustomerDto);

      return 'Cliente actualizado correctamente';

    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);
      await this.customerRepository.update({ id }, { status: 'I' });

      return 'Cliente eliminado correctamente';

    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async findByIdCURP(term: string): Promise<Customer | null> {

    if (!term) return null;
    
    try {
      const propName = isUUID(term) ? 'id' : 'curp';

      const customer = await this.customerRepository.findOne({ where: { [propName]: term, status: 'A' } });

      return customer;
    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async findByNames(term: string) {
    try {
      const results = await this.customerRepository.find({
        where: [
          { firstName: ILike(`%${term}%`), status: 'A' },
          { lastName: ILike(`%${term}%`), status: 'A' }
        ]
      })

      return results;
    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async getVehicles(id: string) {
    try {
      const results = await this.customerRepository.findOne({
        where: { id, status: 'A' },
        relations: {
          vehicles: true
        }
      })

      return results.vehicles;
    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

}
