import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Curso } from "./Curso";

@Entity()
export class Horario {
    @PrimaryGeneratedColumn()
    idHorario: number
    
    @Column("varchar", { length: 25 })
    hora: string

    @Column("varchar", { length: 25 })
    duracion: string

    @OneToOne(() => Curso)
    @JoinColumn({ name: "idCurso" })
    curso: Curso
}