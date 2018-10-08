package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Recurso;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface IRecursoMapper extends IMantenibleMapper<Recurso> {
	@Select(value = { "{call SP_MANT_RECURSO ( " 
			+ "#{operacion, jdbcType = VARCHAR, mode = IN},"
			+ "#{operacionParam, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.idRecurso, jdbcType = INTEGER, mode = IN},"
			+ "#{objeto.numeroSerie, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.descripcion, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.idEstadoTabla, jdbcType = INTEGER, mode = IN},"
			+ "#{objeto.idTipoRecurso, jdbcType = INTEGER, mode = IN},"
			+ "#{objeto.idAreaEstudio, jdbcType = INTEGER, mode = IN},"
			+ "#{objeto.idUbicacion, jdbcType = INTEGER, mode = IN},"
			+ "#{objeto.idRecursoPadre, jdbcType = INTEGER, mode = IN},"
			+ "#{objeto.observacion, jdbcType = VARCHAR, mode = IN},"
			+ "#{userAudit, jdbcType = VARCHAR, mode = IN})}" })
	@Options(statementType = StatementType.CALLABLE)
	public List<Recurso> mantener(Parametro parametro);
}