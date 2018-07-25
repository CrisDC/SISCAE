package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.utilitario.Regex;
import pe.edu.unmsm.fisi.siscae.validacion.CodigoInstitucion;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IActualizacion;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Institucion
{
    @CodigoInstitucion(existe = true, groups = IActualizacion.class)
    @CodigoInstitucion(existe = false, message = "{ExisteInstitucion.Institucion.codigoInstitucion}", groups = IRegistro.class)
    private Integer codigoInstitucion;

    @NotNull(message = "{NotNull.Institucion.descripcion}")
    @NotBlank(message = "{NotBlank.Institucion.descripcion}")
    @Length(min = 3, max = 80, message = "{Length.Institucion.descripcion}")
    private String descripcion;

    @NotNull(message = "{NotNull.Institucion.cuenta_compensacion}")
    @Pattern(regexp = Regex.SOLO_1_o_0, message = "{Pattern.Institucion.cuentaCompensacion}")
    private String cuentaCompensacion;

    @NotBlank(message = "{NotBlank.Institucion.descripcionCorta}")
    @NotNull(message = "{NotNull.Institucion.descripcionCorta}")
    @Length(min = 3, max = 30, message = "{Length.Institucion.descripcionCorta}")
    private String descripcionCorta;
    private String bancoAdministrador;
    private Integer operadorInstitucion;
}