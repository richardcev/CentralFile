﻿using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class UsuarioContacto
{
    public int Id { get; set; }

    public int? IdUsuario { get; set; }

    public int? IdContacto { get; set; }

    public virtual Usuario? IdContactoNavigation { get; set; }

    public virtual Usuario? IdUsuarioNavigation { get; set; }
}
