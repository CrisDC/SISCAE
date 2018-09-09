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
public class CategoriaRecurso
{
    private int idCategoria;
    private String categoria;
    private String accionCategoria;
   
    private List<MultiTabDet> acciones;
}
