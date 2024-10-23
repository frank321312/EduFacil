import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Rol } from "./Rol.js";
import { Escuela } from "./Escuela.js";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    idUsuario: number

    @Column("varchar", { length: 45 })
    nombreUsuario: string

    @Column("varchar", { length: 45 })
    nombre: string

    @Column("varchar", { length: 45 })
    apellido: string

    @Column("varchar", { length: 45 })
    password: string

    @Column("varchar", { length: 75 })
    email: string

    @Column()
    habilitado: boolean

    @Column("datetime")
    fechaIngreso: Date
    
    @DeleteDateColumn()
    deletedAt: Date | null;

    @Column("varchar", { length: 5, nullable: true })
    codigo: string | null

    @ManyToOne(() => Rol, (r) => r.usuarios)
    @JoinColumn({ name: "idRol" })
    rol: Rol

    @ManyToOne(() => Escuela, (e) => e.usuarios)
    @JoinColumn({ name: "idEscuela" })
    escuela: Relation<Escuela>
}