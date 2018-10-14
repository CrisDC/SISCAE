package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MovimientoDesalojarArea;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface IMovimientoDesalojarAreaMapper extends IMantenibleMapper<MovimientoDesalojarArea>{
	
	@Select(value = { "{call SP_DESOCUPAR_AREA_ESTUDIO ( "
            + "#{objeto.username, jdbcType = VARCHAR, mode = IN})}" })
    @Options(statementType = StatementType.CALLABLE)
    public List<MovimientoDesalojarArea> mantener(Parametro parametro);
}
