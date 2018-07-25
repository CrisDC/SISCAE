package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Institucion;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface IInstitucionMapper extends IMantenibleMapper<Institucion>
{
    @Select("{call MANT_INSTITUCIONES (#{operacion, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.codigoInstitucion, jdbcType = INTEGER, mode = IN},"
            + "#{objeto.descripcion, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.cuentaCompensacion, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.bancoAdministrador, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.operadorInstitucion, jdbcType = INTEGER, mode = IN},"
            + "#{objeto.descripcionCorta, jdbcType = VARCHAR, mode = IN},"
            + "#{userAudit, jdbcType = VARCHAR, mode = IN})}")
    @Options(statementType = StatementType.CALLABLE)
    public List<Institucion> mantener(Parametro parametro);
}