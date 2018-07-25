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
import pe.edu.unmsm.fisi.siscae.validacion.IdEmpresa;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.IBasico;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IActualizacion;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Empresa
{
    @IdEmpresa(existe = true, groups = IActualizacion.class)
    @IdEmpresa(existe = false, message = "{Existe.Empresa.idEmpresa}", groups = IRegistro.class)
    private String idEmpresa;

    @NotNull(message = "{NotNull.Empresa.descripcion}")
    @NotBlank(message = "{NotBlank.Empresa.descripcion}")
    @Length(min = 3, max = 70, message = "{Length.CodigoProcesoSwitch.descripcion}", groups = IBasico.class)
    private String descripcion;

    @NotNull(message = "{NotNull.Empresa.ruc}")
    @NotBlank(message = "{NotBlank.Empresa.ruc}")
    @Pattern(regexp = Regex.SOLO_DIGITOS, message = "{Pattern.Empresa.ruc}")
    @Length(min = 11, max = 11, message = "{Length.Empresa.ruc}")
    private String ruc;

    @NotNull(message = "{NotNull.Empresa.direccion}")
    @NotBlank(message = "{NotBlank.Empresa.direccion}")
    private String direccion;
}