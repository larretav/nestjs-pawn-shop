import { Addresses } from "src/addresses/entities/address.entity";
import { BaseEntity } from "src/common/entities/base.entity"
import { Contract } from "src/contracts/entities/contract.entity";
import { Column, Entity, OneToMany } from "typeorm"

@Entity({ name: 'customers' })
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

  // Relatios
  @OneToMany(
    (type) => Contract,
    (contract) => contract.customer,
    { eager: true, cascade: true }
  )
  contracts?: Contract[];

  @OneToMany(
    (type) => Addresses,
    (addresses) => addresses.customer,
    { eager: true, cascade: true }
  )
  addresses?: Addresses[];

  // Vehicles
  @OneToMany(
    (type) => Addresses,
    (addresses) => addresses.customer,
    { eager: true, cascade: true }
  )
  vehicles?: Addresses[];
}
