package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.unmsm.fisi.siscae.mapper.IAlumnoMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Alumno;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Persona;
import pe.edu.unmsm.fisi.siscae.service.IAlumnoService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;

@Service
public class AlumnoService extends MantenibleService<Alumno> implements IAlumnoService {
	private IAlumnoMapper alumnoMapper;

	public AlumnoService(@Qualifier("IAlumnoMapper") IMantenibleMapper<Alumno> mapper) {
		super(mapper);
		this.alumnoMapper = (IAlumnoMapper) mapper;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<Alumno> buscarTodos() {
		return super.buscar(new Alumno(), Operacion.SELECT);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public List<Alumno> buscarPorIdAlumno(Integer idAlumno) {
		Alumno alumno = Alumno.builder().persona(Persona.builder().idPersona(idAlumno).build()).build();
		return super.buscar(alumno, Operacion.SELECT, Operacion.OperacionParam.PRIMARY_KEY);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public boolean existeAlumno(Integer idAlumno) {
		return !this.buscarPorIdAlumno(idAlumno).isEmpty();
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void registrarAlumno(Alumno alumno) {
		this.registrar(alumno);

	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void actualizarAlumno(Alumno alumno) {
		this.actualizar(alumno);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void eliminarAlumno(Alumno alumno) {
		this.eliminar(alumno);

	}

}
