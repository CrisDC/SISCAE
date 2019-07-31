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
	/*IN iv_operacion			VARCHAR(20),
	IN iv_operacion_param	VARCHAR(20),
    IN in_id_usuario		INT,
    IN iv_nombre			VARCHAR(45),
    IN iv_pass				VARCHAR(200),
    IN in_id_estado_tabla	INT,
    IN in_id_rol			INT,
    IN in_id_persona		INT*/

}