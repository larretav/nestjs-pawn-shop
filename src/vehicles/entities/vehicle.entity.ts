import { BaseEntity } from "src/common/entities/base.entity"
import { Contract } from "src/contracts/entities/contract.entity";
import { Customer } from "src/customers/entities/customer.entity";
import { Maintenance } from "src/maintenance/entities/maintenance.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm"

@Entity({ name: 'vehicles' })
export class Vehicle extends BaseEntity {

  @Column('text', { nullable: false })
  make: string;

  @Column('text', { nullable: false })
  model: string;

  @Column('smallint', { nullable: false })
  year: string;

  @Column('text')
  condition: string;

  @Column('decimal', { name: 'valuation_amount', nullable: false })
  valuationAmount: number;

  @Column('decimal', { name: 'loan_amount', nullable: false })
  loanAmount: number;

  @Column('decimal', { name: 'maintenance_costs' })
  maintenanceCosts: number;

  @Column('timestamp', { name: 'entry_date', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

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
  contracts: Contract[];

  @OneToMany(
    () => Maintenance,
    (maintenance) => maintenance.vehicle,
    { onDelete: 'CASCADE' }
  )
  maintenance: Maintenance[];

}
