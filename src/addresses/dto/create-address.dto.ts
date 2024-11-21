import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateAddressDto {
  @IsNotEmpty()
  @IsIn(['casa', 'oficina', 'trabajo'], { message: '[type] debe ser casa, oficina o trabajo' })
  type: string;

  @IsNotEmpty({message:'[street] no debe ser vacía' })
  @IsString({ message: '[street] debe ser un string' })
  street: string;

  @IsNotEmpty({ message: '[number] no debe ser vacía' })
  @IsString({ message: '[number] debe ser un string' })
  number: string;

  @IsNotEmpty({message:'[neighborhood] no debe ser vacía' })
  @IsString({ message: '[neighborhood] debe ser un string' })
  neighborhood?: string;

  @IsNotEmpty({message:'[city] no debe ser vacía' })
  @IsString({ message: '[city] debe ser un string' })
  city: string;

  @IsNotEmpty({message:'[municipality] no debe ser vacía' })
  @IsString({ message: '[municipality] debe ser un string' })
  municipality: string;

  @IsNotEmpty({message:'[state] no debe ser vacía' })
  @IsString({ message: '[state] debe ser un string' })
  state: string;

  @IsNotEmpty({message:'[postalCode] no debe ser vacía' })
  @IsString({ message: '[postalCode] debe ser un string' })
  postalCode: string;

  @IsNotEmpty({message:'[country] no debe ser vacía' })
  @IsString({ message: '[country] debe ser un string' })
  country: string;
}
