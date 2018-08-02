package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AreaAdministrativo {
	private Integer idAreaEstudio;
	private Integer idAdministrativo;
	
	@NotNull(message = "{NotNull.AreaAdministrativo.fecha_inicio}")
	private Date fechaInicio;
	
	@NotNull(message = "{NotNull.AreaAdministrativo.fecha_fin}")
	private Date fechaFin;
	
	@NotNull(message = "{NotNull.AreaAdministrativo.cargo}")
	@NotBlank(message = "{NotBlank.AreaAdministrativo.cargo}")
	@Size(min=3,max=30)
    @Length(min = 3, max = 30)
	private String cargo;
	
	@NotNull(message = "{NotNull.AreaAdministrativo.fecha_registro}")
	@PastOrPresent
	private Date fechaRegistro;
	
	@NotNull(message = "{NotNull.AreaAdministrativo.usuario_registro}")
	@NotBlank(message = "{NotBlank.AreaAdministrativo.usuario_registro}")
	@Size(min=3,max=45)
	@Length(min = 3, max = 45)
	private String usuarioRegistro;
	

	@NotNull(message = "{NotNull.AreaAdministrativo.fecha_modificacion}")
	@PastOrPresent
	private Date fechaModificacion;
	
	@NotNull(message = "{NotNull.AreaAdministrativo.usuario_modificacion}")
	@NotBlank(message = "{NotBlank.AreaAdministrativo.usuario_modificacion}")
	@Size(min=3,max=45)
	@Length(min = 3, max = 45)
	private String usuarioModificacion;
}
