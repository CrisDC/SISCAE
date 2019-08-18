package pe.edu.unmsm.fisi.siscae.service;
import java.util.List;


import pe.edu.unmsm.fisi.siscae.model.mantenimiento.TipoRecurso;

public interface ITipoRecursoService extends IMantenibleService<TipoRecurso> {
	  public List<TipoRecurso> buscarTodos();

	    public List<TipoRecurso> buscarPorIdTipoRecurso(Integer idTipoRecurso);
	    
	    public List<TipoRecurso> buscarUsables();

	    public boolean existeTipoRecurso(Integer idTipoRecurso);

	    public void registrarTipoRecurso(TipoRecurso tiporecurso);

	    public void actualizarTipoRecurso(TipoRecurso tiporecurso);

	    public void eliminarTipoRecurso(TipoRecurso tiporecurso);
	

}