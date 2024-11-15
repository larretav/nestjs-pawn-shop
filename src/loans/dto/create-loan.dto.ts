import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateLoanDto {
  @IsNotEmpty({ message: '[principalAmount] no debe ser vacío' })
  @IsNumber(undefined, { message: '[principalAmount] debe ser un número' })
  principalAmount: number;

  @IsNotEmpty({ message: '[outstandingBalance] no debe ser vacío' })
  @IsNumber(undefined, { message: '[outstandingBalance] debe ser un número' })
  outstandingBalance: number;

  @IsNotEmpty({ message: '[monthlyPayment] no debe ser vacío' })
  @IsNumber(undefined, { message: '[monthlyPayment] debe ser un número' })
  monthlyPayment: number;

}
