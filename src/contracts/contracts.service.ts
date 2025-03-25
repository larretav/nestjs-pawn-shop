import { Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomersService } from 'src/customers/customers.service';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { AddressesService } from 'src/addresses/addresses.service';

@Injectable()
export class ContractsService {

  constructor(
    // @InjectRepository(Addresses)
    // private readonly addressRepository: Repository<Addresses>,

    private readonly customerService: CustomersService,
    private readonly vehicleService: VehiclesService,
    private readonly addressService: AddressesService,
  ) { }

  async create(createContractDto: CreateContractDto) {
    const { date, contractStatus, customer, vehicle, loan, address } = createContractDto;

    // Crear o buscar cliente
    let customerEntity = await this.customerService.findByCURP(customer.curp);
    if (!customerEntity)
      customerEntity = await this.customerService.create(customer);

    // Crear dirección
    let addressEntity = address.id ? await this.addressService.findById(address.id) : null;
    if (!addressEntity) {
      addressEntity = await this.addressService.create(address);
      addressEntity.customer = customerEntity;
      await this
    }

    // Crear o buscar vehículo

    // Crear préstamo

    // Crear contrato


    // let vehicleEntity = await this.vehicleRepository.findOne({
    //   where: { make: vehicle.make, model: vehicle.model, year: vehicle.year },
    // });
    // if (!vehicleEntity) {
    //   vehicleEntity = this.vehicleRepository.create({ ...vehicle, customer: customerEntity });
    //   vehicleEntity = await this.vehicleRepository.save(vehicleEntity);
    // }

    // // Crear préstamo si se proporciona
    // let loanEntity: Loan | undefined;
    // if (loan) {
    //   loanEntity = this.loanRepository.create(loan);
    //   loanEntity = await this.loanRepository.save(loanEntity);
    // }

    // // Crear contrato
    // const contractEntity = this.contractRepository.create({
    //   folio,
    //   date: new Date(date),
    //   contractStatus,
    //   customer: customerEntity,
    //   vehicle: vehicleEntity,
    //   loan: loanEntity,
    // });

    // return this.contractRepository.save(contractEntity);
    return createContractDto
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
