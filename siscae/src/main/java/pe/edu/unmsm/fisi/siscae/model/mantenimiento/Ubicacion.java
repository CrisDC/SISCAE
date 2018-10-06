package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Ubicacion {

	private Integer idUbicacion;
	private Double coordenadaX;
	private Double coordenadaY;
	

}
