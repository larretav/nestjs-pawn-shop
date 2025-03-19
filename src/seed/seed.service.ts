import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HandleExceptions } from 'src/common/exceptions/handleExceptions';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { usersDataTest } from './data/users-data';
import { AdminCredentials } from './interfaces/admin-cred.interface';
import { CustomersService } from 'src/customers/customers.service';
import { customersDataTest } from './data/customers-data';
import { Customer } from 'src/customers/entities/customer.entity';

@Injectable()
export class SeedService {

  constructor(

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly usersService: UsersService,

    @InjectRepository(User)
    private readonly customersRepository: Repository<Customer>,
    private readonly customersService: CustomersService,

  ) { }



  async runSeed() {

    try {
      debugger
      this.usersRepository.delete({});
      this.customersRepository.delete({});

      await this.insertUsers();
      await this.insertCustomers();

      return 'Seed excecuted';

    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }


  private async insertUsers() {
    try {
      const userPromises = usersDataTest.map(user => {
        return this.usersService.create(user)
      });

      await Promise.all(userPromises)
    } catch (error) {
      throw error;
    }
  }



  async createAdminUser(credentials: AdminCredentials) {
    const { userName, password } = credentials;

    if (userName !== 'larretav' || password !== '123Tamarindo')
      throw new UnauthorizedException('Usuario no autorizado');

    try {
      await this.usersService.create({
        firstName: "admin",
        lastName: "admin",
        email: "admin@gmail.com",
        userName: "admin",
        password: "123Tamarindo",
        role: "admin",
      })

      return 'Usuario Admin creado'
    } catch (error) {
      throw error;
    }
  }

  async insertCustomers() {
    try {
      const customerPromises = customersDataTest.map(customer => {
        return this.customersService.create(customer)
      });

      await Promise.all(customerPromises)
    } catch (error) {
      throw error;
    }
  }
}
