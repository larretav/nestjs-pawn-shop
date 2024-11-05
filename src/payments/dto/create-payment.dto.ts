import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsDecimal, IsOptional } from "class-validator";

export class CreatePaymentDto {
  @IsDecimal({ decimal_digits: '2', force_decimal: true })
  paymentAmount: number;

  @Type(() => Date)
  @IsDate()
  paymentDate: Date;

  @IsBoolean()
  isLate: boolean;

  @IsDecimal({ decimal_digits: '2', force_decimal: true })
  @IsOptional()
  lateFees?: number;
}
