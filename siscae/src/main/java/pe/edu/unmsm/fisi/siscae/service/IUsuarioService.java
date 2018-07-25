package pe.edu.unmsm.fisi.siscae.service;

import pe.edu.unmsm.fisi.siscae.model.Usuario;
import pe.edu.unmsm.fisi.siscae.model.seguridad.SecUsuario;

public interface IUsuarioService extends IMantenibleService<SecUsuario>
{
    public SecUsuario buscarPorIdUsuarioParaInicioSesion(String idUsuario);
    public Usuario buscarUsuarioPorId(String idUsuario);
}