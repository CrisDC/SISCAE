package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MovimientoInfraccion;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface IMovimientoInfraccionMapper extends IMantenibleMapper<MovimientoInfraccion> {
	
	@Select(value = { "{call SP_APLICAR_INFRACCION ("
            + "#{objeto.numDocumento, 		jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.nombreUsuario, 		jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.descripcion, 		jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.idTipoInfraccion, 	jdbcType = INTEGER, mode = IN})}" })
    @Options(statementType = StatementType.CALLABLE)
    public List<MovimientoInfraccion> mantener(Parametro parametro);

}
