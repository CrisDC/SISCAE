package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IUsuarioMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Usuario;
import pe.edu.unmsm.fisi.siscae.service.IUsuarioService;
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
		return this.buscar(new Usuario(), Operacion.SELECT);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public List<Usuario> buscarPorIdUsuario(Integer idUsuario) {
		Usuario usuario = Usuario.builder().idUsuario(idUsuario).build();
		return this.buscar(usuario, Operacion.SELECT, OperacionParam.PRIMARY_KEY);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public boolean existeUsuario(Integer idUsuario) {
		return !this.buscarPorIdUsuario(idUsuario).isEmpty();
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void registrarUsuario(Usuario usuario) {
		this.registrarUsuario(usuario);

	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void actualizarUsuario(Usuario usuario) {
		this.actualizarUsuario(usuario);

	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void eliminarUsuario(Usuario usuario) {
		this.eliminarUsuario(usuario);

	}

}
