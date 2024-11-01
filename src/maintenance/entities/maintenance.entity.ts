import { Vehicle } from "src/vehicles/entities/vehicle.entity";
import { Column, Entity, ManyToOne } from "typeorm"


// Mantenimiento
@Entity({ name: 'maintenance' })
export class Maintenance {

  @Column('text') // (Descripción del mantenimiento realizado(ej. "Reparación de llanta")).
  description: string;

  @Column('decimal') //(Costo del mantenimiento).
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
