package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;


import pe.edu.unmsm.fisi.siscae.model.mantenimiento.AreaEstudio;

public interface IAreaEstudioService extends IMantenibleService<AreaEstudio> {
	public List<AreaEstudio> buscarTodos();

    public AreaEstudio buscarPorId(Integer idAreaEstudio);

    public boolean existe(Integer idAreaEstudio);

    public void registrarAreaEstudio(AreaEstudio areaEstudio);

    public void actualizarAreaEstudio(AreaEstudio areaEstudio);

    public void eliminarAreaEstudio(AreaEstudio areaEstudio);

}
