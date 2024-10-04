import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Escuela } from "./Escuela";

@Entity()
export class Materia {
    @PrimaryGeneratedColumn()
    idMateria: number

    @Column("varchar", { length: 45 })
    nombre: string
    
    @ManyToOne(() => Escuela, (e) => e.materias)
    escuela: Escuela
}