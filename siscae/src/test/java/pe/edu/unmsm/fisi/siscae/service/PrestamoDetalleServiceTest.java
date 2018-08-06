package pe.edu.unmsm.fisi.siscae.service;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.time.LocalTime;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.PrestamoDetalle;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class PrestamoDetalleServiceTest {
	private @Autowired IPrestamoDetalleService prestamoDetalleService;

	@Test
	public void registrarPrestamoDetalleTest() {
		PrestamoDetalle prestamoDetalleTest = new PrestamoDetalle();
		prestamoDetalleTest.setIdPrestamo(1);
		prestamoDetalleTest.setIdMaterial(1);
		prestamoDetalleTest.setHoraEntrega(LocalTime.now());
		prestamoDetalleService.registrarPrestamoDetalle(prestamoDetalleTest);

		// Comprobacion de que si agrego
		assertTrue(prestamoDetalleService.existe(prestamoDetalleTest.getIdPrestamo(),
				prestamoDetalleTest.getIdMaterial()));
	}

	@Test
	public void buscarTodosTest() {
		List<PrestamoDetalle> prestamosDetalle = prestamoDetalleService.buscarTodos();
		int foundSize = prestamosDetalle.size();
		System.out.println(foundSize);
		prestamosDetalle.stream().forEach(prestamoDetalle -> {
			System.out.println(prestamoDetalle.toString());
		});

	}

	@Test
	public void buscarPorIdPrestamoDetalleTest() {// puede ser tamaño uno
		PrestamoDetalle prestamoDetalle = prestamoDetalleService.buscarPorId(1, 2);
		System.out.println(prestamoDetalle);
	}

	@Test
	public void existePrestamoDetalleTest() {
		assertTrue(prestamoDetalleService.existe(1, 2));// el id ingresado de arriba
	}

	@Test
	public void actualizarPrestamoDetalleTest() {
		PrestamoDetalle prestamoDetalleTest = new PrestamoDetalle();
		prestamoDetalleTest.setIdPrestamo(3);
		prestamoDetalleTest.setIdMaterial(2);
		prestamoDetalleTest.setHoraEntrega(LocalTime.now());
		prestamoDetalleService.registrarPrestamoDetalle(prestamoDetalleTest);

		prestamoDetalleTest.setHoraEntrega(LocalTime.now());
		prestamoDetalleService.actualizarPrestamoDetalle(prestamoDetalleTest);

	}

	@Test
	public void eliminarPrestamoDetalle() {
		PrestamoDetalle prestamoDetalleTest = new PrestamoDetalle();
		prestamoDetalleTest.setIdPrestamo(4);
		prestamoDetalleTest.setIdMaterial(2);
		prestamoDetalleTest.setHoraEntrega(LocalTime.now());
		prestamoDetalleService.registrarPrestamoDetalle(prestamoDetalleTest);

		prestamoDetalleService.eliminarPrestamoDetalle(prestamoDetalleTest);
		assertFalse(prestamoDetalleService.existe(prestamoDetalleTest.getIdPrestamo(),
				prestamoDetalleTest.getIdMaterial()));

	}
}
