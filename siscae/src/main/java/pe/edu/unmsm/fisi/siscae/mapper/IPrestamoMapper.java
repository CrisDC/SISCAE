package pe.edu.unmsm.fisi.siscae.mapper;


import java.util.List;


import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Prestamo;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;



public interface IPrestamoMapper extends IMantenibleMapper<Prestamo> {
	
	@Select( value = {"{call SP_MANT_PRESTAMO("
			+ "#{operacion, jdbcType = VARCHAR, mode = IN},"
			+ "#{operacionParam, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.idPrestamo, jdbcType = INTEGER, mode = IN},"
			+ "#{objeto.fecha, jdbcType = DATE, mode = IN},"
			+ "#{objeto.horaEntrada, jdbcType = TIME, mode = IN},"
			+ "#{objeto.horaSalida, jdbcType = TIME, mode = IN},"
			+ "#{objeto.idEstadoTabla, jdbcType = INTEGER, mode = IN},"
			+ "#{objeto.idRecurso, jdbcType = INTEGER, mode = IN},"
			+ "#{objeto.idAdministrativo, jdbcType = INTEGER, mode = IN},"
			+ "#{objeto.idPersona, jdbcType = INTEGER, mode = IN},"
			+ "#{userAudit, jdbcType = VARCHAR, mode = IN})}"} )
	@Options(statementType = StatementType.CALLABLE)
	public List<Prestamo> mantener(Parametro parametro);
	
}
