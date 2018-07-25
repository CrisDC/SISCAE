package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.ResultType;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.model.seguridad.PoliticaSeguridad;

public interface IPoliticaSeguridadMapper extends IMantenibleMapper<PoliticaSeguridad>
{	
	@Select("SELECT nNumeroMaximoIntentos,bComplejidadContrasenia,nCantidadDiasParaCaducidadContrasenia,nLongitudMinima FROM secPoliticaSeguridad")
    @Results({@Result(property = "numeroMaximoIntentos", column = "nNumeroMaximoIntentos"),
            @Result(property = "complejidadContrasenia", column = "bComplejidadContrasenia"),
            @Result(property = "cantidadDiasParaCaducidadContrasenia", column = "nCantidadDiasParaCaducidadContrasenia"),
            @Result(property = "longitudMinimaContrasenia", column = "nLongitudMinima") })
    @ResultType(PoliticaSeguridad.class)
    public List<PoliticaSeguridad> getLsPoliticaSeguridad();
	
	@Select(value = { "{call MANT_POLITICA_SEGURIDAD ( "
            + "#{operacion, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.numeroMaximoIntentos, jdbcType = INTEGER, mode = IN},"
            + "#{objeto.complejidadContrasenia, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.cantidadDiasParaCaducidadContrasenia, jdbcType = INTEGER, mode = IN},"
            + "#{objeto.longitudMinimaContrasenia, jdbcType = INTEGER, mode = IN},"
            + "#{objeto.autenticacionActiveDirectory, jdbcType = BIT, mode = IN},"
            + "#{userAudit, jdbcType = VARCHAR, mode = IN})}" })
    @Options(statementType = StatementType.CALLABLE)
    public List<PoliticaSeguridad> mantener(Parametro parametro);
}