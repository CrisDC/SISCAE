package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Membresia;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface IMembresiaMapper extends IMantenibleMapper<Membresia>
{
    @Select("{call MANT_MEMBRESIAS ( #{operacion, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.codigoMembresia, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.descripcion, jdbcType = VARCHAR, mode = IN},"
            + "#{userAudit, jdbcType = VARCHAR, mode = IN})}")
    @Options(statementType = StatementType.CALLABLE)
    public List<Membresia> mantener(Parametro parametro);
}