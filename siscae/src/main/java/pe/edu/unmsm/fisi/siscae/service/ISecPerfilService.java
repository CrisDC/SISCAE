package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.seguridad.SecPerfil;

public interface ISecPerfilService extends IMantenibleService<SecPerfil>
{
    public List<SecPerfil> getLsPerfil();
    
    public List<SecPerfil> buscarPorCodigoPerfil(String idPerfil);
    
    public List<SecPerfil> buscarRecursosPorIdPerfil(String idPerfil);

    public void registrarPerfil(SecPerfil perfil);

    public void actualizarPerfil(SecPerfil perfil);

    public void eliminarPerfil(SecPerfil perfil);
}