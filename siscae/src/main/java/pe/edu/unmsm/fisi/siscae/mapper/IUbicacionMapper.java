package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Ubicacion;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface IUbicacionMapper extends IMantenibleMapper<Ubicacion> {

	@Override
	@Select(value = { "{call SP_MANT_UBICACION(" 
			+ "#{operacion,				jdbcType = VARCHAR,	mode = IN},"
			+ "#{operacionParam,		jdbcType = VARCHAR,	mode = IN},"
			+ "#{objeto.idUbicacion,	jdbcType = INTEGER,	mode = IN},"
			+ "#{objeto.coordenadaX,	jdbcType = DECIMAL, mode = IN},"
			+ "#{objeto.coordenadaY,	jdbcType = DECIMAL, mode = IN},"
			+ "#{userAudit,				jdbcType = VARCHAR, mode = IN})}" })
	@Options(statementType = StatementType.CALLABLE)
	public List<Ubicacion> mantener(Parametro<Ubicacion> parametro);

}
