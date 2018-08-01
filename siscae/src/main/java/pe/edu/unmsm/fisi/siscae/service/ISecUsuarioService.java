package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Usuario;
import pe.edu.unmsm.fisi.siscae.model.seguridad.SecUsuario;

public interface ISecUsuarioService extends IMantenibleService<Usuario>
{
    public List<Usuario> getLsUsuario();

    public void registrarUsuario(Usuario usuario);

    public List<Usuario> buscarPorCodigoUsuario(String idUsuario);

    public void actualizarUsuario(Usuario usuario);

    public void deleteUsuario(Usuario usuario);

    public Integer numCaducidadContrasenia(String usuario);

    public List<Usuario> obtenerPasswordPorCodigoUsuario(String idUsuario);
}