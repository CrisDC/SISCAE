package pe.edu.unmsm.fisi.siscae.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IUsuarioMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.Usuario;
import pe.edu.unmsm.fisi.siscae.model.seguridad.SecUsuario;
import pe.edu.unmsm.fisi.siscae.service.IUsuarioService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;

@Service
public class UsuarioService extends MantenibleService<SecUsuario> implements IUsuarioService
{
    private  IUsuarioMapper usuarioMapper;
    private static final String LOGIN = "LOGIN";

    public UsuarioService(@Qualifier("IUsuarioMapper") IMantenibleMapper<SecUsuario> mapper)
    {
        super(mapper);
        this.usuarioMapper = (IUsuarioMapper) mapper;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public SecUsuario buscarPorIdUsuarioParaInicioSesion(String idUsuario)
    {
        SecUsuario usuario = SecUsuario.builder().nombre(idUsuario).build();
        this.buscar(usuario, Operacion.SELECT, OperacionParam.LOGIN);
        return usuario.getUsuarios().stream().findFirst().orElse(null);
    }

	@Override
	public Usuario buscarUsuarioPorId(String idUsuario) {
		return usuarioMapper.buscarUsuarioPorId(idUsuario);
	}
}