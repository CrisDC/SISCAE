package pe.edu.unmsm.fisi.siscae.model.consulta;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.model.consulta.Infracciones.InfraccionesBuilder;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConsultaSancionados {
	int idPersona;
	String docIdentificador;
	String nombre;
	String appPaterno;
	String appMaterno;
	String fechaRegistro;
	String tiempoRestante;
	String tipoSolicitante;
}
