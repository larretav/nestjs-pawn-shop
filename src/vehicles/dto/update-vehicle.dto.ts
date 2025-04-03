import { PartialType } from '@nestjs/swagger';
import { CreateVehicleDto } from './create-vehicle.dto';
import { IsOptional, IsString } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';

export class UpdateVehicleDto extends PartialType(OmitType(CreateVehicleDto, ['customerId'] as const)) {
  @IsOptional()
  @IsString({ message: '[customerId] no debe actualizarse' })
  customerId?: string;
}
