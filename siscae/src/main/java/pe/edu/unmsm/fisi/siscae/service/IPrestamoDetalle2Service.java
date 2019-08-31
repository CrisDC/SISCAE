package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.consulta.PrestamoDetalle2;
import pe.edu.unmsm.fisi.siscae.model.criterio.PrestamoDetalle2CriterioBusqueda;



public interface IPrestamoDetalle2Service {

	
	public List<PrestamoDetalle2> buscarPorCriterio(PrestamoDetalle2CriterioBusqueda criterioBusqueda);
	
}
