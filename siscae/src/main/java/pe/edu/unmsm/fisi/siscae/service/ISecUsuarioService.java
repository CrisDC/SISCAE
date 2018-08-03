package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Usuario;

public interface ISecUsuarioService extends IMantenibleService<Usuario>
{
    public List<Usuario> getLsUsuario();

    public void registrarUsuario(Usuario usuario);

    public List<Usuario> buscarPorCodigoUsuario(String idUsuario);

    public void actualizarUsuario(Usuario Usuario);

    public void deleteUsuario(Usuario Usuario);

    public Integer numCaducidadContrasenia(String usuario);

    public List<Usuario> obtenerPasswordPorCodigoUsuario(String idUsuario);
}