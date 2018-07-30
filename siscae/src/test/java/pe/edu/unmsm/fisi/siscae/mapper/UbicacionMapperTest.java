package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Ubicacion;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class UbicacionMapperTest {

	private @Autowired IUbicacionMapper ubicacionMapper;

	@Test
	public void mantenerTipoGetTest() {
		Ubicacion ubicacionTest = new Ubicacion();
		ubicacionTest.setIdUbicacion(2);
		ubicacionTest.setCoordenadaX(100.00);
		ubicacionTest.setCoordenadaY(155.00);
		Parametro<Ubicacion> operacion = new Parametro<Ubicacion>(Operacion.SELECT, ubicacionTest, "TEST USER");

		List<Ubicacion> ubicaciones = ubicacionMapper.mantener(operacion);
		ubicaciones.forEach(System.out::println);

		operacion.setOperacion(Operacion.INSERT.name());
		ubicaciones = ubicacionMapper.mantener(operacion);
		ubicaciones.forEach(System.out::println);

		ubicacionTest.setCoordenadaY(200.00);
		operacion.setOperacion(Operacion.UPDATE.name());
		ubicaciones = ubicacionMapper.mantener(operacion);

		operacion.setOperacion(Operacion.DELETE.name());
		ubicaciones = ubicacionMapper.mantener(operacion);
		ubicaciones.forEach(System.out::println);

	}

}
