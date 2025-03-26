import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Addresses } from './entities/address.entity';

@Module({
  controllers: [AddressesController],
  providers: [AddressesService],
  imports: [
    TypeOrmModule.forFeature([
      Addresses
    ])
  ],
  exports: [AddressesService]
})
export class AddressesModule { }
