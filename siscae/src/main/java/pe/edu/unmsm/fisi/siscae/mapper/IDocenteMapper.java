package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Docente;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface IDocenteMapper extends IMantenibleMapper<Docente> {
	
	@Select(value = {"{call SP_MANT_DOCENTE ("
			+ "#{operacion, jdbcType = VARCHAR, mode = IN},"
			+ "#{operacionParam, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.idDocente, jdbcType = INTEGER, mode = IN},"
			+ "#{objeto.estadoDocente, jdbcType = VARCHAR, mode = IN},"
			+ "#{userAudit, jdbcType = VARCHAR, mode = IN})}"})
	@Options(statementType = StatementType.CALLABLE)
	public List<Docente> mantener(Parametro parametro);
	
}
