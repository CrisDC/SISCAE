package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TipoRecurso {
	private Integer idTipoRecurso;
	
	
    @Length(min = 3, max = 20, message = "{Length.CodigoProcesoSwitch.nombre}")
	private String nombre;
	
	
    @Length(min = 3, max  = 45, message = "{Length.CodigoProcesoSwitch.descripcion}")
	private String descripcion;
	
	
    @Length(min = 3, max  = 20, message = "{Length.CodigoProcesoSwitch.uso}")
	private String uso;
	


	private int maxCapacidad;
}
