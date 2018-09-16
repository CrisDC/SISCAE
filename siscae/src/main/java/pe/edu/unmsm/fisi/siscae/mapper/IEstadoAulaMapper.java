package pe.edu.unmsm.fisi.siscae.mapper;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.EstadoAula;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface IEstadoAulaMapper extends IMantenibleMapper<EstadoAula> {
	@Select(value = { "{call SP_MANT_EXTERNO ( "
            + "#{operacion, jdbcType = VARCHAR, mode = IN},"
            + "#{operacionParam, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.persona.idPersona, jdbcType = INTEGER, mode = IN},"
            + "#{objeto.idEstadoTabla, jdbcType = INTEGER, mode = IN},"
            + "#{userAudit, jdbcType = VARCHAR, mode = IN})}" })
	@Options (statementType = StatementType.CALLABLE)
	public List<EstadoAula> mantener (Parametro parametro);
}
