import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario.js";

@Entity()
export class Rol {
    @PrimaryGeneratedColumn()
    idRol: number

    @Column("varchar", { length: 45 })
    nombre: string

    @OneToMany(() => Usuario, (u) => u.rol)
    usuarios: Usuario[]
}