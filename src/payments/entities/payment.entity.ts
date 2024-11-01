import { Loan } from "src/loans/entities/loan.entity";
import { Column, Entity, ManyToOne } from "typeorm";

// Pagos
@Entity({ name: 'payments' })
export class Payment {

  @Column('decimal', { name: 'payment_amount' }) // (Monto pagado).
  paymentAmount: number;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  paymentDate: Date;

  @Column('boolean', { name: 'is_late' }) // (Indica si el pago fue tardío).
  isLate: boolean;

  @Column('boolean', { name: 'late_fees' }) // (Penalización por retraso, si corresponde).
  lateFees: boolean;

  @Column('char', { default: 'A', select: false })
  status: string;

  // Relations
  // (Referencia al préstamo).
  @ManyToOne(
    (type) => Loan,
    (contract) => contract.payments
  )
  loan: Loan;

}
