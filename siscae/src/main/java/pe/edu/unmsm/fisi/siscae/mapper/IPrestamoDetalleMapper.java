package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.PrestamoDetalle;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface IPrestamoDetalleMapper extends IMantenibleMapper<PrestamoDetalle> {
@Select(value = { "{call SP_MANT_PRESTAMO_DETALLE ( "
        + "#{operacion, jdbcType = VARCHAR, mode = IN},"
        + "#{operacionParam, jdbcType = VARCHAR, mode = IN},"		
        + "#{objeto.idPrestamo, jdbcType = INTEGER, mode = IN},"
        + "#{objeto.idMaterial, jdbcType = INTEGER, mode = IN},"
        + "#{objeto.horaEntrega, jdbcType = TIME, mode = IN},"
        + "#{objeto.horaDevolucion, jdbcType = TIME, mode = IN},"
        + "#{userAudit, jdbcType = VARCHAR, mode = IN})}" })
@Options(statementType = StatementType.CALLABLE)
public List<PrestamoDetalle> mantener(Parametro parametro);
}
