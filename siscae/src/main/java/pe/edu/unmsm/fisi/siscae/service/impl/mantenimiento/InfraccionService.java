package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IInfraccionMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Infraccion;
import pe.edu.unmsm.fisi.siscae.service.IInfraccionService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.VerboConstantes;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;

@Service
public class InfraccionService extends MantenibleService<Infraccion> implements IInfraccionService {

	private IInfraccionMapper infraccionMapper;

	public InfraccionService(@Qualifier("IInfraccionMapper") IMantenibleMapper<Infraccion> mapper) {
		super(mapper);
		this.infraccionMapper = (IInfraccionMapper) mapper;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<Infraccion> buscarTodos() {
		return super.buscar(new Infraccion(), Operacion.SELECT);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public Infraccion buscarPorId(Integer idInfraccion) {
		Infraccion infraccion = Infraccion.builder().idInfraccion(idInfraccion).build();
		return super.buscarPorId(infraccion);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public boolean existe(Integer idInfraccion) {
		Infraccion infraccion = Infraccion.builder().idInfraccion(idInfraccion).build();
		return super.existe(infraccion);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void registrarInfraccion(Infraccion infraccion) {
		super.registrar(infraccion);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void actualizarInfraccion(Infraccion infraccion) {
		super.actualizar(infraccion);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void eliminarInfraccion(Infraccion infraccion) {
		super.eliminar(infraccion);
	}

}
