package pe.edu.unmsm.fisi.siscae.service.impl.seguridad;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.ISecUsuarioMapper;
import pe.edu.unmsm.fisi.siscae.mapper.IUsuarioMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Usuario;
import pe.edu.unmsm.fisi.siscae.service.ISecUsuarioService;
import pe.edu.unmsm.fisi.siscae.service.IUsuarioService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.VerboConstantes;

@Service
public class SecUsuarioService extends MantenibleService<Usuario> implements ISecUsuarioService
{
    private IUsuarioMapper usuarioMapper;

    public SecUsuarioService(@Qualifier("IUsuarioMapper") IMantenibleMapper<Usuario> mapper)
    {
        super(mapper);
        this.usuarioMapper = (IUsuarioMapper) mapper;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<Usuario> getLsUsuario()
    {
        //return this.buscar(new SecUsuario(), Operacion.SELECT);
    	return null;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void registrarUsuario(Usuario usuario)
    {
        BCryptPasswordEncoder passwordEnconder = new BCryptPasswordEncoder();
        //String hashedPassword = passwordEnconder.encode(usuario.getPassword());
        //usuario.setPasswordEncriptado(hashedPassword);
        // secUsuarioMapper.registrarUsuario(usuario);
        //this.registrar(usuario);
        
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public List<Usuario> buscarPorCodigoUsuario(String idUsuario)
    {
        // return secUsuarioMapper.buscarPorCodigoUsuario(idUsuario);
    	//SecUsuario secUsuario = SecUsuario.builder().idUsuario(Integer.parseInt(idUsuario)).build();
        //return this.buscar(secUsuario, Operacion.SELECT);
    	return null;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void actualizarUsuario(Usuario usuario)
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
    public void deleteUsuario(Usuario usuario)
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
    public List<Usuario> obtenerPasswordPorCodigoUsuario(String idUsuario)
    {
        return null;
    }
}