import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Curso } from "./Curso.js";

@Entity()
export class Turno {
    @PrimaryGeneratedColumn()
    idTurno: number

    @Column("varchar", { length: 20 })
    nombre: string

    @OneToMany(() => Curso, (c) => c.turno)
    curso: Relation<Curso>
}