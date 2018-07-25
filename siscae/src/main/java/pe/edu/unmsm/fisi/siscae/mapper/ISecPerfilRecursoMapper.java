package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.model.seguridad.SecPerfilRecurso;

public interface ISecPerfilRecursoMapper extends IMantenibleMapper<SecPerfilRecurso> {
	@Select(value = { "{call MANT_PERFIL_RECURSO ( #{operacion, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.idPerfil, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.idRecurso, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.permiso, jdbcType = VARCHAR, mode = IN}," + "#{userAudit, jdbcType = VARCHAR, mode = IN})}" })
	@Options(statementType = StatementType.CALLABLE)
	public List<SecPerfilRecurso> mantener(Parametro parametro);

	@Delete("{call ELIMINAR_PERMISOS ( #{idPerfil, jdbcType = VARCHAR, mode = IN})}")
	@Options(statementType = StatementType.CALLABLE)
	public void eliminarPermisos(@Param("idPerfil") String idPerfil);

}