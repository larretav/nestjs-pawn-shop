import { BaseEntity } from "src/common/entities/base.entity"
import { Contract } from "src/contracts/entities/contract.entity";
import { Customer } from "src/customers/entities/customer.entity";
import { Maintenance } from "src/maintenance/entities/maintenance.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm"

@Entity({ name: 'vehicle' })
export class Vehicle extends BaseEntity {

  @Column('text')
  make: string;

  @Column('text')
  model: string;

  @Column('smallint')
  year: number;

  @Column('text', { nullable: true })
  condition: string;

  @Column('decimal', { name: 'valuation_amount', precision: 10, scale: 2 })
  valuationAmount: number;

  @Column('decimal', { name: 'loan_amount', precision: 10, scale: 2 })
  loanAmount: number;

  @Column('timestamp', { name: 'entry_date', default: () => 'CURRENT_TIMESTAMP' })
  entryDate: Date;

  @Column('char', { default: 'A', select: false })
  status: string;

  // Relations
  @ManyToOne(
    () => Customer,
    (customer) => customer.vehicles,
    { onDelete: 'CASCADE' }
  )
  customer: Customer;

  @OneToMany(
    () => Contract,
    (contract) => contract.vehicle,
    { onDelete: 'CASCADE' }
  )
  contractHistory: Contract[];

  @OneToMany(
    () => Maintenance,
    (maintenance) => maintenance.vehicle,
    { onDelete: 'CASCADE' }
  )
  maintenance: Maintenance[];

}
