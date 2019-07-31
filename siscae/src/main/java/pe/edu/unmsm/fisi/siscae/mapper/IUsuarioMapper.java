package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Usuario;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface IUsuarioMapper extends IMantenibleMapper<Usuario>
{   
   	@Select( value = {"{call SP_MANT_USUARIO("
			+ "#{operacion, jdbcType = VARCHAR, mode = IN},"
			+ "#{operacionParam, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.idUsuario, jdbcType = INTEGER, mode = IN},"
			+ "#{objeto.nombre, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.pass, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.idEstadoTabla, jdbcType = INTEGER, mode = IN},"
			+ "#{objeto.idRol, jdbcType = INTEGER, mode = IN},"
			+ "#{objeto.idPersona, jdbcType = INTEGER, mode = IN})}"} )
   	
   	/*IN iv_operacion			VARCHAR(20),
	IN iv_operacion_param	VARCHAR(20),
    IN in_id_usuario		INT,
    IN iv_nombre			VARCHAR(45),
    IN iv_pass				VARCHAR(200),
    IN in_id_estado_tabla	INT,
    IN in_id_rol			INT,
    IN in_id_persona		INT*/
	@Options(statementType = StatementType.CALLABLE)
    public List<Usuario> mantener(Parametro parametro);
 
}