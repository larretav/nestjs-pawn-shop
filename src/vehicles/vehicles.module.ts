import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
  controllers: [VehiclesController],
  providers: [VehiclesService],
  imports: [
    CustomersModule,
    TypeOrmModule.forFeature([
      Vehicle, 
    ])
  ],
  exports: [
    VehiclesService
  ]
})
export class VehiclesModule {}
