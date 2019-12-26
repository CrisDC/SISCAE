package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.model.seguridad.RecursoSeguridad;

public interface IRecursoSeguridadMapper {

	@Select(value = { "{call SP_MANT_SEG_PERFIL_RECURSO ( " 
            + "#{operacion, jdbcType = VARCHAR, mode = IN},"
            + "#{operacionParam, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.idRecurso, jdbcType = INTEGER, mode = IN},"
            + "#{objeto.idCategoriaRecurso, jdbcType = INTEGER, mode = IN},"
            + "#{objeto.descripcion, jdbcType = INTEGER, mode = IN},"
            + "#{objeto.acciones, jdbcType = VARCHAR, mode = IN}"})
            //+ "#{userAudit, jdbcType = VARCHAR, mode = IN})}" })
    @Options(statementType = StatementType.CALLABLE)
    public List<RecursoSeguridad> mantener(Parametro parametro);
	
}
