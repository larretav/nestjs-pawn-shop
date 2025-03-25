import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
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
      const newAddress = this.addressRepository.create(createAddressDto);
      const addressBd = await this.addressRepository.save(newAddress)

      return addressBd

    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all addresses`;
  }

  async findOne(id: string) {
    try {
      const address = await this.findById(id);

      if (!address)
        throw new NotFoundException('Cliente no encontrado');

      return address;

    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async findById(id: string) {
    try {
      const address = await this.addressRepository.findOne({ where: { id } });
      return address;

    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
