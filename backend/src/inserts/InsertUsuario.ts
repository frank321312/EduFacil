import { AppDataSource } from "../data-source.js";
import { Rol } from "../entity/Rol.js";
import { obtenerEscuelas } from "../functions/EscuelaFunc.js";
import { insertarUsuario, insertarUsuarioNV, UsuarioType } from "../functions/UsuarioFunc.js";

export async function insertUsuario() {
    const escuelas = await obtenerEscuelas()
    const roles = await AppDataSource.getRepository(Rol).find()
    const usuario1: UsuarioType = {
        nombreUsuario: 'jdoe',
        nombre: 'John',
        apellido: 'Doe',
        password: 'securePassword123',
        email: 'jdoe@example.com',
        codigo: '12345'
    };
    
    const usuario2: UsuarioType = {
        nombreUsuario: 'msmith',
        nombre: 'Mary',
        apellido: 'Smith',
        password: 'anotherPassword456',
        email: 'msmith@example.com',
        codigo: '67890'
    };
    
    const usuario3: UsuarioType = {
        nombreUsuario: 'rjohnson',
        nombre: 'Robert',
        apellido: 'Johnson',
        password: 'pass789',
        email: 'rjohnson@example.com',
        codigo: '54321'
    };

    await insertarUsuario(usuario1, roles[0], escuelas[0])
    await insertarUsuario(usuario2, roles[1], escuelas[1])
    await insertarUsuario(usuario3, roles[2], escuelas[2])
}

export async function insertUsuarioNV() {
    const usuario1: UsuarioType = {
        nombreUsuario: 'ajones',
        nombre: 'Alice',
        apellido: 'Jones',
        password: 'passwordAlice2024',
        email: 'ajones@example.com',
        codigo: '98765'
    };
    
    const usuario2: UsuarioType = {
        nombreUsuario: 'bwilson',
        nombre: 'Brian',
        apellido: 'Wilson',
        password: 'BrianPass456',
        email: 'bwilson@example.com',
        codigo: '13579'
    };
    
    const usuario3: UsuarioType = {
        nombreUsuario: 'clopez',
        nombre: 'Carlos',
        apellido: 'Lopez',
        password: 'clopezSecure321',
        email: 'clopez@example.com',
        codigo: '24680'
    };
    await insertarUsuarioNV(usuario1, 1, 1)
    await insertarUsuarioNV(usuario2, 2, 2)
    await insertarUsuarioNV(usuario3, 3, 3)
}