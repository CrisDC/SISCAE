package pe.edu.unmsm.fisi.siscae.model.consulta;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrestamoDetalle2 {
	
	
	String numDocumento;
	String appPaterno;
	String appMaterno;
	String nombre;
	String tipoPersona;
	String recurso;
	String tipo_recurso;
	String tiempo;
	String areaEstudio;
	String entrada;
	String salida;
	String fecha;
	
	
	

}
