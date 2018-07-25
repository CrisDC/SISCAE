package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Cliente;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface IClienteMapper extends IMantenibleMapper<Cliente>
{
    @Select(value = { "{call MANT_CLIENTE (#{operacion, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.idCliente, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.idEmpresa, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.descripcion, jdbcType = VARCHAR, mode = IN},"
            + "#{userAudit, jdbcType = VARCHAR, mode = IN})}" })
    @Options(statementType = StatementType.CALLABLE)
    public List<Cliente> mantener(Parametro parametro);
}