package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.validacion.CodigoMembresia;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IActualizacion;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Membresia
{
    @CodigoMembresia(existe = true, groups = IActualizacion.class)
    @CodigoMembresia(existe = false, message = "{Existe.Membresia.codigoMembresia}", groups = IRegistro.class)
    private String codigoMembresia;

    @NotNull(message = "{NotNull.Membresia.descripcion}")
    @NotBlank(message = "{NotBlank.Membresia.descripcion}")
    @Length(min = 3, max = 20, message = "{Length.Membresia.descripcion}")
    private String descripcion;
}