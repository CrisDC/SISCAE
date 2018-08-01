package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IDocenteMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Docente;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Persona;
import pe.edu.unmsm.fisi.siscae.service.IDocenteService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;

@Service
public class DocenteService extends MantenibleService<Docente> implements IDocenteService {

	private IDocenteMapper docenteMapper;

	public DocenteService(@Qualifier("IDocenteMapper") IMantenibleMapper<Docente> mapper) {
		super(mapper);
		this.docenteMapper = (IDocenteMapper) mapper;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<Docente> buscarTodos() {
		return super.buscar(new Docente(), Operacion.SELECT);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public List<Docente> buscarPorIdDocente(Integer idDocente) {
		Docente docente = Docente.builder().persona(Persona.builder().idPersona(idDocente).build()).build();
		return super.buscar(docente, Operacion.SELECT, OperacionParam.PRIMARY_KEY);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public boolean existeDocente(Integer idDocente) {
		return !this.buscarPorIdDocente(idDocente).isEmpty();
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void registrarDocente(Docente docente) {
		super.registrar(docente);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void actualizarDocente(Docente docente) {
		super.actualizar(docente);

	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void eliminarDocente(Docente docente) {
		super.eliminar(docente);
	}

}
