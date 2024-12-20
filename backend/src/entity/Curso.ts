import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Escuela } from "./Escuela.js";
import { Turno } from "./Turno.js";
import { Horario } from "./Horario.js";

@Entity()
export class Curso {
    @PrimaryGeneratedColumn()
    idCurso: number

    @Column("smallint")
    anio: number

    @Column("varchar", { length: 3 })
    division: string

    @ManyToOne(() => Escuela, (e) => e.cursos)
    @JoinColumn({ name: "idEscuela" })
    escuela: Relation<Escuela>

    @ManyToOne(() => Turno, (t) => t.curso)
    @JoinColumn({ name: "idTurno" })
    turno: Turno

    @OneToMany(() => Horario, (horario) => horario.curso)
    horarios: Horario[]
}