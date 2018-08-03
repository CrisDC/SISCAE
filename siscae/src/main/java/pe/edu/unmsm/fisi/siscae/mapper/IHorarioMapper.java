package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Horario;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;


public interface IHorarioMapper extends IMantenibleMapper<Horario> {
	@Select(value = { "{call SP_MANT_HORARIO ( "
            + "#{operacion, jdbcType = VARCHAR, mode = IN},"
            + "#{operacionParam, jdbcType = VARCHAR, mode = IN},"		
            + "#{objeto.idHorario, jdbcType = INTEGER, mode = IN},"
            + "#{objeto.horaInicio, jdbcType = TIME, mode = IN},"
            + "#{objeto.horaFin, jdbcType = TIME, mode = IN},"
            + "#{objeto.tiempoMax, jdbcType = DECIMAL, mode = IN},"
            + "#{objeto.descripcion, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.idEstadoTabla, jdbcType = INTEGER, mode = IN}," 
			+ "#{objeto.idTurno, jdbcType = INTEGER, mode = IN},"
		    + "#{objeto.idDia,jdbcType = INTEGER, mode = IN},"
		    + "#{objeto.idTipoHorario,jdbcType = INTEGER, mode = IN},"
            + "#{objeto.idAreaEstudio, jdbcType = INTEGER, mode = IN},"	
		    + "#{userAudit, jdbcType = VARCHAR, mode = IN})}" }) 
    @Options(statementType = StatementType.CALLABLE)
    public List<Horario> mantener(Parametro parametro);
}
