using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Newtonsoft.Json.Linq;


using Microsoft.AspNetCore.Cors;
using System.Text.Json;

namespace Backend.Controllers
{
    [EnableCors("ReglasCors")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        public readonly CentralfileContext _dbcontext;

        public UsuariosController(CentralfileContext _context)
        {
            _dbcontext = _context;
        }

        [HttpGet]
        [Route("lista")]
        public IActionResult Lista()
        {
            List<Usuario> lista = new List<Usuario>();

            try
            {
                lista = _dbcontext.Usuarios.ToList();
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = lista });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { mensaje = ex });

            }

        }

        [HttpGet]
        [Route("obtener/{nombreUsuario}")]
        public IActionResult Obtener(string nombreUsuario)
        {
            Usuario oUsuario = _dbcontext.Usuarios.FirstOrDefault(p => p.NombreUsuario == nombreUsuario);

            if (oUsuario == null)
            {
                return BadRequest("Usuario no encontrado");
            }

            try
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = oUsuario });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { mensaje = ex });
            }
        }

        public class ContactoInfo
        {
            public int ID_usuario { get; set; }
            public string Usuario { get; set; }
            public string Contacto { get; set; }

            public string NombreContacto { get; set; }
            public int Id_contacto { get; set; }
        }


        [HttpGet]
        [Route("obtenercontactos/{nombreUsuario}")]
        public IActionResult ObtenerContactos(string nombreUsuario)
        {
            Usuario oUsuario = _dbcontext.Usuarios.FirstOrDefault(p => p.NombreUsuario == nombreUsuario);

            if (oUsuario == null)
            {
                return BadRequest("Usuario no encontrado");
            }

            try
            {
                // Realizar la consulta con LINQ
                var contactos = (from uc in _dbcontext.UsuarioContactos
                                 join u1 in _dbcontext.Usuarios on uc.IdUsuario equals u1.Id
                                 join u2 in _dbcontext.Usuarios on uc.IdContacto equals u2.Id
                                 where u1.NombreUsuario == nombreUsuario
                                 select new ContactoInfo
                                 {
                                     ID_usuario = (int)uc.IdUsuario,
                                     Usuario = u1.NombreUsuario,
                                     Contacto = u2.NombreUsuario,
                                     NombreContacto= u2.Nombre,
                                     Id_contacto = (int)uc.IdContacto
                                 }).ToList();

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = contactos });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { mensaje = ex });
            }
        }


        [HttpPost]
        [Route("guardar")]
        public IActionResult Guardar([FromBody] Usuario objeto)
        {
            try
            {
                // Verificar si el nombre de usuario ya existe en la base de datos
                bool existeUsuario = _dbcontext.Usuarios.Any(u => u.NombreUsuario == objeto.NombreUsuario);

                if (existeUsuario)
                {
                    return BadRequest("El nombre de usuario ya está en uso. Por favor, elige otro nombre de usuario.");
                }

                _dbcontext.Usuarios.Add(objeto);
                _dbcontext.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "Usuario registrado exitosamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
        }


        [HttpPut]
        [Route("editar")]
        public IActionResult Editar([FromBody] Usuario objeto)
        {
            Usuario oUsuario = _dbcontext.Usuarios.FirstOrDefault(u => u.NombreUsuario == objeto.NombreUsuario);

            if (oUsuario == null)
            {
                return BadRequest("Usuario no encontrado");
            }
            try
            {
                oUsuario.Nombre = objeto.Nombre is null ? oUsuario.Nombre : objeto.Nombre;
                oUsuario.Clave = objeto.Clave is null ? oUsuario.Clave : objeto.Clave;
                oUsuario.Telefono = objeto.Telefono is null ? oUsuario.Telefono : objeto.Telefono;
                oUsuario.Direccion = objeto.Direccion is null ? oUsuario.Direccion : objeto.Direccion;
                _dbcontext.Usuarios.Update(oUsuario);
                _dbcontext.SaveChanges();
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { mensaje = ex });

            }

        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] Usuario objeto)
        {
            Usuario oUsuario = _dbcontext.Usuarios.FirstOrDefault(u => u.NombreUsuario == objeto.NombreUsuario);

            if (oUsuario == null)
            {
                return BadRequest("Nombre de usuario incorrecto");
            }

            if (oUsuario.Clave != objeto.Clave)
            {
                return BadRequest("Clave incorrecta");
            }

            return Ok(new { mensaje = "Inicio de sesión exitoso" });
        }

        [HttpPost]
        [Route("agregarcontacto")]
        public IActionResult AgregarContacto([FromBody] JsonElement objeto)
        {
            try
            {
                if (objeto.TryGetProperty("username", out JsonElement usernameElement) &&
                    objeto.TryGetProperty("id", out JsonElement idElement))
                {
                    string username = usernameElement.GetString();
                    int idContacto = idElement.GetInt32();

                    if (string.IsNullOrEmpty(username) || idContacto == 0)
                    {
                        return BadRequest("Parámetros incorrectos");
                    }

                    Usuario usuarioActual = _dbcontext.Usuarios.FirstOrDefault(u => u.NombreUsuario == username);

                    if (usuarioActual == null)
                    {
                        return BadRequest("Nombre de usuario incorrecto");
                    }

                    Usuario contactoAgregar = _dbcontext.Usuarios.Find(idContacto);

                    if (contactoAgregar == null)
                    {
                        return BadRequest("El usuario de contacto no existe");
                    }

                    // Creo un nuevo objeto UsuarioContacto y lo agrega a la base de datos
                    UsuarioContacto nuevoContacto = new UsuarioContacto
                    {
                        IdUsuario = usuarioActual.Id,
                        IdContacto = contactoAgregar.Id
                    };

                    _dbcontext.UsuarioContactos.Add(nuevoContacto);
                    _dbcontext.SaveChanges();

                    // Realizar la consulta LINQ para obtener la información del contacto recién agregado
                    var contactoAgregado = (from uc in _dbcontext.UsuarioContactos
                                            join u1 in _dbcontext.Usuarios on uc.IdUsuario equals u1.Id
                                            join u2 in _dbcontext.Usuarios on uc.IdContacto equals u2.Id
                                            where u1.NombreUsuario == username && uc.IdContacto == idContacto
                                            select new ContactoInfo
                                            {
                                                ID_usuario = (int)uc.IdUsuario,
                                                Usuario = u1.NombreUsuario,
                                                Contacto = u2.NombreUsuario,
                                                NombreContacto = u2.Nombre,
                                                Id_contacto = (int)uc.IdContacto
                                            }).FirstOrDefault();

                    // Devolver la información del contacto recién agregado en el JSON de respuesta
                    return Ok(new { mensaje = "Contacto agregado exitosamente", response = contactoAgregado });
                }
                else
                {
                    return BadRequest("Parámetros incorrectos");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
        }



        [HttpDelete]
        [Route("eliminarcontacto")]
        public IActionResult EliminarContacto([FromBody] JsonElement objeto)
        {
            try
            {
                if (objeto.TryGetProperty("username", out JsonElement usernameElement) &&
                    objeto.TryGetProperty("idContacto", out JsonElement idContactoElement))
                {
                    string username = usernameElement.GetString();
                    int idContacto = idContactoElement.GetInt32();

                    if (string.IsNullOrEmpty(username) || idContacto == 0)
                    {
                        return BadRequest("Parámetros incorrectos");
                    }

                    Usuario usuarioActual = _dbcontext.Usuarios.FirstOrDefault(u => u.NombreUsuario == username);

                    if (usuarioActual == null)
                    {
                        return BadRequest("Nombre de usuario incorrecto");
                    }

                    UsuarioContacto contactoEliminar = _dbcontext.UsuarioContactos.FirstOrDefault(uc => uc.IdUsuario == usuarioActual.Id && uc.IdContacto == idContacto);

                    if (contactoEliminar == null)
                    {
                        return BadRequest("El contacto no existe para este usuario");
                    }

                    // Realizar la consulta LINQ para obtener la información del contacto eliminado
                    var contactoEliminado = (from uc in _dbcontext.UsuarioContactos
                                             join u1 in _dbcontext.Usuarios on uc.IdUsuario equals u1.Id
                                             join u2 in _dbcontext.Usuarios on uc.IdContacto equals u2.Id
                                             where u1.NombreUsuario == username && uc.IdContacto == idContacto
                                             select new ContactoInfo
                                             {
                                                 ID_usuario = (int)uc.IdUsuario,
                                                 Usuario = u1.NombreUsuario,
                                                 Contacto = u2.NombreUsuario,
                                                 NombreContacto = u2.Nombre,
                                                 Id_contacto = (int)uc.IdContacto
                                             }).FirstOrDefault();

                    _dbcontext.UsuarioContactos.Remove(contactoEliminar);
                    _dbcontext.SaveChanges();

                    // Devolver la información del contacto eliminado en el JSON de respuesta
                    return Ok(new { mensaje = "Contacto eliminado exitosamente", response = contactoEliminado });
                }
                else
                {
                    return BadRequest("Parámetros incorrectos");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
        }







    }
}
