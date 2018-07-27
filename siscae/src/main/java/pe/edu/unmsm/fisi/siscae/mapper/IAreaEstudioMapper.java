package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.AreaEstudio;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface IAreaEstudioMapper extends IMantenibleMapper<AreaEstudio> {
	@Select(value = { "{call MANT_AREA_ESTUDIO ( "
            + "#{operacion, jdbcType = VARCHAR, mode = IN},"
            + "#{operacionParam, jdbcType = VARCHAR, mode = IN},"	
            + "#{objeto.idAreaEstudio, jdbcType = INT, mode = IN},"
            + "#{objeto.nombre, jdbcType = TIME, mode = IN},"
            + "#{objeto.pabellon, jdbcType = TIME, mode = IN},"
            + "#{objeto.nivel,jdbcType = BOOLEAN, mode = IN},"
            + "#{objeto.fechaRegistro, jdbcType = DECIMAL, mode = IN}," 
			+ "#{objeto.usuarioRegistro, jdbcType = INT, mode = IN},"
		    + "#{objeto.fechaModificacion,jdbcType = INT, mode = IN},"
            + "#{objeto.usuarioModificacion, jdbcType = INT, mode = IN}," 
			+ "#{userAudit, jdbcType = VARCHAR, mode = IN})}" })
    @Options(statementType = StatementType.CALLABLE)
	public List<AreaEstudio> mantener(Parametro parametro);
}
