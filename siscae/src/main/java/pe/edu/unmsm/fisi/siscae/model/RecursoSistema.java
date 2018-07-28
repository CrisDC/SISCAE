package pe.edu.unmsm.fisi.siscae.model;

import java.util.Date;

import lombok.Data;

@Data
public class RecursoSistema
{
    private String idRecurso;
    private String descripcion;
    private String usuarioAdicion;
    private Date fechaAdicion;
}