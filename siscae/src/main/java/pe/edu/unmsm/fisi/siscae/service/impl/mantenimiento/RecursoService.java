package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IRecursoMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Recurso;
import pe.edu.unmsm.fisi.siscae.service.IRecursoService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;

@Service
public class RecursoService extends MantenibleService<Recurso> implements IRecursoService {

	private IRecursoMapper recursoMapper;

	public RecursoService(@Qualifier("IRecursoMapper") IMantenibleMapper<Recurso> mapper) {
		super(mapper);
		this.recursoMapper = (IRecursoMapper) mapper;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<Recurso> buscarTodos() {
		return super.buscar(new Recurso(), Operacion.SELECT);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public List<Recurso> buscarPorIdRecurso(Integer idRecurso) {
		Recurso recurso = Recurso.builder().idRecurso(idRecurso).build();
		return super.buscar(recurso, Operacion.SELECT, OperacionParam.PRIMARY_KEY);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public boolean existeRecurso(Integer idRecurso) {
		return !this.buscarPorIdRecurso(idRecurso).isEmpty();
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void registrarRecurso(Recurso recurso) {
		super.registrar(recurso);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void actualizarRecurso(Recurso recurso) {
		super.actualizar(recurso);
	}

	@Override
	public void eliminarRecurso(Recurso recurso) {
		super.eliminar(recurso);
	}

}
