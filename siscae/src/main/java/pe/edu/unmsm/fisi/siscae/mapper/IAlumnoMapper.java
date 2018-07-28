package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Alumno;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface IAlumnoMapper extends  IMantenibleMapper<Alumno>{
		@Select(value = { "{call MANT_Alumno ( " 
	            + "#{operacion, jdbcType = VARCHAR, mode = IN},"
	            + "#{operacionParam, jdbcType = VARCHAR, mode = IN},"
	            + "#{objeto. idAlumno, jdbcType = INT, mode = IN},"
	            + "#{objeto.codigo, jdbcType = VARCHAR, mode = IN},"
	            + "#{objeto estadoAlumno, jdbcType = VARCHAR, mode = IN},"
	            + "#{objeto.idTipoAcademico,jdbcType = INT, mode = IN},"
	            + "#{objeto.idEscuela,jdbcType = INT, mode = IN},"
	            + "#{objeto.fechaRegistro,jdbcType = DATETIME, mode = IN},"
	            + "#{objeto.usuarioRegistro,jdbcType = VARCHAR, mode = IN},"
	            + "#{objeto.fechaModificacion,jdbcType = DATETIME, mode = IN},"
	            + "#{objeto.usuarioModificacion,jdbcType = VARCHAR, mode = IN},"
	            + "#{userAudit, jdbcType = VARCHAR, mode = IN})}" })//POR CONSULTAR 
	    @Options(statementType = StatementType.CALLABLE)
	    public List<Alumno> mantener(Parametro parametro);
	}
		
		


