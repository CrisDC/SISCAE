package pe.edu.unmsm.fisi.siscae.model.mantenimiento;


import java.time.LocalTime;
import java.util.Date;

import javax.validation.constraints.NotNull;

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


public class Prestamo {
	
	private Integer idPrestamo;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "EST")
    @NotNull(message = "{NotNull.Prestamo.fecha}")
	private Date fecha;
	
	private LocalTime horaEntrada;
	
	private LocalTime horaSalida;
	
	@NotNull(message = "{NotNull.Prestamo.estadoPrestamo}")
	private Integer idEstadoTabla;
	
	private Integer idRecurso;
	
	private Integer idAdministrativo;
	
	private Integer idPersona;
	
}
