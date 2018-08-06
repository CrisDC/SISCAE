package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.unmsm.fisi.siscae.mapper.IEscuelaMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Escuela;
import pe.edu.unmsm.fisi.siscae.service.IEscuelaService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;

@Service
public class EscuelaService extends MantenibleService<Escuela> implements IEscuelaService {

	private IEscuelaMapper escuelaMapper;

	public EscuelaService(@Qualifier("IEscuelaMapper") IMantenibleMapper<Escuela> mapper) {
		super(mapper);
		this.escuelaMapper = (IEscuelaMapper) mapper;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<Escuela> buscarTodos() {
		return super.buscar(new Escuela(), Operacion.SELECT);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public Escuela buscarPorId(Integer idEscuela) {
		Escuela escuela = Escuela.builder().idEscuela(idEscuela).build();
		return super.buscarPorId(escuela);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public boolean existe(Integer idEscuela) {
		Escuela escuela = Escuela.builder().idEscuela(idEscuela).build();
		return super.existe(escuela);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void registrarEscuela(Escuela escuela) {
		this.registrar(escuela);

	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void actualizarEscuela(Escuela escuela) {
		this.actualizar(escuela);

	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void eliminarEscuela(Escuela escuela) {
		this.eliminar(escuela);
	}

}
