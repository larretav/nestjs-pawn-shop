import { IsISO8601, IsNotEmpty, IsString } from "class-validator";

export class CreateContractDto {

  @IsNotEmpty({ message: '[date] no debe ser vacío.' })
  @IsISO8601({}, { message: '[date] no es una fecha en formato ISO válido' })
  date: string;

  @IsNotEmpty({ message: '[contractStatus] no debe ser vacío.' })
  @IsString({ message: '[contractStatus] debe ser un string.' })
  contractStatus: string;

  // Relations
  customer: string;
  vehicle: string;
  loan: string;
}

