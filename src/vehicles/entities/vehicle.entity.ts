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
  year: number;

  @Column('text', { nullable: true })
  condition: string;

  @Column('decimal', { name: 'valuation_amount', precision: 10, scale: 2, nullable: false })
  valuationAmount: number;

  @Column('decimal', { name: 'loan_amount', precision: 10, scale: 2, nullable: false })
  loanAmount: number;

  @Column('decimal', { name: 'maintenance_costs', precision: 7, scale: 2, nullable: true })
  maintenanceCosts: number;

  @Column('timestamp', { name: 'entry_date', default: () => 'CURRENT_TIMESTAMP' })
  entryDate: Date;

  @Column('char', { default: 'A', select: false, nullable: false })
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
