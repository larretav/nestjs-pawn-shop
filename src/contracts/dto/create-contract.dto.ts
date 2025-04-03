import { applyDecorators } from "@nestjs/common";
import { OmitType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsISO8601, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { CreateAddressDto } from "src/addresses/dto/create-address.dto";
import { CreateCustomerDto } from "src/customers/dto/create-customer.dto";
import { CreateLoanDto } from "src/loans/dto/create-loan.dto";
import { CreateVehicleDto } from "src/vehicles/dto/create-vehicle.dto";

function OptionalId() {
  return applyDecorators(
    IsOptional(),
    IsUUID('4', { message: "Se esperaba un uuid" })
  )
}


class ExtendedCreateCustomerDto extends CreateCustomerDto {
  @OptionalId()
  id?: string
}

class ExtendedCreateAddressDto extends OmitType(CreateAddressDto, ['customerId'] as const) {
  @OptionalId()
  id?: string
}

class ExtendedCreateVehicleDto extends OmitType(CreateVehicleDto, ['customerId'] as const) {
  @OptionalId()
  id?: string
}

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
  @Type(() => ExtendedCreateCustomerDto)
  customer: ExtendedCreateCustomerDto;

  @IsNotEmpty({ message: '[address] no debe ser vacío.' })
  @ValidateNested()
  @Type(() => ExtendedCreateAddressDto)
  address: ExtendedCreateAddressDto

  @IsNotEmpty({ message: '[vehicle] no debe ser vacío.' })
  @ValidateNested()
  @Type(() => ExtendedCreateVehicleDto)
  vehicle: ExtendedCreateVehicleDto;

  @IsNotEmpty({ message: '[loan] no debe ser vacío.' })
  @ValidateNested()
  @Type(() => CreateLoanDto)
  loan: CreateLoanDto;
}

