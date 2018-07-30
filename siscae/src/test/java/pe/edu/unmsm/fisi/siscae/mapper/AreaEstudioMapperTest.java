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
		areaEstudioTest.setIdAreaEstudio(3);
		areaEstudioTest.setNombre("VIDEOFISI");
		areaEstudioTest.setPabellon("PRIMER PABELLON");
		areaEstudioTest.setNivel("PRIMER NIVEL");

		Parametro<AreaEstudio> operacion = new Parametro<>(Operacion.SELECT, areaEstudioTest, "USER TEST");

		List<AreaEstudio> areaEstudios = areaEstudioMapper.mantener(operacion);
		areaEstudios.forEach(System.out::println);
		
		operacion.setOperacion(Operacion.INSERT.name());
		areaEstudios = areaEstudioMapper.mantener(operacion);
		areaEstudios.forEach(System.out::println);
		
		areaEstudioTest.setNombre("SALA DE ESTUDIO");
		operacion.setOperacion(Operacion.UPDATE.name());
		areaEstudios = areaEstudioMapper.mantener(operacion);
		areaEstudios.forEach(System.out::println);
		
		operacion.setOperacion(Operacion.DELETE.name());
		areaEstudios = areaEstudioMapper.mantener(operacion);
		areaEstudios.forEach(System.out::println);
	}

}
