package pe.edu.unmsm.fisi.siscae.service.impl.consulta;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IPrestamoDetalle2Mapper;
import pe.edu.unmsm.fisi.siscae.mapper.ISancionadoMapper;
import pe.edu.unmsm.fisi.siscae.model.consulta.ConsultaInfracciones;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Sancionado;
import pe.edu.unmsm.fisi.siscae.service.IPrestamoDetalle2Service;
import pe.edu.unmsm.fisi.siscae.service.ISancionadoService;

@Service
public class SancionadoService implements ISancionadoService {

	
	private @Autowired ISancionadoMapper sancionadoMapper; 
	
	@Override
	public List<Sancionado> buscarPorCriterio(ConsultaInfracciones criterioBusqueda) {
		return sancionadoMapper.buscarPorCriterio(criterioBusqueda);
	}

}
