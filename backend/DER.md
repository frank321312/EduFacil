# EduFacil

```mermaid
    erDiagram
    Rol {
        VARCHAR(45) Nombre
        INT IdRol PK
    }

    UsuarioNoValidado {
        VARCHAR(45) NombreUsuario
        VARCHAR(45) Nombre
        VARCHAR(45) Apellido
        VARCHAR(75) Email
        VARCHAR(45) Password
        INT IdUsuarioNoValidado PK
        BOOL Bloqueado
        BOOL Habilitado
        DATETIME FechaIngreso
        VARCHAR(5) Codigo
        INT IdRol FK
        INT IdEscuela FK
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
        VARCHAR(5) Codigo
        INT IdRol FK
        INT IdEscuela FK
    }
  
    EscuelaNoValidada {
        INT IdEscuela PK
        VARCHAR(150) Nombre
        VARCHAR(75) Email
        VARCHAR(100) Direccion
        VARCHAR(20) Telefono
        VARCHAR(5) Codigo
        BOOL Bloqueado
        DATETIME FechaIngreso
    }

    Escuela {
        INT IdEscuela PK
        VARCHAR(150) Nombre
        VARCHAR(75) Email
        VARCHAR(100) Direccion
        VARCHAR(20) Telefono
        VARCHAR(5) Codigo
        VARCHAR(255) imagenUrl
        BOOL Bloqueado
        DATETIME FechaIngreso
        DATETIME FechaEgreso
    }

    Horario {
        INT IdHorario PK
        INT idCurso FK
        VARCHAR(25) Hora
        VARCHAR(25) Duracion
    }

    Dia {
        INT IdDia PK
        VARCHAR(20) Nombre
        INT idCurso FK
    }

    Materia {
        INT IdEscuela FK
        INT IdMateria PK
        VARCHAR(45) Nombre
    }

    HorarioMateria {
        INT IdHorario PK, FK
        INT IdMateria PK, FK
    }

    Curso {
        INT idCurso PK
        SMALLINT Anio
        CHAR Division
        INT IdEscuela FK
        INT IdTurno FK
    }

    Turno {
        INT IdTurno
        VARCHAR(45) Nombre
    }

    Rol ||--o{ Usuario : ""
    Curso }o--|| Turno: ""
    Curso ||--|| Horario: ""
    Escuela ||--o{ Usuario: ""
    Horario ||--o{ HorarioMateria: ""
    Materia ||--o{ HorarioMateria: ""
```