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
	
	@NotNull
	private Date fechaInicio;
	
	@NotNull
	private Date fechaFin;
	
	@NotBlank
	@Size(min=3,max=30)
    @Length(min = 3, max = 30)
	private String cargo;
	
	@NotNull
	@PastOrPresent
	private Date fechaRegistro;
	
	@NotBlank
	@Size(min=3,max=45)
	@Length(min = 3, max = 45)
	private String usuarioRegistro;
	
	@NotNull
	@PastOrPresent
	private Date fechaModificacion;
	
	@NotBlank
	@Size(min=3,max=45)
	@Length(min = 3, max = 45)
	private String usuarioModificacion;
}
