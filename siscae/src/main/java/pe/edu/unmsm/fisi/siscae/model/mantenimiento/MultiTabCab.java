package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.validacion.IdTabla;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IActualizacion;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MultiTabCab
{
    @IdTabla(existe = true, groups = IActualizacion.class)
    @IdTabla(existe = false, message = "{Existe.MultiTabCab.idTabla}", groups = IRegistro.class)
    private int idTabla;

    @NotNull(message = "{NotNull.MultiTabCab.descripcion}")
    @NotBlank(message = "{NotBlank.MultiTabCab.descripcion}")
    @Length(min = 3, max = 80, message = "{Length.MultiTabCab.descripcion}")
    private String descripcion;
}