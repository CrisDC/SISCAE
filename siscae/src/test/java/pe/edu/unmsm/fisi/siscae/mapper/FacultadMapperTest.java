package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Facultad;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class FacultadMapperTest {

	private @Autowired IFacultadMapper facultadMapper;

	@Test
	public void mantenerTipoGetTest() {

		Facultad facultadTest = new Facultad();
		facultadTest.setIdFacultad(2);
		facultadTest.setNombre("INGENIERÍA DE SISTEMAS E INFORMÁTICA");

		Parametro<Facultad> operacion = new Parametro<>(Operacion.SELECT, facultadTest, "TEST USER");

		List<Facultad> facultades = facultadMapper.mantener(operacion);
		facultades.forEach(System.out::println);

		operacion.setOperacion(Operacion.INSERT.name());
		facultades = facultadMapper.mantener(operacion);
		facultades.forEach(System.out::println);

		facultadTest.setNombre("INGENIERÍA INDUSTRIAL");
		operacion.setOperacion(Operacion.UPDATE.name());
		facultades = facultadMapper.mantener(operacion);
		facultades.forEach(System.out::println);

		operacion.setOperacion(Operacion.DELETE.name());
		facultades = facultadMapper.mantener(operacion);
		facultades.forEach(System.out::println);

	}

}
