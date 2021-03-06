package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.PrestamoDetalle;

public interface IPrestamoDetalleService extends IMantenibleService<PrestamoDetalle>{
	public List<PrestamoDetalle> buscarTodos();

    public PrestamoDetalle buscarPorId(Integer idPrestamo,Integer idMaterial);

    public boolean existe(Integer idPrestamo,Integer idMaterial);

    public void registrarPrestamoDetalle(PrestamoDetalle prestamoDetalle);

    public void actualizarPrestamoDetalle(PrestamoDetalle prestamoDetalle);

    public void eliminarPrestamoDetalle(PrestamoDetalle prestamoDetalle);
	
}
