import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity, Column, ManyToOne, OneToOne, JoinColumn, OneToMany, Index } from "typeorm";

// Base Entity
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    select: false
  })
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    select: false
  })
  updatedAt: Date
}

// Addresses
@Entity({ name: 'addresses' })
export class Addresses extends BaseEntity {
  @Column('text')
  type: string;

  @Column('text')
  street: string;

  @Column('text')
  number: string;

  @Column('text',)
  neighborhood: string;

  @Column('text')
  city: string;

  @Column('text')
  state: string;

  @Column('text', { name: 'postal_code' })
  postalCode: string;

  @Column('text')
  country: string;

  @Column('char', { default: 'A', select: false })
  status: string;

  @ManyToOne(
    (type) => Customer,
    (customer) => customer.addresses,
    { onDelete: 'CASCADE',  }
  )
  customer: Customer;
}

// Contracts
@Entity({ name: 'contracts' })
export class Contract extends BaseEntity {

  @Index()
  @Column('integer', { generated: "increment" })
  folio: number;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column('text', { name: 'contract_status' })
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

// Customer
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
    { eager: false, cascade: true }
  )
  contracts: Contract[];

  @OneToMany(
    (type) => Addresses,
    (addresses) => addresses.customer,
    { eager: false, cascade: true }
  )
  addresses: Addresses[];

  // Vehicles
  @OneToMany(
    (type) => Vehicle,
    (vehicle) => vehicle.customer,
    { eager: false, cascade: true }
  )
  vehicles: Vehicle[];
}


// Loan
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
  payments: Payment[];

}

// Maintenance
@Entity({ name: 'maintenance' })
export class Maintenance extends BaseEntity  {

  @Column('text') // Tipo de mantenimiento (reparaciones o limpieza).
  type: string;

  @Column('text') // (Descripción del mantenimiento realizado(ej. "Reparación de llanta")).
  description: string;

  @Column('decimal', { precision: 10, scale: 2 }) //(Costo del mantenimiento).
  cost: number;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })  //(Fecha en la que se realizó el mantenimiento).
  date: Date;

  @Column('char', { default: 'A', select: false })
  status: string;

  @ManyToOne(
    () => Vehicle,
    (vehicle) => vehicle.maintenance,
    { onDelete: 'CASCADE' }
  )
  vehicle: Vehicle;

}

// Payment
@Entity({ name: 'payments' })
export class Payment extends BaseEntity {

  @Column('decimal', { name: 'payment_amount', precision: 10, scale: 2 }) // (Monto pagado).
  paymentAmount: number;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  paymentDate: Date;

  @Column('boolean', { name: 'is_late' }) // (Indica si el pago fue tardío).
  isLate: boolean;

  @Column('decimal', { name: 'late_fees', precision: 7, scale: 2 }) // (Penalización por retraso, si corresponde).
  lateFees: number;

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


// Vehicle
@Entity({ name: 'vehicles' })
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

  @Column('decimal', { name: 'maintenance_costs', precision: 7, scale: 2, nullable: true })
  maintenanceCosts: number;

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

