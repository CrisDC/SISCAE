package pe.edu.unmsm.fisi.siscae.model;

import java.util.Date;

import lombok.Data;

@Data
public class Perfil
{
    private String idPerfil;
    private String descripcion;
    private String usuarioAdicion;
    private Date fechaAdicion;
    private String usuarioModificacion;
    private Date fechaModificacion;
}