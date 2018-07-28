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
public class InfraccionService extends MantenibleService <Infraccion> implements IInfraccionService {
	
	private IInfraccionMapper infraccionMapper;

    public InfraccionService(@Qualifier("IInfraccionMapper") IMantenibleMapper<Infraccion> mapper)
    {
        super(mapper);
        this.infraccionMapper = (IInfraccionMapper) mapper;
    }

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<Infraccion> buscarTodos() {
		
	return this.buscar(new Infraccion(), Operacion.SELECT);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public List<Infraccion> buscarPorIdInfraccion(Integer idInfraccion)
	{Infraccion infraccion =Infraccion.builder().idInfraccion(idInfraccion).build();
	return super.buscar(infraccion, Operacion.SELECT,OperacionParam.PRIMARY_KEY);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public boolean existeInfraccion(Integer idInfraccion) {
		
		return !this.buscarPorIdInfraccion(idInfraccion).isEmpty();
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void registrarInfraccion(Infraccion infraccion) {
		this.registrar(infraccion);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void actualizarInfraccion(Infraccion infraccion) {
		this.actualizar(infraccion);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void eliminarInfraccion(Infraccion infraccion) {
		this.eliminar(infraccion);
	}


	

}
