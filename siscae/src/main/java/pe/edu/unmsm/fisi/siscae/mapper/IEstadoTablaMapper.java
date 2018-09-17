package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.EstadoTabla;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface IEstadoTablaMapper extends IMantenibleMapper<EstadoTabla> {

	@Override
	@Select(value = { "{call SP_MANT_ESTADO_TABLA ( " 
            + "#{operacion, 			jdbcType = VARCHAR, mode = IN},"
            + "#{operacionParam, 		jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.tablaOrigen,	jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.idEstadoTabla, 	jdbcType = INTEGER, mode = IN},"
            + "#{objeto.descripcion, 	jdbcType = INTEGER, mode = IN},"
            + "#{objeto.estado, 		jdbcType = BOOLEAN, mode = IN},"
            + "#{userAudit, 			jdbcType = VARCHAR, mode = IN})}" })//POR CONSULTAR 
    @Options(statementType = StatementType.CALLABLE)
	public List<EstadoTabla> mantener(Parametro parametro);
	
}
