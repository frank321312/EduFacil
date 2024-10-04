import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Curso } from './Curso';
import { Materia } from './Materia';

@Entity()
export class Escuela {

    @PrimaryGeneratedColumn()
    idEscuela: number;

    @Column("varchar", { length: 150 })
    nombre: string;

    @Column("varchar", { length: 75 })
    email: string;

    @Column("varchar", { length: 100 })
    direccion: string;

    @Column("varchar", { length: 20 })
    telefono: string;

    @Column("varchar", { length: 5 })
    codigo: string;

    @Column("boolean", { default: false })
    bloqueado: boolean;

    @Column("datetime")
    fechaIngreso: Date;

    @Column("datetime", { nullable: true })
    fechaEgreso: Date | null;

    @OneToMany(() => Curso, (c) => c.escuela)
    cursos: Curso[]

    @OneToMany(() => Materia, (m) => m.escuela)
    materias: Materia[]
}
