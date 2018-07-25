package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.model.seguridad.SecPerfil;

public interface ISecPerfilMapper extends IMantenibleMapper<SecPerfil>
{
    @Select(value = { "{call MANT_PERFIL ( #{operacion, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.idPerfil, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.descripcion, jdbcType = VARCHAR, mode = IN},"
            + "#{userAudit, jdbcType = VARCHAR, mode = IN})}" })
    @Options(statementType = StatementType.CALLABLE)
    public List<SecPerfil> mantener(Parametro parametro);

    public List<SecPerfil> buscarRecursosPorIdPerfil(String idPerfil);
}