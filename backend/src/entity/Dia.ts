import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Curso } from "./Curso";

@Entity()
export class Dia {
    @PrimaryGeneratedColumn()
    idDia: number

    @Column("varchar", { length: 20 })
    nombre: string
    
    @OneToOne(() => Curso)
    @JoinColumn({ name: "idCurso" })
    curso: Curso
}

