import { PartialType } from '@nestjs/swagger';
import { CreateAddressDto } from './create-address.dto';
import { OmitType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto extends PartialType(OmitType(CreateAddressDto, ['customerId'] as const)) {
  @IsOptional()
  @IsString({ message: '[customerId] no debe actualizarse' })
  customerId?: string;
}
