package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MovimientoFinPrestamo;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MovimientoPrestamo;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface IMovimientoFinPrestamoMapper extends IMantenibleMapper<MovimientoFinPrestamo>{
	
	@Select(value = { "{call SP_REGISTRAR_FIN_PRESTAMO ( "
            + "#{objeto.numDocumentoSolicitante, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.nombreUsuario, jdbcType = VARCHAR, mode = IN})}" })
    @Options(statementType = StatementType.CALLABLE)
    public List<MovimientoFinPrestamo> mantener(Parametro parametro);
}
