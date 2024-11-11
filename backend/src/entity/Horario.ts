import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Curso } from "./Curso.js";

@Entity()
export class Horario {
    @PrimaryGeneratedColumn()
    idHorario: number
    
    @Column("varchar")
    contenido: string

    @Column()
    fila: number

    @ManyToOne(() => Curso, (curso) => curso.horarios)
    @JoinColumn({ name: "idCurso" })
    curso: Relation<Curso>
}