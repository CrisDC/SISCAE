package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.model.Recurso;

public interface IRecursoMapper
{
    @Select("{call OBTENER_RECURSOS_PERMITIDOS_POR_ID_USUARIO ("
            + "#{idUsuario, jdbcType = VARCHAR, mode = IN})}")
    @Options(statementType = StatementType.CALLABLE)
    public List<Recurso> obtenerRecursosPermitidosPorIdUsuario(
            @Param("idUsuario") String idUsuario);
}