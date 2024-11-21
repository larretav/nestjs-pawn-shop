import {  HttpException, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Addresses } from './entities/address.entity';
import { HandleExceptions } from 'src/common/exceptions/handleExceptions';

@Injectable()
export class AddressesService {

  constructor(
    @InjectRepository(Addresses)
    private readonly addressRepository: Repository<Addresses>,
  ) { }


  async create(createAddressDto: CreateAddressDto) {
    try {      
      await this.addressRepository.insert(createAddressDto);    
      return createAddressDto

    } catch (error) {
      console.log(error)
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all addresses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
