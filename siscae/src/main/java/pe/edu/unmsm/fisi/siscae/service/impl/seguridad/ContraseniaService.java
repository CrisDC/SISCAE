package pe.edu.unmsm.fisi.siscae.service.impl.seguridad;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IContraseniaMapper;
import pe.edu.unmsm.fisi.siscae.model.seguridad.Password;
import pe.edu.unmsm.fisi.siscae.service.IContraseniaService;

@Service
public class ContraseniaService implements IContraseniaService
{
    private @Autowired IContraseniaMapper contraseniaMapper;

    @Override
    public void actualizarContrasenia(Password contrasenia, String nombreUsuario)
    {
        contrasenia.setIdUsuario(nombreUsuario);
        contraseniaMapper.actualizarContrasenia(contrasenia);
    }

    @Override
    public void actualizarContrasenia(Password contrasenia)
    {
        BCryptPasswordEncoder passwordEnconder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEnconder.encode(contrasenia.getPassword());
        String hashedPasswordNuevo = passwordEnconder.encode(contrasenia.getNuevoPassword());
        String hashedPasswordNuevo2 = passwordEnconder.encode(contrasenia.getNuevoPassword2());
        contrasenia.setPasswordEncriptado(hashedPassword);
        contrasenia.setPasswordEncriptadoNuevo(hashedPasswordNuevo);
        contrasenia.setPasswordEncriptadoNuevo2(hashedPasswordNuevo2);
        contraseniaMapper.actualizarContrasenia(contrasenia);
    }

    @Override
    public List<Password> buscarPorCodigoContrasenia(String idUsuario)
    {
        return contraseniaMapper.buscarPorCodigoContrasenia(idUsuario);
    }

    @Override
    public List<Password> buscarPorCodigoPassword(String idUsuario)
    {
        return contraseniaMapper.buscarPorCodigoPassword(idUsuario);
    }
}