import { Address } from "src/addresses/entities/address.entity";
import { BaseEntity } from "src/common/entities/base.entity"
import { Contract } from "src/contracts/entities/contract.entity";
import { Vehicle } from "src/vehicles/entities/vehicle.entity";
import { Column, Entity, OneToMany } from "typeorm"

@Entity({ name: 'customer' })
export class Customer extends BaseEntity {

  @Column('text', { name: 'first_name' })
  firstName: string;

  @Column('text', { name: 'last_name' })
  lastName: string;

  @Column('text', { name: 'phone_number' })
  phoneNumber: string;

  @Column('text')
  email: string;

  @Column('text')
  curp: string;

  @Column('text', { name: 'id_type' })
  idType: string;

  @Column('text', { name: 'id_number' })
  idNumber: string;

  @Column('char', { default: 'A', select: false })
  status: string;

  // Relations
  @OneToMany(
    (type) => Contract,
    (contract) => contract.customer,
    { eager: false, cascade: true }
  )
  contracts: Contract[];

  @OneToMany(
    (type) => Address,
    (addresses) => addresses.customer,
    { eager: false, cascade: true }
  )
  addresses: Address[];

  // Vehicles
  @OneToMany(
    (type) => Vehicle,
    (vehicle) => vehicle.customer,
    { eager: false, cascade: true }
  )
  vehicles: Vehicle[];
}
