package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.seguridad.SecAccion;

public interface IAccionService extends IMantenibleService<SecAccion> {

	public List<SecAccion> getLsAcciones();

	public void registrarAccion(SecAccion accion);

	public List<SecAccion> buscarPorCodigoAccion(String idAccion);

	public void actualizarAccion(SecAccion accion);

	public void eliminarAccion(SecAccion accion);

}
