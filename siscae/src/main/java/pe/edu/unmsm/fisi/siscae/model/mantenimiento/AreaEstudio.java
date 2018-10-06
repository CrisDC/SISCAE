package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.utilitario.Regex;

import java.util.Date;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AreaEstudio {
private Integer idAreaEstudio;
	
	@Size(min=1, max=45)
	@Length(min = 0, max = 45)
	
	@Pattern(regexp = Regex.ALFANUMERICO, message = "{Pattern.AreaEstudio.nombre}")
	private String nombre;
	
	@Size(min=1, max=45)
	@Length(min = 0, max = 45)
	
	@Pattern(regexp = Regex.ALFANUMERICO, message = "{Pattern.AreaEstudio.pabellon}")
	private String pabellon;
	
	@Size(min=1, max=45)
	@Length(min = 0, max = 45)
	
	@Pattern(regexp = Regex.ALFANUMERICO, message = "{Pattern.AreaEstudio.nivel}")
	private String nivel ;
	
	private Integer aforo;
	
	
	
}
