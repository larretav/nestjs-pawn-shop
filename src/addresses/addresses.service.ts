import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { HandleExceptions } from 'src/common/exceptions/handleExceptions';
import { CustomersService } from 'src/customers/customers.service';

@Injectable()
export class AddressesService {

  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,

    private readonly customerService: CustomersService,
  ) { }


  async create(createAddressDto: CreateAddressDto) {

    const { customerId, ...restCreateAddressDto } = createAddressDto;

    try {

      const customer = await this.customerService.findByIdCURP(customerId)

      if (!customer)
        throw new NotFoundException('Cliente no encontrado. Es necesario un cliente existente para asignar la dirección');

      const newAddress = this.addressRepository.create({ ...restCreateAddressDto, customer });
      const addressBd = await this.addressRepository.save(newAddress)

      return addressBd

    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async findAll() {
    try {
      const addressess = await this.addressRepository.find({
        where: { status: 'A' },
      })
      return addressess;
    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async findOne(id: string) {
    try {
      const address = await this.findById(id);

      if (!address)
        throw new NotFoundException('Dirección no encontrada');

      return address;

    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async findById(id: string): Promise<Address | null> {

    if (!id) return null;

    try {
      const address = await this.addressRepository.findOne({ where: { id } });
      return address;

    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    try {

      await this.findOne(id);

      if (updateAddressDto?.customerId)
        throw new BadRequestException('No puedes modificar el cliente de una dirección.');

      const updateAddress = await this.addressRepository.preload({ id, ...updateAddressDto });
      const addressBd = await this.addressRepository.save(updateAddress)

      return addressBd

    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);
      await this.addressRepository.update({ id }, { status: 'I' });

      return 'Cliente eliminado correctamente';

    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }
}
