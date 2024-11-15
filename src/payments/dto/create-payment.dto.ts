import { IsBoolean, IsDecimal, IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePaymentDto {

  @IsNotEmpty({ message: '[paymentAmount] no debe ser vacío.' })
  @IsNumber(undefined, { message: '[paymentAmount] debe ser un número' })
  paymentAmount: number;

  @IsNotEmpty({ message: '[paymentDate] no debe ser vacío.' })
  @IsISO8601({}, { message: '[paymentDate] no es una fecha en formato ISO válido' })
  paymentDate: string;

  @IsNotEmpty({ message: '[isLate] no debe ser vacío.' })
  @IsBoolean({ message: '[isLate] debe ser un valor boleano' })
  isLate: boolean;

  @IsOptional()
  @IsDecimal({ decimal_digits: '2', force_decimal: true }, { message: '[lateFees] debe ser un valor decimal' })
  lateFees?: number;

  @IsNotEmpty({ message: '[loanId] no debe ser vacío.' })
  @IsString({ message: '[loanId] debe ser un UUID válido.' })
  loanId: string;
}