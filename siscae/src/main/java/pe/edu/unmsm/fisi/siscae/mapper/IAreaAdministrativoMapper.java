package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.AreaAdministrativo;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface IAreaAdministrativoMapper  extends IMantenibleMapper<AreaAdministrativo>{
	@Select(value = { "{call MANT_AREA_ADMINISTRATIVO ( "
            + "#{operacion, jdbcType = VARCHAR, mode = IN},"
            + "#{operacionParam, jdbcType = VARCHAR, mode = IN},"	
            + "#{objeto.idAreaEstudio, jdbcType = INT, mode = IN},"
            + "#{objeto.idAdministrativo, jdbcType = TIME, mode = IN},"
            + "#{objeto.fechaInicio, jdbcType = TIME, mode = IN},"
            + "#{objeto.fechaFin,jdbcType = BOOLEAN, mode = IN},"
            + "#{objeto.cargo, jdbcType = DECIMAL, mode = IN}," 
			+ "#{objeto.fechaRegistro, jdbcType = INT, mode = IN},"
		    + "#{objeto.usuarioRegistro,jdbcType = INT, mode = IN},"
		    + "#{objeto.fechaModificacion,jdbcType = INT, mode = IN},"
            + "#{objeto.usuarioModificacion, jdbcType = INT, mode = IN}," 
			+ "#{userAudit, jdbcType = VARCHAR, mode = IN})}" })
    @Options(statementType = StatementType.CALLABLE)
    public List<AreaAdministrativo> mantener(Parametro parametro);
}
