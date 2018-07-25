package pe.edu.unmsm.fisi.siscae.model;

import java.util.Date;

import lombok.Data;

@Data
public class Usuario
{
    private String idUsuario;
    private String password;
    private String nombre;
    private String nombre2;
    private String id_perfil;
    private String id_institucion;
    private String email;
    private String empresa;
    private Date fechaCreacion;
    private Date fechaPass;
    private int activo;
}
