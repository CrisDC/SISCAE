package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.validacion.CodigoSubModulo;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.IBasico;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IActualizacion;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubModulo
{
    @CodigoSubModulo(existe = true, groups = IActualizacion.class)
    @CodigoSubModulo(existe = false, message = "{Existe.SubModulo.codigo}", groups = IRegistro.class)
    private String codigoSubModulo;

    @NotNull(message = "{NotNull.SubModulo.descripcion}", groups = IBasico.class)
    @NotBlank(message = "{NotBlank.SubModulo.descripcion}", groups = IBasico.class)
    @Length(min = 3, max = 50, message = "{Length.SubModulo.descripcion}", groups = IBasico.class)
    private String descripcion;
}