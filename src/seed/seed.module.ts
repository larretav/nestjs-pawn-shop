import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { CustomersModule } from 'src/customers/customers.module';
import { Customer } from 'src/customers/entities/customer.entity';

@Module({
  controllers: [SeedController],
  providers: [
    SeedService,
  ],
  imports: [
    UsersModule,
    CustomersModule,
    TypeOrmModule.forFeature([
      User,
      Customer
    ])
  ],
  exports: [
    SeedService
  ]
})
export class SeedModule { }
