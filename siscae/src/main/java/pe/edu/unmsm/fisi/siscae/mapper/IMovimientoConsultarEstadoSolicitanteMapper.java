package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MovimientoConsultarEstadoSolicitante;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;


public interface IMovimientoConsultarEstadoSolicitanteMapper extends IMantenibleMapper<MovimientoConsultarEstadoSolicitante>{
	
	@Select(value = { "{call SP_ESTADO_SOLICITANTE ( "
            + "#{objeto.numDocumentoSolicitante, jdbcType = VARCHAR, mode = IN})}" })
    @Options(statementType = StatementType.CALLABLE)
    public List<MovimientoConsultarEstadoSolicitante> mantener(Parametro parametro);
}