package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Alumno;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Persona;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class AlumnoServiceTest {

	private @Autowired IAlumnoService alumnoService;

	@Test
	public void test() {

		Persona personaTest = new Persona();
		Alumno alumnoTest = new Alumno();
		personaTest.setIdPersona(2);
		alumnoTest.setPersona(personaTest);
		alumnoTest.setCodigoAlumno("16200197");
		alumnoTest.setEstadoAlumno("ACTIVO");
		alumnoTest.setIdTipoAcademico(1);
		alumnoTest.setIdEscuela(1);

		List<Alumno> alumnos = alumnoService.buscarTodos();
		alumnos.forEach(System.out::println);

		alumnos = alumnoService.buscarPorIdAlumno(1);
		alumnos.forEach(System.out::println);

		alumnoService.registrarAlumno(alumnoTest);

		alumnoTest.setEstadoAlumno("INACTIVO");
		alumnoService.actualizarAlumno(alumnoTest);

		alumnoService.eliminarAlumno(alumnoTest);
	}

}
