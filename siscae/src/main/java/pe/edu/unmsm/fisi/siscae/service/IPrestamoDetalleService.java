package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Horario;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.PrestamoDetalle;

public interface IPrestamoDetalleService extends IMantenibleService<PrestamoDetalle>{
		public List<PrestamoDetalle> buscarTodos();

	    public List<PrestamoDetalle> buscarPorIdPrestamoDetalle(Integer idPrestamo,Integer idMaterial);

	    public boolean existePrestamoDetalle(Integer idPrestamo,Integer idMaterial);

	    public void registrarPrestamoDetalle(PrestamoDetalle prestamoDetalle);

	    public void actualizarPrestamoDetalle(PrestamoDetalle prestamoDetalle);

	    public void eliminarPrestamoDetalle(PrestamoDetalle prestamoDetalle);
	
}
