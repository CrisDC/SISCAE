package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Material.MaterialBuilder;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MovimientoDesalojarArea {
	String username;
}
