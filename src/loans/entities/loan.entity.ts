import { BaseEntity } from "src/common/entities/base.entity";
import { Contract } from "src/contracts/entities/contract.entity";
import { Customer } from "src/customers/entities/customer.entity";
import { Payment } from "src/payments/entities/payment.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm";

// Prestamos
@Entity({ name: 'loans' })
export class Loan extends BaseEntity {

  @Column('decimal', { name: 'principal_amount', precision: 10, scale: 2 }) // (Monto principal del préstamo).
  principalAmount: number;

  @Column('decimal', { name: 'interest_rate', default: 0.08, precision: 5, scale: 4 }) // (Tasa de interés, 8%).
  interestRate: number;

  @Column('decimal', { name: 'outstanding_balance', precision: 10, scale: 2 }) // (Saldo pendiente, monto principal + interés).
  outstandingBalance: number;

  @Column('decimal', { name: 'monthly_payment', precision: 10, scale: 2 }) // (Pago mensual).
  monthlyPayment: number;

  @Column('char', { default: 'A', select: false })
  status: string;

  // Relations
  @OneToOne(
    (type) => Contract,
    (contract) => contract.loan
  )
  contract: Contract;

  @OneToMany(
    (type) => Payment,
    (payment) => payment.loan,
    { eager: true, cascade: true }
  )
  payments?: Payment[];

}
