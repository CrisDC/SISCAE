package pe.edu.unmsm.fisi.siscae.service;

import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.criterio.NumeroDocumentoIdentidadCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Persona;
import pe.edu.unmsm.fisi.siscae.service.IPersonaService;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class PersonaServiceTest {

	private @Autowired IPersonaService personaService;

	@Test
	public void test() {

		Persona personaTest = new Persona();
		personaTest.setIdPersona(6);
		personaTest.setNumDocumento("73094330");
		personaTest.setNombre("PERSONA DE PRUEBA");
		personaTest.setAppPaterno("DE LA CRUZ");
		personaTest.setAppMaterno("SÁNCHEZ");
		personaTest.setSexo("MASCULINO");
		personaTest.setFechaNac(new Date(1995, 07, 04));
		personaTest.setNumTelef("985990330");
		personaTest.setIdTipoDocumento("1");

		List<Persona> personas = personaService.buscarTodos();
		personas.forEach(System.out::println);

		Persona persona = personaService.buscarPorId(1);
		System.out.println(persona);

		personaService.registrarPersona(personaTest);

		personaTest.setNombre("PROBANDO UPDATE");
		personaService.actualizarPersona(personaTest);

		personaService.eliminarPersona(personaTest);
		NumeroDocumentoIdentidadCriterioBusqueda criterioBusqueda = new NumeroDocumentoIdentidadCriterioBusqueda();
		criterioBusqueda.setNumeroDocumento("1");
		criterioBusqueda.setTipoDocumento("08070167");
		
		personaService.buscarPorNumeroDocumentoIdentidad(criterioBusqueda);
	}

}
