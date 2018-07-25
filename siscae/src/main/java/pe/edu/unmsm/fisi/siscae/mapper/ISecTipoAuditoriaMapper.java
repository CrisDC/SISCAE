package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.model.seguridad.SecTipoAuditoria;

public interface ISecTipoAuditoriaMapper extends IMantenibleMapper<SecTipoAuditoria>
{
    @Select(value = { "{call MANT_TIPO_AUDITORIA ( "
            + "#{operacion, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.idTipoAuditoria, jdbcType = INTEGER, mode = IN},"
            + "#{objeto.descripcion, jdbcType = VARCHAR, mode = IN})}" })
    @Options(statementType = StatementType.CALLABLE)
    public List<SecTipoAuditoria> mantener(Parametro parametro);
}