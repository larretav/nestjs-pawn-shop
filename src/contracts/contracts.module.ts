import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './entities/contract.entity';
import { CustomersModule } from 'src/customers/customers.module';
import { VehiclesModule } from 'src/vehicles/vehicles.module';
import { AddressesModule } from 'src/addresses/addresses.module';

@Module({
  controllers: [ContractsController],
  providers: [ContractsService],
  imports: [
    CustomersModule,
    VehiclesModule,
    AddressesModule,
    TypeOrmModule.forFeature([
      Contract, 
    ])
  ],
})
export class ContractsModule {}
