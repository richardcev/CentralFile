# CentralFile

###  Instrucciones
Comandos react:

npm install

npm start

Para el backend se utilizó visual studio 2022.

Se debe instalar en los paquetes nugets:

![image](https://github.com/richardcev/CentralFile/assets/72895663/f7cf56ea-48a4-42a8-b36b-6b6e78090cf5)


Este es el script de sql server para crear las tablas:

CREATE DATABASE centralfile;

CREATE TABLE Usuario_Contacto (
    ID INT PRIMARY KEY IDENTITY,
    ID_usuario INT,
    ID_contacto INT,
    FOREIGN KEY (ID_usuario) REFERENCES Usuarios(ID),
    FOREIGN KEY (ID_contacto) REFERENCES Usuarios(ID)
);


CREATE TABLE Usuarios (
    ID INT PRIMARY KEY IDENTITY,
    NombreUsuario VARCHAR(100),
    Clave VARCHAR(100),
	Nombre VARCHAR(100),
    Telefono VARCHAR(20),
    Direccion VARCHAR(200),
);

###  ¿Cómo decidió las opciones técnicas y arquitectónicas utilizadas como parte de su solución? 
Analizando como sería la mejor forma de llevar a cabo una funcionalidad.\
Se utilizó redux para guardar el estado del nombre del usuario y acceder a él en varios componentes lo cual
sirve para realizar las diferentes peticiones al servidor que necesitaban del nombre de usuario.\
Asimismo se utilizó redux para guardar el estado de los contactos, para añadir y eliminar contactos.
También se utilizó redux-persist para que el estado se mantenga aunque se recarge la página. .\
Con respecto a los modelos se crearon dos modelos, uno Usuario y el otro UsuarioContacto que contiene
el id del usuario y el id de su contacto. Esto sirvió para poder renderizar la lista de contactos de
un usuario. En el backend se utilizó un proyecto de web api para realizar los endpoints. En el archivo
UsuarioController se encuentran todos los endpoints.


### ¿Hay alguna mejora que pueda hacer en su envío? 
Que se pueda seleccionar el número de usuarios que se quiera mostrar.

### ¿Qué haría de manera diferente si se le asignara más tiempo?
Utilizaría la autenticación de usuarios ya sea con sesiones o jwt.
