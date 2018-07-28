package pe.edu.unmsm.fisi.siscae.model.practica;


import java.sql.Time;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor


public class Prestamo {
	
	private int idPrestamo;
	
	private Date fecha;
	
	private Time horaEntrada;
	
	private Time horaSalida;
	
	private String estadoPrestamo;
	
	private int idRecurso;
	
	private int idAdministrativo;
	
	private int idPersona;
	
	private Date fechaRegistro;
	
	private String usuarioRegistro;
	
	private Date fechaModificacion;
	
	private String usuarioModificacion;

}
