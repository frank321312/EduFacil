import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Turno {
    @PrimaryGeneratedColumn()
    idTurno: number

    @Column("varchar", { length: 20 })
    nombre: string
}