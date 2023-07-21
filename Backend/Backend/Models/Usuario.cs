using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public string? NombreUsuario { get; set; }

    public string? Clave { get; set; }

    public string? Nombre { get; set; }

    public string? Telefono { get; set; }

    public string? Direccion { get; set; }

    public virtual ICollection<UsuarioContacto> UsuarioContactoIdContactoNavigations { get; set; } = new List<UsuarioContacto>();

    public virtual ICollection<UsuarioContacto> UsuarioContactoIdUsuarioNavigations { get; set; } = new List<UsuarioContacto>();
}
