# README

## Proyecto: API de Gestión de Usuarios y Publicaciones

Este proyecto es una API desarrollada con Node.js, Express y MongoDB utilizando Mongoose. Proporciona funcionalidades de autenticación y autorización, así como operaciones CRUD para gestionar usuarios y publicaciones. Además, incluye características avanzadas como comentarios, "likes" y búsqueda por título. El despliegue se ha realizado utilizando **Render**, y la colaboración en equipo se gestionó a través de **GitHub** (empleando ramas para el control de versiones) y un tablero de **Trello**.

---

## Características

### Usuarios:
- **Registro de usuarios**: Crea un nuevo usuario con validaciones para el correo, contraseña y fecha de nacimiento.
- **Inicio de sesión**: Autentica usuarios y genera tokens JWT para sesiones.
- **Información del perfil**: Recupera los datos del usuario autenticado.
- **Cierre de sesión**: Elimina el token de autenticación.

### Publicaciones:
- **Crear publicaciones**: Permite a los usuarios autenticados crear publicaciones.
- **Actualizar publicaciones**: Los autores de publicaciones pueden actualizarlas.
- **Eliminar publicaciones**: Los autores pueden eliminar sus propias publicaciones.
- **Consultar publicaciones por título**: Realiza búsquedas basadas en texto.
- **Listar todas las publicaciones**: Recupera todas las publicaciones disponibles.
- **Comentarios**: Los usuarios pueden añadir comentarios a las publicaciones.
- **Likes y Unlikes**: Los usuarios pueden dar "me gusta" o quitarlo de las publicaciones.

---

## Estructura de Archivos

- **Controladores (`controllers`)**
  - `PostController.js`: Maneja las operaciones relacionadas con las publicaciones.
  - `UserController.js`: Gestiona las operaciones relacionadas con los usuarios.
  
- **Modelos (`models`)**
  - `Post.js`: Esquema de datos para publicaciones con soporte para comentarios y "likes".
  - `User.js`: Esquema de datos para usuarios con soporte para autenticación y validación de campos.

- **Rutas (`routes`)**
  - `PostRoutes.js`: Define las rutas relacionadas con las publicaciones.
  - `UserRoutes.js`: Define las rutas relacionadas con los usuarios.

- **Middlewares (`middlewares`)**
  - `authentication.js`: Verifica la autenticidad del token JWT y valida los permisos del usuario.

---

## Tecnologías

- **Backend**: Node.js, Express.js
- **Base de Datos**: MongoDB (Mongoose)
- **Autenticación**: JWT (JSON Web Tokens)
- **Despliegue**: Render

---

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` en el directorio raíz con la variable `JWT_SECRET` y la conexión a MongoDB:
   ```env
   JWT_SECRET=tu_clave_secreta
   MONGODB_URI=tu_url_de_conexion_mongo
   ```
4. Ejecuta el servidor:
   ```bash
   npm start
   ```
5. Accede a la API desde `http://localhost:3000`.

---

## Rutas

### Usuarios
| Método | Ruta            | Descripción                    | Autenticación |
|--------|-----------------|--------------------------------|---------------|
| POST   | `/`             | Registrar un nuevo usuario     | No            |
| POST   | `/login`        | Iniciar sesión                 | No            |
| DELETE | `/logout`       | Cerrar sesión                  | Sí            |
| GET    | `/getInfo`      | Obtener información del perfil | Sí            |

### Publicaciones
| Método | Ruta                   | Descripción                             | Autenticación |
|--------|------------------------|-----------------------------------------|---------------|
| POST   | `/create`              | Crear una nueva publicación             | Sí            |
| PUT    | `/id/:_id`             | Actualizar una publicación              | Sí (Autor)    |
| DELETE | `/id/:_id`             | Eliminar una publicación                | Sí (Autor)    |
| GET    | `/getByTitle/:title`   | Buscar publicaciones por título         | No            |
| GET    | `/getAll`              | Obtener todas las publicaciones         | No            |
| GET    | `/id/:_id`             | Obtener una publicación por ID          | No            |
| PUT    | `/addComment/:_id`     | Agregar un comentario a una publicación | Sí            |
| PUT    | `/like/:_id`           | Dar "like" a una publicación            | Sí            |
| DELETE | `/unLike/:_id`         | Quitar "like" de una publicación        | Sí            |

---

## Organización del Trabajo

### Herramientas utilizadas:
1. **GitHub**:
   - Control de versiones basado en ramas.
   - Pull requests para revisión de código.
2. **Trello**:
   - Seguimiento de tareas.
   - Divisiones claras de responsabilidades.

---

## Autoría

- Luis Rioja y Víctor Navarro


---

¡Gracias por explorar este proyecto! 🎉