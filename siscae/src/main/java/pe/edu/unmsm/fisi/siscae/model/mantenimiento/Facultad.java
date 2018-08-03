package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sun.star.bridge.oleautomation.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Empresa.EmpresaBuilder;
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
	 
	 @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "EST")
	 @NotNull(message = "{NotNull.Facultad.fechaRegistro}")
	 private Date fechaRegistro;
	 
	 @NotNull(message = "{NotNull.Facultad.usuarioRegistro}")
	 @NotBlank(message = "{NotBlank.Facultad.usuarioRegistro}")
	 @Length(min = 3, max = 45, message = "{Length.CodigoProcesoSwitch.usuarioRegistro}")
	 private String usuarioRegistro;
	 
	 @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "EST")
	 @NotNull(message = "{NotNull.Facultad.fehaModificacion}")
	 private Date fehaModificacion;
	 
	 @NotNull(message = "{NotNull.Facultad.usuarioModificacion}")
	 @NotBlank(message = "{NotBlank.Facultad.usuarioModificacion}")
	 @Length(min = 3, max = 45, message = "{Length.CodigoProcesoSwitch.usuarioModificacion}")
	 private String usuarioModificacion;
	//LOS COMENTARIOS VAN A TODOS MENOS A LOS INTEGER 
}
