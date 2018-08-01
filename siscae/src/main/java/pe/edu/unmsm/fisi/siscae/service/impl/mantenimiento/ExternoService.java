package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IExternoMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Externo;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Persona;
import pe.edu.unmsm.fisi.siscae.service.IExternoService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;

@Service
public class ExternoService extends MantenibleService<Externo> implements IExternoService {

	private IExternoMapper externoMapper;

	public ExternoService(@Qualifier("IExternoMapper") IMantenibleMapper<Externo> mapper) {
		super(mapper);
		this.externoMapper = (IExternoMapper) mapper;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<Externo> buscarTodos() {
		return this.buscar(new Externo(), Operacion.SELECT);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public List<Externo> buscarPorIdExterno(Integer idExterno) {
		Externo externo = Externo.builder().persona(Persona.builder().idPersona(idExterno).build()).build();
		return super.buscar(externo, Operacion.SELECT, OperacionParam.PRIMARY_KEY);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public boolean existeExterno(Integer idExterno) {

		return !this.buscarPorIdExterno(idExterno).isEmpty();
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void registrarExterno(Externo externo) {
		this.registrar(externo);

	}

	@Override
	public void actualizarExterno(Externo externo) {

		this.actualizar(externo);
	}

	@Override
	public void eliminarExterno(Externo externo) {

		this.eliminar(externo);
	}

}
