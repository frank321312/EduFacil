import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UsuarioNoValidado {
    @PrimaryGeneratedColumn()
    idUsuarioNV: number

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

    @Column("datetime")
    fechaIngreso: Date
    
    @Column("varchar", { length: 5 })
    codigo: string

    @Column("tinyint")
    idRol: number

    @Column()
    idEscuela: number
}