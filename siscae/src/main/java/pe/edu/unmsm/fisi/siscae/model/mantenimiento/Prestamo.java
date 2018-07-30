package pe.edu.unmsm.fisi.siscae.model.mantenimiento;


import java.sql.Time;
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
	
	private Time horaEntrada;
	
	private Time horaSalida;
	
	private String estadoPrestamo;
	
	private Integer idRecurso;
	
	private Integer idAdministrativo;
	
	private Integer idPersona;
	
	private DateTime fechaRegistro;
	
	private String usuarioRegistro;
	
	private DateTime fechaModificacion;
	
	private String usuarioModificacion;

}
