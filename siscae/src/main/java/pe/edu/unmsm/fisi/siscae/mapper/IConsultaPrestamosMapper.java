package pe.edu.unmsm.fisi.siscae.mapper;


import java.util.List;


import pe.edu.unmsm.fisi.siscae.model.consulta.PrestamoRecurso;
import pe.edu.unmsm.fisi.siscae.model.criterio.ConsultaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.criterio.NumeroDocumentoIdentidadCriterioBusqueda;




public interface IConsultaPrestamosMapper  {
	
	public List<PrestamoRecurso> buscarTodos();
	public List<PrestamoRecurso> buscarPorCriterio(ConsultaPrestamosCriterioBusqueda criterioBusqueda);
	public List<PrestamoRecurso> buscarPorCriterio2(ConsultaPrestamosCriterioBusqueda criterioBusqueda);
	public List<PrestamoRecurso> buscarPorNumeroDocumentoIdentidad(NumeroDocumentoIdentidadCriterioBusqueda criterioBusqueda);
	
}
