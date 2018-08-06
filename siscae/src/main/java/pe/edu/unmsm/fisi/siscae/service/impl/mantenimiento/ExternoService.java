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
		return super.buscar(new Externo(), Operacion.SELECT);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public Externo buscarPorId(Integer idExterno) {
		Externo externo = Externo.builder().persona(Persona.builder().idPersona(idExterno).build()).build();
		return super.buscarPorId(externo);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public boolean existe(Integer idExterno) {
		Externo externo = Externo.builder().persona(Persona.builder().idPersona(idExterno).build()).build();
		return super.existe(externo);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void registrarExterno(Externo externo) {
		super.registrar(externo);
	}

	@Override
	public void actualizarExterno(Externo externo) {
		super.actualizar(externo);
	}

	@Override
	public void eliminarExterno(Externo externo) {

		this.eliminar(externo);
	}

}
