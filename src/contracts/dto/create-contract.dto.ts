import { IsDecimal, IsNotEmpty, IsString } from "class-validator";

export class CreateContractDto {

  @IsNotEmpty({ message: '[loanAmount] no debe ser vacío.' })
  @IsDecimal({}, { message: '[loanAmount] debe ser un número con decimal.' })
  loanAmount: number;

  @IsNotEmpty({ message: '[interestRate] no debe ser vacío.' })
  @IsDecimal({}, { message: '[interestRate] debe ser un número con decimal.' })
  interestRate: number;

  @IsNotEmpty({ message: '[date] no debe ser vacío.' })
  @IsString({ message: '[date] debe ser un string.' })
  date: string;

  @IsNotEmpty({ message: '[contractStatus] no debe ser vacío.' })
  @IsString({ message: '[contractStatus] debe ser un string.' })
  contractStatus: string;

}
