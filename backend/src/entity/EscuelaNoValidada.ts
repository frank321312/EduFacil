import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class EscuelaNoValidada {
    @PrimaryGeneratedColumn()
    idEscuelaNV: number;

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

    @Column("varchar", { length: 255, nullable: true })
    imgUrl: string;

    @Column("datetime")
    fechaIngreso: Date;
}