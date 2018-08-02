package pe.edu.unmsm.fisi.siscae.service.impl.seguridad;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.ISecUsuarioMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Usuario;
import pe.edu.unmsm.fisi.siscae.model.seguridad.SecUsuario;
import pe.edu.unmsm.fisi.siscae.service.ISecUsuarioService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.VerboConstantes;

@Service
public class SecUsuarioService extends MantenibleService<SecUsuario> implements ISecUsuarioService
{
    private ISecUsuarioMapper usuarioMapper;

    public SecUsuarioService(@Qualifier("IUsuarioMapper") IMantenibleMapper<SecUsuario> mapper)
    {
        super(mapper);
        this.usuarioMapper = (ISecUsuarioMapper) mapper;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<SecUsuario> getLsUsuario()
    {
        //return this.buscar(new SecUsuario(), Operacion.SELECT);
    	return null;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void registrarUsuario(SecUsuario usuario)
    {
        BCryptPasswordEncoder passwordEnconder = new BCryptPasswordEncoder();
        //String hashedPassword = passwordEnconder.encode(usuario.getPassword());
        //usuario.setPasswordEncriptado(hashedPassword);
        // secUsuarioMapper.registrarUsuario(usuario);
        //this.registrar(usuario);
        
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public List<SecUsuario> buscarPorCodigoUsuario(String idUsuario)
    {
        // return secUsuarioMapper.buscarPorCodigoUsuario(idUsuario);
    	//SecUsuario secUsuario = SecUsuario.builder().idUsuario(Integer.parseInt(idUsuario)).build();
        //return this.buscar(secUsuario, Operacion.SELECT);
    	return null;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void actualizarUsuario(SecUsuario usuario)
    {
        /*if (usuario.getPassword().length() == 8)
        {
            BCryptPasswordEncoder passwordEnconder = new BCryptPasswordEncoder();
            String hashedPassword = passwordEnconder.encode(usuario.getPassword());
            usuario.setPasswordEncriptado(hashedPassword);
            // secUsuarioMapper.actualizarUsuario(usuario);
            this.actualizar(usuario);
        } else
        {
            // secUsuarioMapper.actualizarUsuario(usuario);
            this.actualizar(usuario);
        }*/
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void deleteUsuario(SecUsuario usuario)
    {
        // secUsuarioMapper.deleteUsuario(usuario);
        //this.eliminar(usuario);
    
    }

    @Override
    public Integer numCaducidadContrasenia(String usuario)
    {
        return 0;
    }

    @Override
    public List<SecUsuario> obtenerPasswordPorCodigoUsuario(String idUsuario)
    {
        return null;
    }
}