package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Prestamo;
import pe.edu.unmsm.fisi.siscae.service.IMantenibleService;



public interface IPrestamoService extends IMantenibleService<Prestamo> {

	public List<Prestamo> buscarTodos();

    public List<Prestamo> buscarPorIdPrestamo(Integer idPrestamo);

    public boolean existePrestamo(Integer idPrestamo);

    public void registrarPrestamo(Prestamo prestamo);

    public void actualizarPrestamo(Prestamo prestamo);

    public void eliminarPrestamo(Prestamo prestamo);
	
}
