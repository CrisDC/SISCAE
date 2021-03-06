package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Solicitante;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface ISolicitanteMapper extends IMantenibleMapper<Solicitante> {

	@Select(value = { "{call SP_MANT_SOLICITANTE ("
			+ "#{operacion, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.idTipoDocumentoSolicitante, jdbcType = INTEGER, mode = IN},"
            + "#{objeto.numDocumentoSolicitante, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.appPaterno, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.appMaterno, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.nombre, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.sexo, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.fechaNac, jdbcType = DATE, mode = IN},"
            + "#{objeto.telefono, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.tipoAcademico, jdbcType = INTEGER, mode = IN},"
            + "#{objeto.ocupacion, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.idEscuela, jdbcType = INTEGER, mode = IN},"
            + "#{objeto.codigoAlumno, jdbcType = VARCHAR, mode = IN},"
			+ "#{objeto.usuario, jdbcType = VARCHAR, mode = IN})}" })
    @Options(statementType = StatementType.CALLABLE)
    public List<Solicitante> mantener(Parametro parametro);
}


