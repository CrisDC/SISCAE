package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;


import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.practica.Administrativo;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;


public interface IAdministrativoMapper extends IMantenibleMapper<Administrativo> {

	@Select( value = {"{call SP_MANT_ADMINISTRATIVO("
			+ "#{operacion, jdbcType = VARCHAR, mode = IN},"
			+ "#{operacionParam, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.idAdministrativo, jdbcType = INTEGER, mode = IN},"
			+ "#{objeto.codigoAdm, jdbcType = VARCHAR, mode = IN},"
			+ "#{userAudit, jdbcType = VARCHAR, mode = IN})}"} )
	@Options(statementType = StatementType.CALLABLE)
	public List<Administrativo> mantener(Parametro parametro);
	
	
	
}
