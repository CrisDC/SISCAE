package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.seguridad.Password;

public interface IContraseniaService
{
    public List<Password> buscarPorCodigoContrasenia(String idUsuario);

    public void actualizarContrasenia(Password contrasenia, String nombreUsuario);

    public List<Password> buscarPorCodigoPassword(String idUsuario);

    public void actualizarContrasenia(Password contrasenia);
}