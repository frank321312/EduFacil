import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
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
    bloqueado: boolean

    @Column()
    habilitado: boolean

    @Column("datetime")
    fechaIngreso: Date
    
    @Column("datetime", { nullable: true })
    fechaEgreso: Date

    @Column("varchar", { length: 5 })
    codigo: string

    @ManyToOne(() => Rol, (r) => r.usuarios)
    @JoinColumn({ name: "idRol" })
    rol: Rol

    @ManyToOne(() => Escuela, (e) => e.usuarios)
    @JoinColumn({ name: "idEscuela" })
    escuela: Relation<Escuela>
}