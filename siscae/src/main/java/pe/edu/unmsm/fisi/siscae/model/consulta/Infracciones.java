package pe.edu.unmsm.fisi.siscae.model.consulta;

import java.time.LocalTime;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Infracciones {
	String numeroDocumento;
	String nombre;
	String appPaterno;
	String appMaterno;
	String tipoInfraccion;
	Date fechaInfraccion;
	String areaEstudio;
}
