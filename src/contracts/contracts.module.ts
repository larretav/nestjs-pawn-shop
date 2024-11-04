import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './entities/contract.entity';

@Module({
  controllers: [ContractsController],
  providers: [ContractsService],
  imports: [
    TypeOrmModule.forFeature([
      Contract, 
    ])
  ],
})
export class ContractsModule {}
