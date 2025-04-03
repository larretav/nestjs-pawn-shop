import { Injectable } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { HandleExceptions } from 'src/common/exceptions/handleExceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoansService {

  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>
  ) { }

  async create(createLoanDto: CreateLoanDto) {
    try {
      const loan = this.loanRepository.create(createLoanDto);
      const loanBd = await this.loanRepository.save(loan);

      return loanBd;
    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all loans`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loan`;
  }

  update(id: number, updateLoanDto: UpdateLoanDto) {
    return `This action updates a #${id} loan`;
  }

  remove(id: number) {
    return `This action removes a #${id} loan`;
  }
}
