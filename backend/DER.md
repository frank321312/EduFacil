# EduFacil

```mermaid
    erDiagram
    Rol {
        VARCHAR(45) Nombre
        INT IdRol PK
    }

    Usuario {
        VARCHAR(45) NombreUsuario
        VARCHAR(45) Nombre
        VARCHAR(45) Apellido
        VARCHAR(75) Email
        VARCHAR(45) Password
        INT IdUsuario PK
        BOOL Bloqueado
        BOOL Habilitado
        DATETIME FechaIngreso
        DATETIME FechaEgreso
        VARCHAR(10) Codigo
        INT IdRol FK
    }

    Escuela {
        INT IdEscuela PK
        VARCHAR(150) Nombre
        VARCHAR(75) Email
        VARCHAR(100) Direccion
        VARCHAR(20) Telefono
        VARCHAR(10) Codigo
        DATETIME FechaIngreso
        DATETIME FechaEgreso
        BOOL Bloqueado
    }

    Horario {
        INT idCurso FK
    }

    Materia {
        INT IdEscuela FK
        INT IdMateria PK
        VARCHAR(45) Nombre
    }

    Curso {
        INT idCurso PK
        TYNINT Anio
        CHAR Division
        INT IdEscuela FK
    }
```