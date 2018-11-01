package pe.edu.unmsm.fisi.siscae.service;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Solicitante;

public interface ISolicitanteService extends IMantenibleService<Solicitante>{
	
	public void registrarSolicitante(Solicitante Solicitante);
	public void actualizarSolicitante(Solicitante Solicitante);
	public void eliminarSolicitante(Solicitante Solicitante);
}

