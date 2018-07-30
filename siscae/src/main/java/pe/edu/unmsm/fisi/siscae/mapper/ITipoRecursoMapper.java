package pe.edu.unmsm.fisi.siscae.mapper;
import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.TipoRecurso;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
public interface ITipoRecursoMapper extends IMantenibleMapper <TipoRecurso> {
	
	@Select(value = { "{call SP_MANT_TIPO_RECURSO ( "
            + "#{operacion, jdbcType = VARCHAR, mode = IN},"
            + "#{operacionParam, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.idTipoRecurso, jdbcType = INTEGER, mode = IN},"
            + "#{objeto.nombre, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.descripcion, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.uso, jdbcType = VARCHAR, mode = IN},"
            + "#{userAudit, jdbcType = VARCHAR, mode = IN})}" })
	 @Options (statementType = StatementType.CALLABLE)
	 public List<TipoRecurso> mantener (Parametro parametro);
}
