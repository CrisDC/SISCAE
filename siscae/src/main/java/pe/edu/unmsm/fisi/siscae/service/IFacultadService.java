package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Facultad;

public interface IFacultadService extends IMantenibleService<Facultad>{
	
		public List<Facultad> buscarTodos();

	    public Facultad buscarPorId(Integer idFacultad);

	    public boolean existe(Integer idFacultad);

	    public void registrarFacultad(Facultad facultad);

	    public void actualizarFacultad(Facultad facultad);

	    public void eliminarFacultad(Facultad facultad);

}
