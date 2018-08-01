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
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Persona;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class PersonaMapperTest {

	private @Autowired IPersonaMapper personaMapper;

	@Test
	public void mantenerTipoGetTest() {

		Persona personaTest = new Persona();
		personaTest.setIdPersona(5);
		personaTest.setNumDocumento("73094338");
		personaTest.setNombre("PERSONA DE PRUEBA");
		personaTest.setAppPaterno("DE LA CRUZ");
		personaTest.setAppMaterno("SÁNCHEZ");
		personaTest.setSexo("MASCULINO");
		personaTest.setFechaNac(new Date(1995, 07, 04));
		personaTest.setNumTelef("985990330");
		personaTest.setIdTipoDocumento(1);

		Parametro<Persona> operacion = new Parametro<Persona>(Operacion.SELECT, personaTest, "TEST USER");

		List<Persona> personas = personaMapper.mantener(operacion);
		personas.forEach(System.out::println);
		
		operacion.setOperacion(Operacion.INSERT.name());
		personas = personaMapper.mantener(operacion);
		personas.forEach(System.out::println);
		
		personaTest.setNombre("PRUEBA UPDATE");
		operacion.setOperacion(Operacion.UPDATE.name());
		personas = personaMapper.mantener(operacion);
		personas.forEach(System.out::println);
		
		operacion.setOperacion(Operacion.DELETE.name());
		personas = personaMapper.mantener(operacion);
		personas.forEach(System.out::println);
		
	}

}
