package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Docente;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Persona;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class DocenteMapperTest {

	private @Autowired IDocenteMapper docenteMapper;

	@Test
	public void mantenerTipoGetTest() {

		Persona personaTest = new Persona();
		Docente docenteTest = new Docente();
		personaTest.setIdPersona(2);
		docenteTest.setPersona(personaTest);
		docenteTest.setEstadoDocente("ACTIVO");

		Parametro<Docente> operacion = new Parametro<>(Operacion.SELECT, docenteTest, "TEST USER");

		List<Docente> docentes = docenteMapper.mantener(operacion);
		docentes.forEach(System.out::println);

		operacion.setOperacion(Operacion.INSERT.name());
		docentes = docenteMapper.mantener(operacion);
		docentes.forEach(System.out::println);

		docenteTest.setEstadoDocente("INACTIVO");
		operacion.setOperacion(Operacion.UPDATE.name());
		docentes = docenteMapper.mantener(operacion);
		docentes.forEach(System.out::println);

		operacion.setOperacion(Operacion.DELETE.name());
		docentes = docenteMapper.mantener(operacion);
		docentes.forEach(System.out::println);

	}

}
