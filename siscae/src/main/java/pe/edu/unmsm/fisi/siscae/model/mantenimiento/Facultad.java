package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import com.sun.star.bridge.oleautomation.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Empresa.EmpresaBuilder;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Facultad {
	 private Integer idFacultad;
	 private  String nombre;
	 private Date fechaRegistro;
	 private String usuarioRegistro;
	 private Date fehaModificacion;
	 private String usuarioModificacion;
	
}
