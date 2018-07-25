package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.ResultMap;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.model.PersonaPP;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface IPersonaPPMapper {

	 public List<PersonaPP> buscarTodos();

	 @Select(value = {
				"{call MANT_LOTE ( "
				+"#{operacion, 					jdbcType = VARCHAR, mode = IN},"
				+"#{object.IdPersona, 		jdbcType = INTEGER, mode = IN},"
				+"#{object.Nombres, 		jdbcType = VARCHAR, mode = IN},"
				+"#{object.ApePaterno, 		jdbcType = VARCHAR, mode = IN},"
				+"#{object.ApeMaterno, 		jdbcType = VARCHAR, mode = IN},"
				+"#{object.TipoDocumento, 	jdbcType = INTEGER, mode = IN},"
				+"#{object.NumDocumento, 	jdbcType = VARCHAR, mode = IN},"
				+"#{object.Direccion, 		jdbcType = VARCHAR, mode = IN},"
				+"#{object.TelFijo, 		jdbcType = VARCHAR, mode = IN},"
				+"#{object.TelMovil, 		jdbcType = VARCHAR, mode = IN},"
				+"#{object.FechaRegistro, 	jdbcType = DATE, mode = IN},"
				+"#{object.FechaNacimiento, jdbcType = DATE, mode = IN},"
				+"#{object.CodCliente, 		jdbcType = VARCHAR, mode = IN},"
				+"#{object.NomCliente, 		jdbcType = VARCHAR, mode = IN},"
				+"#{user_audit, 			jdbcType = VARCHAR, mode = IN}"
				+ ")}" })
		@Options(statementType = StatementType.CALLABLE)
		public List<PersonaPP> mantener(Parametro param);
		
		
		@Select(value = {
				"{ call sp_VerificaLista( "
				+"#{pvListaXML}, "
				+"#{psBin}, "
				+"#{psSubBin}"
				+ ")}"})
		@ResultMap("mapPersonas")
		@Options(statementType = StatementType.CALLABLE)
		public List<PersonaPP> VerificaLista(@Param("pvListaXML")String psListaXML, @Param("psBin")String psBin, @Param("psSubBin")String psSubBin);
		
		@Select(value = {
				"{ call EMITIR_LISTA( "
				+"#{pvListaXML}"
				+ ")}"})
		@ResultMap("mapPersonas")
		@Options(statementType = StatementType.CALLABLE)
		public List<PersonaPP> emitirLista(@Param("pvListaXML")String psListaXML);
		
		@Select(value = {
				"{ call sp_ObtenerPersonasLote(#{pnIdLote})}"})
		@ResultMap("mapPersonas")
		@Options(statementType = StatementType.CALLABLE)
		public List<PersonaPP> ObtenerPersonasLote(@Param("pnIdLote")Integer nIdLote);
	 
	
}
