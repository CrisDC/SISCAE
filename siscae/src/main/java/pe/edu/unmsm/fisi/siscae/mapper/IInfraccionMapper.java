package pe.edu.unmsm.fisi.siscae.mapper;
import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Infraccion;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface IInfraccionMapper extends IMantenibleMapper<Infraccion> {
	
	@Select(value = { "{call SP_MANT_INFRACCION ( "
            + "#{operacion, jdbcType = VARCHAR, mode = IN},"
            + "#{operacionParam, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.idInfraccion, jdbcType = INTEGER, mode = IN},"
            + "#{objeto.descripcion, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.fecha, jdbcType = DATE, mode = IN},"
            + "#{objeto.estado,jdbcType = BOOLEAN, mode = IN},"
            + "#{objeto.idPersona,jdbcType = INTEGER, mode = IN},"
            + "#{objeto.idTipoInfraccion,jdbcType = INTEGER, mode = IN},"
            + "#{userAudit, jdbcType = VARCHAR, mode = IN})}" })
	@Options (statementType = StatementType.CALLABLE)
	 public List<Infraccion> mantener (Parametro parametro);
	

}
