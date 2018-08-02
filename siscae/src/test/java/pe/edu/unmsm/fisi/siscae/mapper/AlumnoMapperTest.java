package pe.edu.unmsm.fisi.siscae.mapper;

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
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class AlumnoMapperTest {

	private @Autowired IAlumnoMapper alumnoMapper;
	
	@Test
	public void mantenerTipoGetTest(){
		
		Persona personaTest = new Persona();
		Alumno alumnoTest = new Alumno();
		personaTest.setIdPersona(2);
		alumnoTest.setPersona(personaTest);
		alumnoTest.setCodigoAlumno("16200197");
		alumnoTest.setEstadoAlumno("ACTIVO");
		alumnoTest.setIdTipoAcademico(1);
		alumnoTest.setIdEscuela(1);
		
		Parametro<Alumno> operacion = new Parametro<>(Operacion.SELECT, alumnoTest, "TEST USER");
		
		List<Alumno> alumnos = alumnoMapper.mantener(operacion);
		alumnos.forEach(System.out::println);
		
		operacion.setOperacion(Operacion.INSERT.name());
		alumnos = alumnoMapper.mantener(operacion);
		alumnos.forEach(System.out::println);
		
		alumnoTest.setEstadoAlumno("INACTIVO");
		operacion.setOperacion(Operacion.UPDATE.name());
		alumnos = alumnoMapper.mantener(operacion);
		alumnos.forEach(System.out::println);
		
		operacion.setOperacion(Operacion.DELETE.name());
		alumnos = alumnoMapper.mantener(operacion);
		alumnos.forEach(System.out::println);
	}
	
}
