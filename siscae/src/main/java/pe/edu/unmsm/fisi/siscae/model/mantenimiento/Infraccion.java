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

public class Infraccion {
	private Integer idInfraccion;
	
	@NotNull(message = "{NotNull.Infraccion.descripcion}")
    @NotBlank(message = "{NotBlank.Infraccion.descripcion}")
    @Length(min = 10, max  = 45, message = "{Length.CodigoProcesoSwitch.descripcion}")
	private String descripcion;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "EST")
    @NotNull(message = "{NotNull.Infraccion.fecha}")
	private Date fecha;
	
	private Integer idEstadoTabla;
	
	private Integer idPersona;
	private Integer idTipoInfraccion;

	private String descripcionTabla;
	private String nombre;
	private String appPaterno;
	private String appMaterno;
	private String descripcionTipoInfraccion;
	
	
}
