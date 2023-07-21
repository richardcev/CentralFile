using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Backend.Models;

public partial class CentralfileContext : DbContext
{
    public CentralfileContext()
    {
    }

    public CentralfileContext(DbContextOptions<CentralfileContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    public virtual DbSet<UsuarioContacto> UsuarioContactos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {

    }
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
//        => optionsBuilder.UseSqlServer("server=DESKTOP-1D2QBNB\\SQLEXPRESS; database=centralfile; integrated security=true; Encrypt=False;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Usuarios__3214EC27EBD419DF");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Clave)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Direccion)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.NombreUsuario)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Telefono)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<UsuarioContacto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Usuario___3214EC27BDC0325B");

            entity.ToTable("Usuario_Contacto");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.IdContacto).HasColumnName("ID_contacto");
            entity.Property(e => e.IdUsuario).HasColumnName("ID_usuario");

            entity.HasOne(d => d.IdContactoNavigation).WithMany(p => p.UsuarioContactoIdContactoNavigations)
                .HasForeignKey(d => d.IdContacto)
                .HasConstraintName("FK__Usuario_C__ID_co__60A75C0F");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.UsuarioContactoIdUsuarioNavigations)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("FK__Usuario_C__ID_us__5FB337D6");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
