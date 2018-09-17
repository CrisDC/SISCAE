package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IConsultaPrestamosMapper;
import pe.edu.unmsm.fisi.siscae.model.Documento;
import pe.edu.unmsm.fisi.siscae.model.consulta.PrestamoRecurso;
import pe.edu.unmsm.fisi.siscae.model.criterio.ConsultaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.criterio.CriterioBusquedaDocumento;
import pe.edu.unmsm.fisi.siscae.model.criterio.NumeroDocumentoIdentidadCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.service.IConsultaPrestamosService;



public class ConsultaPrestamosService implements IConsultaPrestamosService{

	@Override
	public List<PrestamoRecurso> buscarTodos() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<PrestamoRecurso> buscarPorCriterio(ConsultaPrestamosCriterioBusqueda criterioBusqueda) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<PrestamoRecurso> buscarPorNumeroDocumentoIdentidad(
			NumeroDocumentoIdentidadCriterioBusqueda criterioBusqueda) {
		// TODO Auto-generated method stub
		return null;
	}
	
	

}
