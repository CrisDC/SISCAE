package pe.edu.unmsm.fisi.siscae.mapper;


import java.util.List;


import pe.edu.unmsm.fisi.siscae.model.consulta.PrestamoRecursoTabla;
import pe.edu.unmsm.fisi.siscae.model.criterio.ConsultaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.criterio.NumeroDocumentoIdentidadCriterioBusqueda;




public interface IConsultaPrestamosTablaMapper  {
	
	public List<PrestamoRecursoTabla> buscarTodos();
	public List<PrestamoRecursoTabla> buscarPorCriterio(ConsultaPrestamosCriterioBusqueda criterioBusqueda);
	public List<PrestamoRecursoTabla> buscarPorCriterio2(ConsultaPrestamosCriterioBusqueda criterioBusqueda);
	public List<PrestamoRecursoTabla> buscarPorNumeroDocumentoIdentidad(NumeroDocumentoIdentidadCriterioBusqueda criterioBusqueda);
	
}
