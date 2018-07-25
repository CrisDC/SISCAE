package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.ParametroGeneral;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface IParametroGeneralMapper extends IMantenibleMapper<ParametroGeneral>
{
    @Select("{call MANT_PARAMETROS_GENERALES ( "
            + "#{operacion, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.fechaProceso, jdbcType = DATE, mode = IN},"
            + "#{objeto.plantillas,	jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.config, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.binRuteoSwitch, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.codigoInstitucion, jdbcType = INTEGER, mode = IN},"
            + "#{objeto.repositorioPrepago, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.repositorioCompensacion, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.surchargeSoles, jdbcType = NUMERIC, mode = IN},"
            + "#{objeto.surchargeDolares, jdbcType = NUMERIC, mode = IN},"
            + "#{objeto.idEmpresa, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.enmascararTarjeta, jdbcType = NUMERIC, mode = IN},"
            + "#{objeto.porcentajeIgv, jdbcType = NUMERIC, mode = IN},"
            + "#{objeto.rutaContextoSimpBus, jdbcType = VARCHAR, mode = IN},"
            + "#{userAudit, jdbcType = VARCHAR, mode = IN})}")
    @Options(statementType = StatementType.CALLABLE)
    public List<ParametroGeneral> mantener(Parametro parametro);
}