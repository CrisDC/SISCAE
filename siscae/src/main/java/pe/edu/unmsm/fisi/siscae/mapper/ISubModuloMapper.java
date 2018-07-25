package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.SubModulo;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface ISubModuloMapper extends IMantenibleMapper<SubModulo>
{
    @Select("{call MANT_SUB_MODULOS ( #{operacion, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.codigoSubModulo, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.descripcion, jdbcType = VARCHAR, mode = IN},"
            + "#{userAudit, jdbcType = VARCHAR, mode = IN})}")
    @Options(statementType = StatementType.CALLABLE)
    public List<SubModulo> mantener(Parametro parametro);
}