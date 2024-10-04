import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Escuela } from "./Escuela";
import { Turno } from "./Turno";

@Entity()
export class Curso {
    @PrimaryGeneratedColumn()
    idCurso: number

    @Column("smallint")
    anio: number

    @Column("char")
    division: string

    @ManyToOne(() => Escuela, (e) => e.cursos)
    @JoinColumn({ name: "idEscuela" })
    escuela: Escuela

    @OneToOne(() => Turno)
    @JoinColumn({ name: "idTurno" })
    turno: Turno
}