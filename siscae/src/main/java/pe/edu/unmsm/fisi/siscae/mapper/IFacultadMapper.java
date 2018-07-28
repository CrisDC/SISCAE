package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Alumno;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Facultad;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface IFacultadMapper  extends  IMantenibleMapper<Facultad> {
	
	@Select(value = { "{call MANT_Facultad ( " 
            + "#{operacion, jdbcType = VARCHAR, mode = IN},"
            + "#{operacionParam, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.idFacultad, jdbcType = INT, mode = IN},"
            + "#{objeto.nombre, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.fechaRegistro, jdbcType = DATETIME, mode = IN},"
            + "#{objeto.usuarioRegistro,jdbcType =  VARCHAR, mode = IN},"
            + "#{objeto.fehaModificacion,jdbcType = DATETIME, mode = IN},"
            + "#{objeto.usuarioModificacion,jdbcType = VARCHAR, mode = IN},"
            + "#{userAudit, jdbcType = VARCHAR, mode = IN})}" })//POR CONSULTAR 
    @Options(statementType = StatementType.CALLABLE)
    public List<Facultad> mantener(Parametro parametro);
}
	


