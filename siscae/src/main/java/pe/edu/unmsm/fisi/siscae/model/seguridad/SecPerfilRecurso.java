package pe.edu.unmsm.fisi.siscae.model.seguridad;

import lombok.Data;

@Data
public class SecPerfilRecurso
{
    private String idPerfil;
    private String idRecurso;
    private String descripcion;
    private String permiso;
}