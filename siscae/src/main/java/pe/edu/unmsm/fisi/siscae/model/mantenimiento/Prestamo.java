package pe.edu.unmsm.fisi.siscae.model.mantenimiento;


import java.time.LocalTime;
import java.util.Date;

import com.sun.star.util.DateTime;

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
	
	private Date fecha;
	
	private LocalTime horaEntrada;
	
	private LocalTime horaSalida;
	
	private String estadoPrestamo;
	
	private Integer idRecurso;
	
	private Integer idAdministrativo;
	
	private Integer idPersona;
	
	private Date fechaRegistro;
	
	private String usuarioRegistro;
	
	private DateTime fechaModificacion;
	
	private String usuarioModificacion;

}
