package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.seguridad.SecUsuario;

public interface ISecUsuarioService extends IMantenibleService<SecUsuario>
{
    public List<SecUsuario> getLsUsuario();

    public void registrarUsuario(SecUsuario usuario);

    public List<SecUsuario> buscarPorCodigoUsuario(String idUsuario);

    public void actualizarUsuario(SecUsuario usuario);

    public void deleteUsuario(SecUsuario usuario);

    public Integer numCaducidadContrasenia(String usuario);

    public List<SecUsuario> obtenerPasswordPorCodigoUsuario(String idUsuario);
}