package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Escuela;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface IEscuelaMapper  extends  IMantenibleMapper<Escuela>{
	@Select(value = { "{call MANT_Escuela ( " 
            + "#{operacion, jdbcType = VARCHAR, mode = IN},"
            + "#{operacionParam, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.idEscuela, jdbcType = INTEGER, mode = IN},"
            + "#{objeto.nombre, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.idFacultad, jdbcType = INTEGER, mode = IN},"
            + "#{userAudit, jdbcType = VARCHAR, mode = IN})}" })//POR CONSULTAR 
    @Options(statementType = StatementType.CALLABLE)
    public List<Escuela> mantener(Parametro parametro);
}


