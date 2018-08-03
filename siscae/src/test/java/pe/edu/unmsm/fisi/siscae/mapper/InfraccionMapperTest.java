package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Infraccion;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class InfraccionMapperTest {

	private @Autowired IInfraccionMapper infraccionMapper;

	@Test
	public void mantenerTipoGetTest() {

		Infraccion infraccionTest = new Infraccion();
		infraccionTest.setIdInfraccion(2);
		infraccionTest.setDescripcion("PRUEBA INSERCION");
		infraccionTest.setFecha(new Date());
		infraccionTest.setIdEstadoTabla(1);
		infraccionTest.setIdPersona(1);
		infraccionTest.setIdTipoInfraccion(1);
		Parametro<Infraccion> operacion = new Parametro<>(Operacion.SELECT, infraccionTest, "TEST USER");

		List<Infraccion> infracciones = infraccionMapper.mantener(operacion);
		infracciones.forEach(System.out::println);

		operacion.setOperacion(Operacion.INSERT.name());
		infracciones = infraccionMapper.mantener(operacion);
		infracciones.forEach(System.out::println);

		infraccionTest.setDescripcion("PRUEBA UPDATE");
		operacion.setOperacion(Operacion.UPDATE.name());
		infracciones = infraccionMapper.mantener(operacion);
		infracciones.forEach(System.out::println);

		operacion.setOperacion(Operacion.DELETE.name());
		infracciones = infraccionMapper.mantener(operacion);
		infracciones.forEach(System.out::println);
	}

}
