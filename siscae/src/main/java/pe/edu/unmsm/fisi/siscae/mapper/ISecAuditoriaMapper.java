package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.ResultType;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.criterio.CriterioBusquedaAuditoria;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.model.seguridad.SecAuditoria;
import pe.edu.unmsm.fisi.siscae.model.seguridad.SecTipoAuditoria;

public interface ISecAuditoriaMapper extends IMantenibleMapper<SecAuditoria>
{
	@Select(value = { "{call MANT_AUDITORIA ( #{operacion, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.codigoAuditoria, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.idAccion, jdbcType = CHAR, mode = IN},"
			+ "#{objeto.direccionIp, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.exito, jdbcType = INTEGER, mode = IN},"
			+ "#{objeto.comentario, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.nombreUsuario, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.fecha, jdbcType = DATE, mode = IN},"
			+ "#{objeto.hora, jdbcType = VARCHAR, mode = IN})}" })
	@Options(statementType = StatementType.CALLABLE)
	public List<SecAuditoria> mantener(Parametro parametro);

    @Select("SELECT vIdTipoAuditoria,vDescripcion FROM SecTipoAuditoria")
    @Results({ @Result(property = "tipoAuditoria", column = "vIdTipoAuditoria"),
            @Result(property = "descripcion", column = "vDescripcion") })
    @ResultType(SecTipoAuditoria.class)
    List<SecTipoAuditoria> getLsTiposAuditorias();

	public List<SecAuditoria> busquedaFiltrosAuditoria(CriterioBusquedaAuditoria criterioBusqueda);   
}