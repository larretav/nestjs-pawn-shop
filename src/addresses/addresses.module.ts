import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
  controllers: [AddressesController],
  providers: [AddressesService],
  imports: [
    CustomersModule,
    TypeOrmModule.forFeature([
      Address
    ])
  ],
  exports: [AddressesService]
})
export class AddressesModule { }
