package pe.edu.unmsm.fisi.siscae.service.impl.consulta;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import pe.edu.unmsm.fisi.siscae.mapper.IConsultaInfraccionesMapper;
import pe.edu.unmsm.fisi.siscae.model.consulta.Infracciones;
import pe.edu.unmsm.fisi.siscae.model.criterio.ConsultaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.criterio.NumeroDocumentoIdentidadCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.service.IConsultaInfraccionesService;

public class ConsultaInfraccionesService implements IConsultaInfraccionesService{

	private @Autowired IConsultaInfraccionesMapper consultaInfraccionesMapper;
	@Override
	public List<Infracciones> buscarTodos() {
		return consultaInfraccionesMapper.buscarTodos();
	}

	@Override
	public List<Infracciones> buscarPorCriterio(ConsultaPrestamosCriterioBusqueda criterioBusqueda) {
		return consultaInfraccionesMapper.buscarPorCriterio(criterioBusqueda);
	}

	@Override
	public List<Infracciones> buscarPorNumeroDocumentoIdentidad(
			NumeroDocumentoIdentidadCriterioBusqueda criterioBusqueda) {
		return consultaInfraccionesMapper.buscarPorNumeroDocumentoIdentidad(criterioBusqueda);
	}

}
