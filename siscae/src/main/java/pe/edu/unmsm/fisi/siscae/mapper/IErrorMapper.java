package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Error;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface IErrorMapper extends IMantenibleMapper<Error>
{
    @Select(value = {
            "{call MANT_ERRORES ( #{operacion, jdbcType = VARCHAR, mode = IN},"
                    + "#{objeto.idError, jdbcType = INTEGER, mode = IN},"
                    + "#{objeto.descripcion, jdbcType = VARCHAR, mode = IN},"
                    + "#{userAudit, jdbcType = VARCHAR, mode = IN})}" })
    @Options(statementType = StatementType.CALLABLE)
    public List<Error> mantener(Parametro parametro);
}
