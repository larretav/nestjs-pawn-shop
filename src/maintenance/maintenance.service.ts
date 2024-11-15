import { Injectable } from '@nestjs/common';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { HandleExceptions } from 'src/common/exceptions/handleExceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Maintenance } from './entities/maintenance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MaintenanceService {

  constructor(
    @InjectRepository(Maintenance)
    private readonly maintenanceRepository: Repository<Maintenance>
  ) { }

  create(createMaintenanceDto: CreateMaintenanceDto) {
    try {
      // const vehicle = this.vehicleRepository.create(createVehicleDto);
      // await this.vehicleRepository.insert(vehicle);

      // return vehicle;
      return createMaintenanceDto;
    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all maintenance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} maintenance`;
  }

  update(id: number, updateMaintenanceDto: UpdateMaintenanceDto) {
    return `This action updates a #${id} maintenance`;
  }

  remove(id: number) {
    return `This action removes a #${id} maintenance`;
  }
}
