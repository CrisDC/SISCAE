package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;


import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Material;


public interface IMaterialMapper extends IMantenibleMapper<Material> {

	
	@Select( value = {"{call SP_MANT_MATERIAL("
			+ "#{operacion, jdbcType = VARCHAR, mode = IN},"
			+ "#{operacionParam, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.idMaterial, jdbcType = INTEGER, mode = IN},"
			+ "#{objecto.nombreMaterial, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.idTipoMaterial, jdbcType = INTEGER, mode = IN},"
			+ "#{userAudit, jdbcType = VARCHAR, mode = IN})}"} )
	@Options(statementType = StatementType.CALLABLE)
	public List<Material> mantener(Parametro parametro);
	
	
}
