package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MovimientoPrestamo;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface IMovimientoPrestamoMapper extends IMantenibleMapper<MovimientoPrestamo> {

	@Select(value = { "{call SP_REGISTRAR_INICIO_PRESTAMO ("
            + "#{objeto.numDocumentoSolicitante, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.nombreUsuario, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.idRecurso, jdbcType = INTEGER, mode = IN})}" })
    @Options(statementType = StatementType.CALLABLE)
    public List<MovimientoPrestamo> mantener(Parametro parametro);
}
