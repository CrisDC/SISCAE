package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.Moneda;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface IMonedaMapper extends IMantenibleMapper<Moneda>
{
    @Select(value = { "{call MANT_MONEDA ( "
            + "#{operacion, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.codigoMoneda, jdbcType = INTEGER, mode = IN},"
            + "#{objeto.descripcion, jdbcType = VARCHAR, mode = IN},"
            + "#{userAudit, jdbcType = VARCHAR, mode = IN})}" })
    @Options(statementType = StatementType.CALLABLE)
    public List<Moneda> mantener(Parametro parametro);
}