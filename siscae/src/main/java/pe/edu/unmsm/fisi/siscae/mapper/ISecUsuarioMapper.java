package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.ResultType;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.model.seguridad.SecUsuario;

public interface ISecUsuarioMapper extends IMantenibleMapper<SecUsuario>
{
	@Select(value = { "{call MANT_USUARIOS ( #{operacion, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.idUsuario, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.nombre, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.idPerfil, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.activo, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.password, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.passwordEncriptado, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.requiereCambio, jdbcType = BOOLEAN, mode = IN},"
			+ "#{userAudit, jdbcType = VARCHAR, mode = IN})}" })
	@Options(statementType = StatementType.CALLABLE)
	public List<SecUsuario> mantener(Parametro parametro);
	
    @Select("{call SEC_NUMERO_MAX_DIAS ( #{usuario, jdbcType = VARCHAR, mode = IN})}")
    @Options(statementType = StatementType.CALLABLE)
    public Integer numCaducidadContrasenia(String usuario);

    @Select("SELECT vPassword FROM secUsuarios where vIdUsuario=#{idUsuario}")
    @Results({ @Result(property = "password", column = "vPassword"),
            @Result(property = "activo", column = "nActivo") })
    @ResultType(SecUsuario.class)
    public List<SecUsuario> obtenerPasswordPorCodigoUsuario(String idUsuario);
}