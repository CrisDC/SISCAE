package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.ResultType;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.model.seguridad.Password;

public interface IContraseniaMapper
{
    @Update("{call SEC_ACTUALIZAR_CONTRASENIA ( #{idUsuario, jdbcType = VARCHAR, mode = IN},"
            + "#{passwordEncriptado, jdbcType = VARCHAR, mode = IN},"
            + "#{passwordEncriptadoNuevo, jdbcType = VARCHAR, mode = IN},"
            + "#{passwordEncriptadoNuevo2, jdbcType = VARCHAR, mode = IN})}")
    @Options(statementType = StatementType.CALLABLE)
    public void actualizarContrasenia(Password contrasenia);

    @Select("SELECT vIdPerfil FROM secUsuarios where vIdUsuario = #{id_usuario}")
    @Results({ @Result(property = "id_perfil", column = "vIdPerfil") })
    @ResultType(Password.class)
    public List<Password> buscarPorCodigoContrasenia(String idUsuario);

    @Select("SELECT vIdPerfil FROM secUsuarios where vIdUsuario = #{id_usuario}")
    @Results({ @Result(property = "id_perfil", column = "vIdPerfil") })
    @ResultType(Password.class)
    public List<Password> buscarPorCodigoPassword(String idUsuario);
}
