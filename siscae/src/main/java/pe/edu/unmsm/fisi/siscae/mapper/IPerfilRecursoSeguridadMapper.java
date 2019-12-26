package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Facultad;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.model.seguridad.PerfilRecursoSeguridad;

public interface IPerfilRecursoSeguridadMapper extends  IMantenibleMapper<PerfilRecursoSeguridad> {

	@Select(value = { "{call SP_MANT_SEG_PERFIL_RECURSO ( " 
            + "#{operacion, jdbcType = VARCHAR, mode = IN},"
            + "#{operacionParam, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.idPerfil, jdbcType = INTEGER, mode = IN},"
            + "#{objeto.idRecurso, jdbcType = INTEGER, mode = IN},"
            + "#{objeto.acciones, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.nombreUsuario, jdbcType = VARCHAR, mode = IN})}" })
    @Options(statementType = StatementType.CALLABLE)
    public List<PerfilRecursoSeguridad> mantener(Parametro parametro);
}

