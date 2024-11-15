import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { HandleExceptions } from 'src/common/exceptions/handleExceptions';

@Injectable()
export class PaymentsService {

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>
  ) { }

  create(createPaymentDto: CreatePaymentDto) {
    try {
      // const vehicle = this.vehicleRepository.create(createVehicleDto);
      // await this.vehicleRepository.insert(vehicle);

      // return vehicle;
      return createPaymentDto;
    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
