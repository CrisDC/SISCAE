package pe.edu.unmsm.fisi.siscae.service.impl.seguridad;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.ISecRecursoMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.seguridad.SecRecurso;
import pe.edu.unmsm.fisi.siscae.service.ISecRecursoService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.VerboConstantes;

@Service
public class SecRecursoService extends MantenibleService<SecRecurso> implements ISecRecursoService {
	private ISecRecursoMapper secRecursoMapper;

	public SecRecursoService(@Qualifier("ISecRecursoMapper") IMantenibleMapper<SecRecurso> mapper) {
		super(mapper);
		this.secRecursoMapper = (ISecRecursoMapper) mapper;
	}

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<SecRecurso> getLsRecurso() {
		return this.buscar(new SecRecurso(), Operacion.SELECT);
	}

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void registrarRecurso(SecRecurso recurso) {
		this.registrar(recurso);
	}

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void actualizarRecurso(SecRecurso recurso) {
		this.actualizar(recurso);
	}

	@Transactional(propagation = Propagation.REQUIRED)
	public List<SecRecurso> buscarPorCodigoRecurso(String idRecurso) {
		SecRecurso secRecurso = SecRecurso.builder().idRecurso(idRecurso).build();
		return this.buscar(secRecurso, Operacion.SELECT);
	}

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void eliminarRecurso(SecRecurso recurso) {
		this.eliminar(recurso);
	}
}
