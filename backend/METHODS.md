
merge: Actualiza un registro, acepta como primer parametro un objeto ya cargado desde la base de datos, el segundo parametro son los cambios que se haran que puede ser un objeto.
const curso = await AppDataSource.getRepository(Curso).findOneByOrFail({ idCurso: Number(idCurso) })
AppDataSource.getRepository(Curso).merge(curso, { anio, division, turno })

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

maximum: Devuelve el valor mayor de una columna por ejemplo el precio mas alto de una categoria de un producto
const maxValue = await AppDataSource.getRepository(Usuario).maximum("nombreColumna");

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

upsert: Crea un registro en caso de que no exista, si existe actualiza el registro, siendo similar a preload con la diferencia de que no hace falta usar save()
const usuarioRepository = AppDataSource.getRepository(Usuario);
const usuario = {
    id: 1, // ID del usuario para buscar si existe
    nombreUsuario: 'johnDoe',
    nombre: 'John',
    apellido: 'Doe',
    password: 'password123',
    email: 'john.doe@example.com',
    fechaIngreso: new Date(),
    codigo: 'JD123',
};

await usuarioRepository.upsert(usuario, ['id']);

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

query: Primer parametro una cadena string siendo una consulta SQL, $1 indica que sera un parametro, el segundo parametro sera la lista de parametros
const usuarioRepository = AppDataSource.getRepository(Usuario);
const apellido = 'Doe';
const usuarios = await usuarioRepository.query(`SELECT * FROM usuario WHERE apellido = $1`, [apellido]);

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

update: Primer parametro la columna a identificar siendo en general el id, el segundo los cambios que se haran
const userIdToUpdate = 1; 
const updateData = { nombre: "Nuevo Nombre", email: "nuevo@correo.com" };
await AppDataSource.getRepository(Usuario).update(userIdToUpdate, updateData);

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

preload: Similar a upsert solo que si no encuentra el registor devuelve null, en si no crea un registro por si solo, sino que se debe usar create, no recomendable usarlo para modificar, si existe se debe usar save para guardar los cambios
const usuarioRepository = AppDataSource.getRepository(Usuario);
const usuarioData = {
    id: 1,
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan.perez@example.com',
};

const usuario = await usuarioRepository.preload(usuarioData);

if (usuario) {
    await usuarioRepository.save(usuario);
    console.log("Usuario actualizado o creado:", usuario);
} else {
    console.log("No se encontró el usuario con el ID proporcionado.");
}

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

decrement: Solo sirve para decrementar valores numericos, mayormente usado o generalmente en stocks de productos o precios exactamente igual a increment
const usuarioId = 1;
const puntosARestar = 5;

await AppDataSource.getRepository(Usuario).decrement(
    { id: usuarioId }, 
    { puntos: puntosARestar } // Restar 5 puntos
);

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

extend: Toma como parametro un objeto el cual contiene todos los metodos personalizados que queremos hacer en base a una entidad
import { EntityRepository, Repository } from "typeorm";
import { Usuario } from "../entities/Usuario";

const CustomUsuarioRepository = AppDataSource.getRepository(Usuario).extend({
  findByNombre(nombre: string) {
    return this.createQueryBuilder("usuario")
      .where("usuario.nombre = :nombre", { nombre })
      .getMany();
  },
  countActivos() {
    return this.createQueryBuilder("usuario")
      .where("usuario.activo = true")
      .getCount();
  },
});

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

exists: Devuelve un valor booleano, si existe true en caso contrario false
const exists = await AppDataSource.getRepository(Usuario).exists({ where: { /* condiciones */ } });

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

delete: Eliminar un registro o varios en base a si cumplen con la condicion aceptando tambien objetos ya pre-cargados
await AppDataSource.getRepository(Usuario).delete({ id: 2 });

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
