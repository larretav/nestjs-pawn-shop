import { Customer } from "src/customers/entities/customer.entity";
import { Loan } from "src/loans/entities/loan.entity";
import { Vehicle } from "src/vehicles/entities/vehicle.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm"

@Entity({ name: 'contracts' })
export class Contract {

  @Column('integer', { generated: "increment" })
  folio: number;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column('text', { name: 'contract_status', nullable: false })
  contractStatus: string;

  @Column('char', { default: 'A', select: false })
  status: string;

  // Relations
  @ManyToOne(
    (type) => Customer,
    (customer) => customer.addresses,
    { onDelete: 'CASCADE', eager: true }
  )
  customer: Customer;

  @ManyToOne(
    (type) => Vehicle,
    (vehicle) => vehicle.contractHistory,
    { onDelete: 'CASCADE', eager: true }
  )
  vehicle: Vehicle;

  @OneToOne(
    (type) => Loan,
    (loan) => loan.contract,
    { onDelete: 'CASCADE', eager: true }
  )
  @JoinColumn()
  loan: Loan;
}
