package pe.edu.unmsm.fisi.siscae.service.impl.consulta;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IPrestamoDetalle2Mapper;
import pe.edu.unmsm.fisi.siscae.model.consulta.PrestamoDetalle2;
import pe.edu.unmsm.fisi.siscae.model.criterio.PrestamoDetalle2CriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.service.IPrestamoDetalle2Service;

@Service
public class PrestamoDetalle2Service implements IPrestamoDetalle2Service {

	private @Autowired IPrestamoDetalle2Mapper prestamoDetalle2Mapper; 
	
	
	@Override
	public List<PrestamoDetalle2> buscarPorCriterio(PrestamoDetalle2CriterioBusqueda criterioBusqueda) {
		
		return prestamoDetalle2Mapper.buscarPorCriterio(criterioBusqueda);
	}

}
