package pe.edu.unmsm.fisi.siscae.mapper;


import java.util.List;


import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.consulta.PrestamoRecurso;
import pe.edu.unmsm.fisi.siscae.model.criterio.ConsultaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.criterio.NumeroDocumentoIdentidadCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Prestamo;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;



public interface IConsultaPrestamosMapper  {
	
	public List<PrestamoRecurso> buscarTodos();
	public List<PrestamoRecurso> buscarPorCriterio(ConsultaPrestamosCriterioBusqueda criterioBusqueda);
	public List<PrestamoRecurso> buscarPorNumeroDocumentoIdentidad(NumeroDocumentoIdentidadCriterioBusqueda criterioBusqueda);
	
}
