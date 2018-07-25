package pe.edu.unmsm.fisi.siscae.model.seguridad;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.validacion.CodigoPerfil;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IActualizacion;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SecPerfil
{
    @CodigoPerfil(existe = true, groups = IActualizacion.class)
    @CodigoPerfil(existe = false, message = "{Existe.Perfil.idPerfil}", groups = IRegistro.class)
    private String idPerfil;

    @NotNull(message = "{NotNull.Perfil.descripcion}")
    @NotBlank(message = "{NotBlank.Perfil.descripcion}")
    private String descripcion;
    
    private List<SecRecurso> recursos;
}