import { Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomersService } from 'src/customers/customers.service';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { AddressesService } from 'src/addresses/addresses.service';
import { LoansService } from 'src/loans/loans.service';
import { Contract } from './entities/contract.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContractsService {

  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,

    private readonly customerService: CustomersService,
    private readonly addressService: AddressesService,
    private readonly vehicleService: VehiclesService,
    private readonly loanService: LoansService,


  ) { }

  async create(createContractDto: CreateContractDto) {
    const { date, contractStatus, customer, vehicle, loan, address } = createContractDto;

    // Crear o buscar cliente
    let customerEntity = await this.customerService.findByIdCURP(customer.id);
    if (!customerEntity)
      customerEntity = await this.customerService.create(customer);

    // Crear dirección
    let addressEntity = await this.addressService.findById(address.id);
    if (!addressEntity)
      addressEntity = await this.addressService.create({ ...address, customerId: customerEntity.id });

    // Crear o buscar vehículo
    let vehicleEntity = await this.vehicleService.findByTerm(vehicle.id);
    if (!vehicleEntity)
      vehicleEntity = await this.vehicleService.create({ ...vehicle, customerId: customerEntity.id });

    // Crear préstamo
    const loanEntity = await this.loanService.create(loan);

    // Crear contrato
    const contractEntity = this.contractRepository.create({
      date: new Date(date),
      contractStatus,
      customer: customerEntity,
      vehicle: Array.isArray(vehicleEntity) ? vehicleEntity[0] : vehicleEntity,
      loan: loanEntity,
    });

    return this.contractRepository.save(contractEntity);
  }

  findAll() {
    return `This action returns all contracts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contract`;
  }

  update(id: number, updateContractDto: UpdateContractDto) {
    return `This action updates a #${id} contract`;
  }

  remove(id: number) {
    return `This action removes a #${id} contract`;
  }
}
