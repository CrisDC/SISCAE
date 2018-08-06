package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IHorarioMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Horario;
import pe.edu.unmsm.fisi.siscae.service.IHorarioService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;

@Service
public class HorarioService extends MantenibleService<Horario> implements IHorarioService {

	private IHorarioMapper horarioMapper;

	public HorarioService(@Qualifier("IHorarioMapper") IMantenibleMapper<Horario> mapper) {
		super(mapper);
		this.horarioMapper = (IHorarioMapper) mapper;
	}

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<Horario> buscarTodos() {

		return this.buscar(new Horario(), Operacion.SELECT);
	}

	@Transactional(propagation = Propagation.REQUIRED)
	public Horario buscarPorId(Integer idHorario) {
		Horario horario = Horario.builder().idHorario(idHorario).build();
		return super.buscarPorId(horario);
	}

	@Transactional(propagation = Propagation.REQUIRED)
	public boolean existe(Integer idHorario) {
		Horario horario = Horario.builder().idHorario(idHorario).build();
		return super.existe(horario);
	}

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void registrarHorario(Horario horario) {
		this.registrar(horario);

	}

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void actualizarHorario(Horario horario) {
		this.actualizar(horario);

	}

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void eliminarHorario(Horario horario) {
		this.eliminar(horario);
	}

}
