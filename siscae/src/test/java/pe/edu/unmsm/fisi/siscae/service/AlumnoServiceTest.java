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
import pe.edu.unmsm.fisi.siscae.service.IAlumnoService;

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
		alumnoTest.setIdEstadoTabla(1);
		alumnoTest.setIdTipoAcademico(1);
		alumnoTest.setIdEscuela(1);

		List<Alumno> alumnos = alumnoService.buscarTodos();
		alumnos.forEach(System.out::println);

		Alumno alumno = alumnoService.buscarPorId(1);
		System.out.println(alumno);

		alumnoService.registrarAlumno(alumnoTest);

		alumnoTest.setIdEstadoTabla(2);
		alumnoService.actualizarAlumno(alumnoTest);
		
		alumnoService.eliminarAlumno(alumnoTest);
	}

}
