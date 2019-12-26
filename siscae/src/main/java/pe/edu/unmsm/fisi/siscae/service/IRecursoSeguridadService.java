package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;


import pe.edu.unmsm.fisi.siscae.model.seguridad.RecursoSeguridad;

public interface IRecursoSeguridadService extends IMantenibleService<RecursoSeguridad>{
	
	public List<RecursoSeguridad> buscarTodos();

    public RecursoSeguridad buscarPorId(Integer idPerfil);

    public boolean existe(Integer idPerfil);

    public void registrarRecursoSeguridad(RecursoSeguridad recursoSeguridad);

    public void actualizarRecursoSeguridad(RecursoSeguridad recursoSeguridad);

    public void eliminarRecursoSeguridad(RecursoSeguridad recursoSeguridad);

}
