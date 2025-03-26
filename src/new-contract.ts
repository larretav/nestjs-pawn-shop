import { CreateCustomerDto } from "./customers/dto/create-customer.dto";
import { CreateLoanDto } from "./loans/dto/create-loan.dto";
import { CreateVehicleDto } from "./vehicles/dto/create-vehicle.dto";

interface newContract {
  date: string;
  contractStatus: string;
  customer: CreateCustomerDto;
  vehicle: CreateVehicleDto;
  loan?: CreateLoanDto;
}