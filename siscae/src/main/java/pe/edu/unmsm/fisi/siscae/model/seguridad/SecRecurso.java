package pe.edu.unmsm.fisi.siscae.model.seguridad;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MultiTabDet;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SecRecurso 
{
	private String idRecurso;
	private String descripcion;
	private String idCategoria;
	private String accionRecurso;
	private String permiso;
	private List<MultiTabDet> acciones;
}