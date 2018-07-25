package pe.edu.unmsm.fisi.siscae.service.impl.seguridad;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IAccionMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.seguridad.SecAccion;
import pe.edu.unmsm.fisi.siscae.service.IAccionService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.VerboConstantes;

@Service
public class AccionService extends MantenibleService<SecAccion> implements IAccionService {

	private IAccionMapper accionMapper;

	public AccionService(@Qualifier("IAccionMapper") IMantenibleMapper<SecAccion> mapper) {
		super(mapper);
		this.accionMapper = (IAccionMapper) mapper;
	}

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<SecAccion> getLsAcciones() {
		return this.buscar(new SecAccion(), Operacion.SELECT);
	}

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void registrarAccion(SecAccion accion) {
		this.registrar(accion);
	}

	@Transactional(propagation = Propagation.REQUIRED)
	public List<SecAccion> buscarPorCodigoAccion(String idAccion) {
		SecAccion accion = SecAccion.builder().idAccion(idAccion).build();
		return this.buscar(accion, Operacion.SELECT);
	}

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void actualizarAccion(SecAccion accion) {
		this.actualizar(accion);
	}

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void eliminarAccion(SecAccion accion) {
		this.eliminar(accion);
	}
}
