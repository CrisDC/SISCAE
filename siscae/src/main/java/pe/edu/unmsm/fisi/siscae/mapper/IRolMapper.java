package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;


import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Rol;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface IRolMapper extends IMantenibleMapper<Rol> {
	@Select( value = {"{call SP_MANT_ROL("
			+ "#{operacion, jdbcType = VARCHAR, mode = IN},"
			+ "#{operacionParam, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.idRol, jdbcType = INTEGER, mode = IN},"
			+ "#{objeto.nombre, jdbcType = VARCHAR, mode = IN},"
			+ "#{userAudit, jdbcType = VARCHAR, mode = IN})}"} )
	@Options(statementType = StatementType.CALLABLE)
	public List<Rol> mantener(Parametro parametro);
	}

