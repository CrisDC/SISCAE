package pe.edu.unmsm.fisi.siscae.mapper;

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
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class PrestamoDetalleMapperTest {
	private @Autowired IPrestamoDetalleMapper prestamoDetalleMapper;

	@Test
	public void mantenerTipoGetTest() {
		
		PrestamoDetalle prestamoDetalleTest = new PrestamoDetalle();
		prestamoDetalleTest.setIdPrestamo(3);
		prestamoDetalleTest.setIdMaterial(2);
		prestamoDetalleTest.setHoraEntrega(LocalTime.now());
		prestamoDetalleTest.setHoraDevolucion(LocalTime.now());
		
		Parametro<PrestamoDetalle> operacion = new Parametro<>(Operacion.SELECT, prestamoDetalleTest, "TEST USER");

		List<PrestamoDetalle> prestamosDetalle = prestamoDetalleMapper.mantener(operacion);
		prestamosDetalle.forEach(System.out::println);
		
		operacion.setOperacion(Operacion.INSERT.name());
		prestamosDetalle = prestamoDetalleMapper.mantener(operacion);
		prestamosDetalle.forEach(System.out::println);
						
		prestamoDetalleTest.setHoraDevolucion(LocalTime.now());
		operacion.setOperacion(Operacion.UPDATE.name());
		prestamosDetalle = prestamoDetalleMapper.mantener(operacion);
		prestamosDetalle.forEach(System.out::println);
		
		operacion.setOperacion(Operacion.DELETE.name());
		prestamosDetalle = prestamoDetalleMapper.mantener(operacion);
		prestamosDetalle.forEach(System.out::println);
	}

}
