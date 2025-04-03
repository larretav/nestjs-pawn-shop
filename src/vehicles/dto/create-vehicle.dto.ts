import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Max, Min } from "class-validator";


const currentYear: number = new Date().getUTCFullYear() + 1;

export class CreateVehicleDto {

  @IsNotEmpty({ message: '[make] no debe ser vacío' })
  @IsString({ message: '[make] debe ser una cadena' })
  make: string;

  @IsNotEmpty({ message: '[model] no debe ser vacío' })
  @IsString({ message: '[model] debe ser una cadena' })
  model: string;

  @IsInt({ message: '[year] no es un número válido' })
  @Min(1950, { message: '[year] no debe ser menor a 1950' })
  @Max(currentYear, { message: '[year] no debe ser mayor a ' + currentYear })
  year: number;

  @IsOptional()
  @IsString({ message: '[condition] debe ser una cadena' })
  condition?: string;

  @IsNotEmpty({ message: '[valuationAmount] no debe ser vacío' })
  @IsNumber(undefined, { message: '[valuationAmount] debe ser un número' })
  valuationAmount: number;

  @IsNotEmpty({ message: '[loanAmount] no debe ser vacío' })
  @IsNumber(undefined, { message: '[loanAmount] debe ser un número' })
  loanAmount: number;

  @IsNotEmpty({ message: '[maintenanceCosts] no debe ser vacío' })
  @IsNumber(undefined, { message: '[maintenanceCosts] debe ser un número' })
  maintenanceCosts?: number;

  @IsNotEmpty({ message: '[customerId] no debe ser vacía' })
  @IsUUID(undefined, { message: '[customerId] no es un uuid válido' })
  customerId: string;

}
