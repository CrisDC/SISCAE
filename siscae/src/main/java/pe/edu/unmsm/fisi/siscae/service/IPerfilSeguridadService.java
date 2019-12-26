package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Facultad;
import pe.edu.unmsm.fisi.siscae.model.seguridad.PerfilSeguridad;

public interface IPerfilSeguridadService extends IMantenibleService<PerfilSeguridad> {

	public List<PerfilSeguridad> buscarTodos();

    public PerfilSeguridad buscarPorId(Integer idPerfil);

    public boolean existe(Integer idPerfil);

    public void registrarPerfilSeguridad(PerfilSeguridad perfilSeguridad);

    public void actualizarPerfilSeguridad(PerfilSeguridad perfilSeguridad);

    public void eliminarPerfilSeguridad(PerfilSeguridad perfilSeguridad);
}

