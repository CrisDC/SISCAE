package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.CodigoRespuestaVisa;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface ICodigoRptaVisaMapper extends IMantenibleMapper<CodigoRespuestaVisa>
{
    @Select(value = { "{call MANT_CODIGO_RPTA_VISA ( " 
            + "#{operacion, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.codigoRespuestaVisa, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.descripcion, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.atribuible, jdbcType = VARCHAR, mode = IN},"
            + "#{userAudit, jdbcType = VARCHAR, mode = IN})}" })
    @Options(statementType = StatementType.CALLABLE)
    public List<CodigoRespuestaVisa> mantener(Parametro parametro);
}