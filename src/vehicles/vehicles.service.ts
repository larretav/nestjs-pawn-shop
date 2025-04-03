import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { HandleExceptions } from 'src/common/exceptions/handleExceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { ILike, Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { CustomersService } from 'src/customers/customers.service';

@Injectable()
export class VehiclesService {

  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,

    private readonly customerService: CustomersService
  ) { }

  async create(createVehicleDto: CreateVehicleDto) {

    const { customerId, ...restCreateVehicleDto } = createVehicleDto;

    try {

      const customer = await this.customerService.findByIdCURP(customerId);

      if (!customer)
        throw new NotFoundException('Cliente no encontrado. Es necesario un cliente existente para asignar el vehículo');

      const vehicle = this.vehicleRepository.create({...restCreateVehicleDto, customer});
      const vehicleBd = await this.vehicleRepository.save(vehicle);

      return vehicleBd;
    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  findAll() {
    try {
      const vehicles = this.vehicleRepository.findBy({ status: 'A' });

      return vehicles;
    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async findOne(id: string) {
    try {

      const vehicle = await this.findByTerm(id);

      if (!vehicle)
        throw new NotFoundException('Vehículo no encontrado')

      return vehicle;
    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto) {
    try {

      await this.findOne(id);

      await this.vehicleRepository.update({ id }, updateVehicleDto);

      return { message: 'Vehículo actualizado correctamente' };

    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async remove(id: string) {
    try {

      await this.findOne(id);

      await this.vehicleRepository.update({ id }, { status: 'I' });

      return { message: 'Vehículo eliminado correctamente' };

    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async findByTerm(term: string) {

    if (!term) return null;

    try {

      if (isUUID(term))
        return await this.vehicleRepository.findOneBy({ id: term, status: 'A' });

      return await this.vehicleRepository.find({
        where: [
          { make: ILike(`%${term}%`), status: 'A' },
          { model: ILike(`%${term}%`), status: 'A' }
        ]
      });

    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }
}
