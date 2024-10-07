import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Escuela } from "./Escuela.js";

@Entity()
export class Materia {
    @PrimaryGeneratedColumn()
    idMateria: number

    @Column("varchar", { length: 45 })
    nombre: string
    
    @ManyToOne(() => Escuela, (e) => e.materias)
    escuela: Relation<Escuela>
}