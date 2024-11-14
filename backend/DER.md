# EduFacil

```mermaid
erDiagram
    usuario_no_validado {
        INT idUsuario
        VARCHAR(45) nombreUsuario
        VARCHAR(45) nombre
        VARCHAR(45) apellido
        VARCHAR(45) password
        VARCHAR(45) email
        DATETIME fechaIngreso
        VARCHAR(4) codigo
        TINYINT tipo
        INT idEscuela
    }
    
    turno {
        INT idTurno
        VARCHAR(20) nombre
    }
    
    curso {
        INT idCurso
        SMALLINT anio
        VARCHAR(3) division
        INT idEscuela
        INT idTurno
    }
    
    horario {
        INT idHorario
        VARCHAR(255) contenido
        INT fila
        INT idCurso
    }
    
    escuela {
        INT idEscuela
        VARCHAR(150) nombre
        VARCHAR(100) email
        VARCHAR(45) direccion
        VARCHAR(10) telefono
        VARCHAR(25) codigo
        DATETIME fechaIngreso
        DATE deleted
    }
    
    usuario {
        INT idUsuario
        VARCHAR(45) nombreUsuario
        VARCHAR(45) nombre
        VARCHAR(45) apellido
        VARCHAR(45) password
        VARCHAR(45) email
        TINYINT habilitado
        DATETIME fechaIngreso
        DATETIME deleted
        INT idRol
        INT idEscuela
    }
    
    rol {
        INT idRol
        VARCHAR(25) nombre
    }
    
    escuela_no_validada {
        INT idEscuelaNV
        VARCHAR(150) nombre
        VARCHAR(100) email
        VARCHAR(45) direccion
        VARCHAR(10) telefono
        VARCHAR(25) codigo
        DATETIME fechaIngreso
    }
    
    curso }o--|| turno : "idTurno"
    curso }o--|| escuela : "idEscuela"
    horario }o--|| curso : "idCurso"
    usuario }o--|| rol : "idRol"
    usuario }o--|| escuela : "idEscuela"
```