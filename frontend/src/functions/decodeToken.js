import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token) => {
    const decode = jwtDecode(token)
    const loginObject = { nombre: decode.nombreUsuario, idRol: decode.rol.idRol, idEscuela: decode.escuela.idEscuela, idUsuario: decode.idUsuario }
    return loginObject
}