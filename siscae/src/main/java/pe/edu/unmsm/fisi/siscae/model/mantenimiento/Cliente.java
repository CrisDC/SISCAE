package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.validacion.IdCliente;
import pe.edu.unmsm.fisi.siscae.validacion.IdEmpresa;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.IBasico;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.ICampo;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IActualizacion;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@IdCliente(existe = true, groups = IActualizacion.class)
@IdCliente(existe = false, groups = IRegistro.class)
public class Cliente
{
    private String idCliente;

    @IdEmpresa(existe = true, groups = ICampo.class)
    private String idEmpresa;

    @NotNull(message = "{NotNull.Cliente.descripcion}", groups = IBasico.class)
    @NotBlank(message = "{NotBlank.Cliente.descripcion}", groups = IBasico.class)
    @Length(min = 3, max = 40, message = "{Length.Cliente.descripcion}", groups = IBasico.class)
    private String descripcion;
    private String descripcionEmpresa;
}