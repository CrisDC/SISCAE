package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Persona;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface IPersonaMapper extends IMantenibleMapper<Persona> {

	@Select(value = { "{call SP_MANT_PERSONA (" 
			+ "#{operacion, jdbcType = VARCHAR, mode = IN},"
			+ "#{operacionParam, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.idPersona, jdbcType = INTEGER, mode = IN},"
			+ "#{objeto.numDocumento, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.nombre, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.appPaterno, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.appMaterno, jdbcType = VARCHAR, mode = IN}," 
			+ "#{objeto.sexo, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.fechaNac, jdbcType = DATE, mode = IN}," 
			+ "#{objeto.numTelef, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.idTipoDocumento, jdbcType = INTEGER, mode = IN},"
			+ "#{userAudit, jdbcType = VARCHAR, mode = IN})}" })
	@Options(statementType = StatementType.CALLABLE)
	public List<Persona> mantener(Parametro parametro);

}
