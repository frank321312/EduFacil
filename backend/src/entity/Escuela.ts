import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn } from 'typeorm';
import { Curso } from './Curso.js';
import { Usuario } from './Usuario.js';

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

    @Column("varchar", { length: 5, nullable: true })
    codigo: string | null;

    @Column("varchar", { nullable: true })
    imgUrl: string;

    @Column("datetime")
    fechaIngreso: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;

    @OneToMany(() => Curso, (c) => c.escuela)
    cursos: Curso[]

    @OneToMany(() => Usuario, (u) => u.escuela)
    usuarios: Usuario[]
}
