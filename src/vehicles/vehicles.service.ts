import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { HandleExceptions } from 'src/common/exceptions/handleExceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { ILike, Repository } from 'typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class VehiclesService {

  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>
  ) { }

  async create(createVehicleDto: CreateVehicleDto) {
    try {
      const vehicle = this.vehicleRepository.create(createVehicleDto);
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

      if (vehicle.length === 0)
        throw new NotFoundException('Vehículo no encontrado')

      return vehicle[0];
    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return `This action updates a #${id} vehicle`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }

  async findByTerm(term: string) {
    try {

      let vehicles = isUUID(term) ? await this.vehicleRepository.findBy({ id: term, status: 'A' }) : null;

      if (!vehicles)
        vehicles = await this.vehicleRepository.find({
          where: [
            { make: ILike(`%${term}%`), status: 'A' },
            { model: ILike(`%${term}%`), status: 'A' }
          ]
        });

      return vehicles;
    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }
}
