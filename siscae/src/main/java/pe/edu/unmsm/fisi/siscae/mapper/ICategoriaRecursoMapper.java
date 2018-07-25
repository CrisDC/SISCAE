package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.model.seguridad.CategoriaRecurso;

public interface ICategoriaRecursoMapper extends IMantenibleMapper<CategoriaRecurso>
{
    public List<CategoriaRecurso> buscarCategoriaRecursoPorIdPerfil(
            @Param("idPerfil") String idPerfil);

    @Select(value = { "{call MANT_CATEGORIA_RECURSO ( #{operacion, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.idCategoria, jdbcType = INTEGER, mode = IN},"
            + "#{objeto.categoria, jdbcType = VARCHAR, mode = IN},"
            + "#{objeto.accionCategoria, jdbcType = VARCHAR, mode = IN},"
            + "#{userAudit, jdbcType = VARCHAR, mode = IN})}" })
    @Options(statementType = StatementType.CALLABLE)
    public List<CategoriaRecurso> mantener(Parametro parametro);
    
    public List<CategoriaRecurso> buscarTodosCategoriaRecurso();

    public List<CategoriaRecurso> getLsCategoriaRecurso(String codPerfil);
}