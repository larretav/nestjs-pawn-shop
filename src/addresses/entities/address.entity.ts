import { BaseEntity } from "src/common/entities/base.entity";
import { Customer } from "src/customers/entities/customer.entity";
import { Column, Entity, ManyToOne } from "typeorm";

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

  @Column('text', {name: 'postal_code'})
  postalCode: string;

  @Column('text')
  country: string;

  @Column('char', { default: 'A', select: false })
  status: string;

  @ManyToOne(
    () => Customer,
    (customer) => customer.addresses,
    { onDelete: 'CASCADE' }
  )
  customer: Customer;
}
