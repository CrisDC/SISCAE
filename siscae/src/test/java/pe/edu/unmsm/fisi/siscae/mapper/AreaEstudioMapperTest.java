package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.AreaEstudio;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class AreaEstudioMapperTest {

	private @Autowired IAreaEstudioMapper areaEstudioMapper;

	@Test
	public void mantenerTipoGetTest() {

		AreaEstudio areaEstudioTest = new AreaEstudio();
		areaEstudioTest.setIdAreaEstudio(10);
		areaEstudioTest.setNombre("VIDEOFISI");
		areaEstudioTest.setPabellon("SEGUNDO PABELLON");
		areaEstudioTest.setNivel("PRIMER");

		Parametro<AreaEstudio> operacion = new Parametro<>(Operacion.SELECT, areaEstudioTest, "TEST USER");

		List<AreaEstudio> areasEstudios = areaEstudioMapper.mantener(operacion);
		areasEstudios.forEach(System.out::println);
		
		operacion.setOperacion(Operacion.INSERT.name());
		areasEstudios = areaEstudioMapper.mantener(operacion);
		areasEstudios.forEach(System.out::println);

		areaEstudioTest.setNombre("VIDEOFISI 2");
		operacion.setOperacion(Operacion.UPDATE.name());
		areasEstudios = areaEstudioMapper.mantener(operacion);
		areasEstudios.forEach(System.out::println);
		
		operacion.setOperacion(Operacion.DELETE.name());
		areasEstudios = areaEstudioMapper.mantener(operacion);
		areasEstudios.forEach(System.out::println);
		
	}

}
