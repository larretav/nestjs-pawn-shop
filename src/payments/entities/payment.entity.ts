import { BaseEntity } from "src/common/entities/base.entity";
import { Loan } from "src/loans/entities/loan.entity";
import { Column, Entity, ManyToOne } from "typeorm";

// Pagos
@Entity({ name: 'payments' })
export class Payment extends BaseEntity {

  @Column('decimal', { name: 'payment_amount', precision: 10, scale: 2 }) // (Monto pagado).
  paymentAmount: number;

  @Column('timestamp', {name: 'payment_date', default: () => 'CURRENT_TIMESTAMP' })
  paymentDate: Date;

  @Column('boolean', { name: 'is_late' }) // (Indica si el pago fue tardío).
  isLate: boolean;

  @Column('decimal', { name: 'late_fees', precision: 7, scale: 2 }) // (Penalización por retraso, si corresponde).
  lateFees: number;

  @Column('text', { default: 'pending' }) // Estado del pago pending | paid | cancelled
  state: string;

  @Column('char', { default: 'A', select: false })
  status: string;

  // Relations
  // (Referencia al préstamo).
  @ManyToOne(
    (type) => Loan,
    (loan) => loan.payments
  )
  loan: Loan;

}
