package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.AreaAdministrativo;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface IAreaAdministrativoMapper  extends IMantenibleMapper<AreaAdministrativo>{
	@Select(value = { "{call SP_MANT_AREA_ADMINISTRATIVO ( "
            + "#{operacion, jdbcType = VARCHAR, mode = IN},"
            + "#{operacionParam, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.idAreaAdministrativo, jdbcType = INTEGER, mode = IN},"
            + "#{objeto.idAreaEstudio, jdbcType = INTEGER, mode = IN},"
            + "#{objeto.idAdministrativo, jdbcType = INTEGER, mode = IN},"
            + "#{objeto.fechaInicio, jdbcType = DATE, mode = IN},"
            + "#{objeto.cargo, jdbcType = VARCHAR, mode = IN},"
			+ "#{userAudit, jdbcType = VARCHAR, mode = IN})}" })
    @Options(statementType = StatementType.CALLABLE)
    public List<AreaAdministrativo> mantener(Parametro parametro);
}
