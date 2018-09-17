package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IEstadoTablaMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.EstadoTabla;
import pe.edu.unmsm.fisi.siscae.service.IEstadoTablaService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;

@Service
public class EstadoTablaService extends MantenibleService<EstadoTabla> implements IEstadoTablaService {

	private IEstadoTablaMapper estadoTablaMapper;
	
	public EstadoTablaService(@Qualifier("IEstadoTablaMapper") IMantenibleMapper<EstadoTabla> mapper) {
		super(mapper);
		this.estadoTablaMapper = (IEstadoTablaMapper) mapper;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<EstadoTabla> buscarTodos() {
		return super.buscar(new EstadoTabla(), Operacion.SELECT);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public EstadoTabla buscarPorId(Integer idEstadoTabla) {
		EstadoTabla estadoTabla = EstadoTabla.builder().idEstadoTabla(idEstadoTabla).build();
		return super.buscarPorId(estadoTabla);
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public List<EstadoTabla> buscarporTablaOrigen(String tablaOrigen) {
		EstadoTabla estadoTabla = EstadoTabla.builder().tablaOrigen(tablaOrigen).build();
		return super.buscar(estadoTabla, OperacionParam.TABLA_ORIGEN);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public boolean existe(Integer idEstadoTabla) {
		EstadoTabla estadoTabla = EstadoTabla.builder().idEstadoTabla(idEstadoTabla).build();
		return super.existe(estadoTabla);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void registrarEstadoTabla(EstadoTabla estadoTabla) {
		super.registrar(estadoTabla);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void actualizarEstadoTabla(EstadoTabla estadoTabla) {
		super.actualizar(estadoTabla);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void eliminarEstadoTabla(EstadoTabla estadoTabla) {
		super.eliminar(estadoTabla);
	}
	
}
