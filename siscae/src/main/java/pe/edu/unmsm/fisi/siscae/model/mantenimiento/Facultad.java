package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import javax.validation.constraints.NotNull;
import java.util.Date;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Facultad {
	
	 private Integer idFacultad;
	 
	 @NotNull(message = "{NotNull.Facultad.nombre}")
	 @NotBlank(message = "{NotBlank.Facultad.nombre}")
	 @Length(min = 3, max = 60, message = "{Length.CodigoProcesoSwitch.nombre}")
	 private  String nombre;
	 
	
}
