package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IUsuarioMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Persona;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Usuario;
import pe.edu.unmsm.fisi.siscae.service.IUsuarioService;
import pe.edu.unmsm.fisi.siscae.service.excepcion.ValorNoEncontradoException;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;

@Service
public class UsuarioService extends MantenibleService<Usuario> implements IUsuarioService {

	private IUsuarioMapper usuarioMapper;

	public UsuarioService(@Qualifier("IUsuarioMapper") IMantenibleMapper<Usuario> mapper) {
		super(mapper);
		this.usuarioMapper = (IUsuarioMapper) mapper;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<Usuario> buscarTodos() {
		return super.buscar(new Usuario(), Operacion.SELECT);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public Usuario buscarPorId(String nombre) {
		Usuario usuario = Usuario.builder().nombre(nombre).build();
		return super.buscarPorId(usuario);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public boolean existe(Integer idUsuario) {
		Usuario usuario = Usuario.builder().idUsuario(idUsuario).build();
		return super.existe(usuario);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void registrarUsuario(Usuario usuario) {
		super.registrar(usuario);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void actualizarUsuario(Usuario usuario) {
		super.actualizar(usuario);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void eliminarUsuario(Usuario usuario) {
		super.eliminar(usuario);
	}
	
	 public String currentUserName(Principal principal) {
	        return principal.getName();
	    }
	
	public boolean verificarPassword(String rawPassword) {
		BCryptPasswordEncoder encriptador = new BCryptPasswordEncoder();
		String passwordEncriptada="";
		String currentUserName="";
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (!(authentication instanceof AnonymousAuthenticationToken)) {
		    currentUserName = authentication.getName();
		}
		
		Usuario usuario =  Usuario.builder().nombre(currentUserName).build();
	
		List<Usuario> listaRetornada = super.buscar(usuario,OperacionParam.PASSWORD);

		if (!listaRetornada.isEmpty()){
			passwordEncriptada =listaRetornada.get(0).getPass();
		}else{
			throw new ValorNoEncontradoException("No se encontró la contraseña del usuario");
		}
		
    	
    	if(encriptador.matches(rawPassword,passwordEncriptada )) {
    		
    		return true;
    	}else {
    		
    		return false;
    	}
		
	}
	
	public void cambiarPassword(String rawPassword) {
		BCryptPasswordEncoder encriptador = new BCryptPasswordEncoder();
		String passwordEncriptada="";
		String currentUserName="";
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (!(authentication instanceof AnonymousAuthenticationToken)) {
		    currentUserName = authentication.getName();
		}
		
		Usuario usuario =  Usuario.builder().nombre(currentUserName).build();
	
		List<Usuario> listaRetornada = super.buscar(usuario,OperacionParam.PASSWORD);

		if (!listaRetornada.isEmpty()){
			passwordEncriptada =listaRetornada.get(0).getPass();
		}else{
			throw new ValorNoEncontradoException("No se encontró la contraseña del usuario");
		}
	}
	
	
}
