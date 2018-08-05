package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.AreaAdministrativo;


public interface IAreaAdministrativoService extends IMantenibleService<AreaAdministrativo>{
	public List<AreaAdministrativo> buscarTodos();

    public List<AreaAdministrativo> buscarPorIdAreaAdministrativo(Integer idAreaAdministrativo);

    public boolean existeAreaAdministrativo(Integer  idAreaAdministrativo);

    public void registrarAreaAdministrativo(AreaAdministrativo areaAdministrativo);

    public void actualizarAreaAdministrativo(AreaAdministrativo areaAdministrativo);

    public void eliminarAreaAdministrativo(AreaAdministrativo areaAdministrativo);
}
