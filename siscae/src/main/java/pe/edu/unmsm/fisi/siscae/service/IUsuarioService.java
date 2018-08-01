package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Usuario;


public interface IUsuarioService extends IMantenibleService<Usuario>{
	public List<Usuario> buscarTodos();

    public List<Usuario> buscarPorIdUsuario(Integer idUsuario);

    public boolean existeUsuario(Integer idUsuario);

    public void registrarUsuario(Usuario usuario);

    public void actualizarUsuario(Usuario usuario);

    public void eliminarUsuario(Usuario usuario);
    
   
	
}