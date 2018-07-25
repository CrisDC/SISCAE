package pe.edu.unmsm.fisi.siscae.mapper;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.model.ParametroTmp;

public interface ITmpLoaderMapper {

	@Select(value = { "{call P_INSERT_TMP_LOADER ( "
          
            + "#{campo, jdbcType = VARCHAR, mode = IN},"
            + "#{vero, jdbcType = VARCHAR, mode = IN})}" })
    @Options(statementType = StatementType.CALLABLE)
    public void insertar(ParametroTmp parametro);
	
}
