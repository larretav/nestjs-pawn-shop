import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { HandleExceptions } from 'src/common/exceptions/handleExceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VehiclesService {

  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>
  ) { }

  async create(createVehicleDto: CreateVehicleDto) {
    try {
      // const vehicle = this.vehicleRepository.create(createVehicleDto);
      // await this.vehicleRepository.insert(vehicle);

      // return vehicle;
      return createVehicleDto;
    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all vehicles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicle`;
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return `This action updates a #${id} vehicle`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}
