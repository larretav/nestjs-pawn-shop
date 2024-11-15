import { IsDecimal, IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMaintenanceDto {

  @IsNotEmpty({ message: '[type] no debe ser vacío.' })
  @IsString({ message: '[type] debe ser un string.' })
  type: string;

  @IsNotEmpty({ message: '[description] no debe ser vacío.' })
  @IsString({ message: '[description] debe ser un string.' })
  description: string;

  @IsNotEmpty({ message: '[cost] no debe ser vacío.' })
  @IsNumber(undefined, { message: '[cost] debe ser un número' })
  cost: number;

  @IsOptional()
  @IsISO8601({}, { message: '[date] debe estar en formato ISO 8601.' })
  date?: string;

  @IsNotEmpty({ message: '[vehicleId] no debe ser vacío.' })
  @IsString({ message: '[vehicleId] debe ser un UUID válido.' })
  vehicleId: string;
}
