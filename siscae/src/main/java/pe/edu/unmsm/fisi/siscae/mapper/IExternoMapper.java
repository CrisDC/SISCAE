package pe.edu.unmsm.fisi.siscae.mapper;
import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Externo;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;



public interface IExternoMapper extends IMantenibleMapper<Externo> {
	@Select(value = { "{call SP_MANT_EMPRESAS ( "
            + "#{operacion, jdbcType = VARCHAR, mode = IN},"
            + "#{operacionParam, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.persona.idPersona, jdbcType = INTEGER, mode = IN},"
            + "#{objeto.estadoExterno, jdbcType = VARCHAR, mode = IN},"
            + "#{userAudit, jdbcType = VARCHAR, mode = IN})}" })
	@Options (statementType = StatementType.CALLABLE)
	 public List<Externo> mantener (Parametro parametro);
	
	

}
