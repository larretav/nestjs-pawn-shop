import { Type } from "class-transformer";
import { IsISO8601, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateCustomerDto } from "src/customers/dto/create-customer.dto";
import { CreateLoanDto } from "src/loans/dto/create-loan.dto";
import { CreateVehicleDto } from "src/vehicles/dto/create-vehicle.dto";

export class CreateContractDto {

  @IsNotEmpty({ message: '[date] no debe ser vacío.' })
  @IsISO8601({}, { message: '[date] no es una fecha en formato ISO válido' })
  date: string;

  @IsNotEmpty({ message: '[contractStatus] no debe ser vacío.' })
  @IsString({ message: '[contractStatus] debe ser un string.' })
  contractStatus: string;

  // Relations
  @IsNotEmpty({ message: '[customer] no debe ser vacío.' })
  @ValidateNested()
  @Type(() => CreateCustomerDto)
  customer: CreateCustomerDto;

  @IsNotEmpty({ message: '[vehicle] no debe ser vacío.' })
  @ValidateNested()
  @Type(() => CreateVehicleDto)
  vehicle: CreateVehicleDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateLoanDto)
  loan?: CreateLoanDto;
}

