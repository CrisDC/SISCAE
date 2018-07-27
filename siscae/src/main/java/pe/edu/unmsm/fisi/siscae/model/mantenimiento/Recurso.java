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
public class Recurso {

	private Integer idRecurso;
	private String numeroSerie;
	private String descripcion;
	private Integer maxCapacidad;
	private Boolean estado;
	private Integer idTipoRecurso;
	private Integer idAreaEstudio;
	private Integer idUbicacion;
	private Integer idRecursoPadre;
	private Date fechaRegistro;
	private String usuarioRegistro;
	private Date fechaModificacion;
	private String usuarioModificacion;

}
