import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { Addresses } from "src/addresses/entities/address.entity";
import { OneToMany } from "typeorm";

export class CreateCustomerDto {

  @IsNotEmpty({ message: '[firstName] no debe ser vacío' })
  @IsString({ message: '[firstName] debe ser una cadena' })
  firstName: string;

  @IsNotEmpty({ message: '[lastName] no debe ser vacío' })
  @IsString({ message: '[lastName] debe ser una cadena' })
  lastName: string;

  @IsNotEmpty({ message: '[phoneNumber] no debe ser vacío' })
  @IsString({ message: '[phoneNumber] debe ser una cadena' })
  phoneNumber: string;

  @IsNotEmpty({ message: '[email] no debe ser vacío' })
  @IsEmail({}, { message: '[email] no tiene un formato válido' })
  email: string;

  @IsNotEmpty({ message: '[curp] no debe ser vacío' })
  @IsString({ message: '[curp] debe ser una cadena' })
  curp: string;

  @IsNotEmpty({ message: '[idType] no debe ser vacío' })
  @IsString({ message: '[idType] debe ser una cadena' })
  idType: string;

  @IsNotEmpty({ message: '[idNumber] no debe ser vacío' })
  @IsString({ message: '[idNumber] debe ser una cadena' })
  idNumber: string;

  // Relations
  contracts: string;

  addresses: string;

  vehicles: string;
}
