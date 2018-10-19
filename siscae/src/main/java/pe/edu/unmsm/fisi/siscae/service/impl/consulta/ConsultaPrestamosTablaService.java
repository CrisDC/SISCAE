package pe.edu.unmsm.fisi.siscae.service.impl.consulta;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IConsultaPrestamosTablaMapper;
import pe.edu.unmsm.fisi.siscae.model.consulta.PrestamoRecursoTabla;
import pe.edu.unmsm.fisi.siscae.model.criterio.ConsultaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.criterio.NumeroDocumentoIdentidadCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.service.IConsultaPrestamosTablaService;



@Service
public class ConsultaPrestamosTablaService implements IConsultaPrestamosTablaService{

	private @Autowired IConsultaPrestamosTablaMapper consultaPrestamosTablaMapper;
	
	@Override
	public List<PrestamoRecursoTabla> buscarTodos() {
		return consultaPrestamosTablaMapper.buscarTodos();
	}

	@Override
	public List<PrestamoRecursoTabla> buscarPorCriterio(ConsultaPrestamosCriterioBusqueda criterioBusqueda) {
		return consultaPrestamosTablaMapper.buscarPorCriterio(criterioBusqueda);
	}

	@Override
	public List<PrestamoRecursoTabla> buscarPorNumeroDocumentoIdentidad(
			NumeroDocumentoIdentidadCriterioBusqueda criterioBusqueda) {
		return consultaPrestamosTablaMapper.buscarPorNumeroDocumentoIdentidad(criterioBusqueda);
	}

	@Override
	public List<PrestamoRecursoTabla> buscarPorCriterio2(ConsultaPrestamosCriterioBusqueda criterioBusqueda) {
		return consultaPrestamosTablaMapper.buscarPorCriterio(criterioBusqueda);
	}
}
	
	