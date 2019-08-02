package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Usuario;

public interface IUsuarioService extends IMantenibleService<Usuario> {
	public List<Usuario> buscarTodos();

	public Usuario buscarPorId(String idUsuario);

	public boolean existe(Integer idUsuario);

	public void registrarUsuario(Usuario usuario);

	public void actualizarUsuario(Usuario usuario);

	public void eliminarUsuario(Usuario usuario);

	/*Funciones agregadas para validar contraseña y hacer los cambios*/
	
	public boolean verificarPassword(String rawPassword);
	
	public void cambiarPassword(String rawPassword);

}