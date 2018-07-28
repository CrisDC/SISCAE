package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Empresa;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Facultad;

public interface IFacultadService extends IMantenibleService<Facultad>{
	
		public List<Facultad> buscarTodos();

	    public List<Facultad> buscarPorIdFacultad(Integer idFacultad);

	    public boolean existeFacultad(Integer idFacultad);

	    public void registrarFacultad(Facultad facultad);

	    public void actualizarFacultad(Facultad facultad);

	    public void eliminarFacultad(Facultad facultad);

}
