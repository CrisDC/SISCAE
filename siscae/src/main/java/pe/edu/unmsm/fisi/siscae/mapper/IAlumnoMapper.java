package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Alumno;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface IAlumnoMapper extends  IMantenibleMapper<Alumno>{
		@Select(value = { "{call SP_MANT_ALUMNO ( " 
	            + "#{operacion, jdbcType = VARCHAR, mode = IN},"
	            + "#{operacionParam, jdbcType = VARCHAR, mode = IN},"
	            + "#{objeto.persona.idPersona, jdbcType = INTEGER, mode = IN},"
	            + "#{objeto.codigoAlumno, jdbcType = VARCHAR, mode = IN},"
	            + "#{objeto.idEstadoTabla, jdbcType = INTEGER, mode = IN},"
	            + "#{objeto.idTipoAcademico,jdbcType = INTEGER, mode = IN},"
	            + "#{objeto.idEscuela,jdbcType = INTEGER, mode = IN},"
	            + "#{userAudit, jdbcType = VARCHAR, mode = IN})}" })//POR CONSULTAR 
	    @Options(statementType = StatementType.CALLABLE)
	    public List<Alumno> mantener(Parametro parametro);
	}
		
		


