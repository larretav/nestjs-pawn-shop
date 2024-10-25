import { Customer } from "src/customers/entities/customer.entity";
import { Column, Entity, ManyToOne } from "typeorm"

@Entity({ name: 'contracts' })
export class Contract {

  @Column('decimal', { name: 'loan_amount' })
  loanAmount: number;

  @Column('decimal', { name: 'interest_rate', default: 0.8 })
  interestRate: number;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  // activo, completado, cancelado
  @Column('text', { name: 'contract_status', nullable: false })
  contractStatus: string;

  @Column('char', { default: 'A', select: false })
  status: string;

  // Relations
  @ManyToOne(
    () => Customer,
    (customer) => customer.addresses,
    { onDelete: 'CASCADE' }
  )
  customer: Customer;

  @Column('text', { name: 'vehicle_id' })
  vehicleId: string;
}
