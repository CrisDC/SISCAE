package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.validacion.IdAreaEstudio;
import pe.edu.unmsm.fisi.siscae.validacion.IdEmpresa;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IActualizacion;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

import java.util.Date;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;

import org.hibernate.validator.constraints.NotBlank;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AreaEstudio {
	private Integer idAreaEstudio;
	
	@NotBlank(message = "{NotBlank.AreaEstudio.nombre}")
	private String nombre;
	
	@NotBlank(message = "{NotBlank.AreaEstudio.pabellon}")
	private String pabellon;
	
	@NotBlank(message = "{NotBlank.AreaEstudio.nivel}")
	private String nivel ;
	
	@NotNull(message = "{NotNull.Horario.fecha_registro}")
	@PastOrPresent
	private Date fechaRegistro;
	
	@NotBlank(message = "{NotBlank.AreaEstudio.usuario_registro}")
	private String usuarioRegistro;
	
	@NotNull(message = "{NotNull.AreaEstudio.fecha_modificacion}")
	@PastOrPresent
	private Date fechaModificacion;
	
	@NotBlank(message = "{NotBlank.AreaEstudio.usuario_modificacion}")
	private String usuarioModificacion;
	
}
