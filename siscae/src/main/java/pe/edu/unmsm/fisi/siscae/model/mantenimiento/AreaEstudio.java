package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
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
	@NotBlank
	private String nombre;
	@NotBlank
	private String pabellon;
	@NotBlank
	private String nivel ;
	@NotNull
	@PastOrPresent
	private Date fechaRegistro;
	@NotBlank
	private String usuarioRegistro;
	@NotNull
	@PastOrPresent
	private Date fechaModificacion;
	@NotBlank
	private String usuarioModificacion;
	
}
