package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Escuela;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class EscuelaMapperTest {

	private @Autowired IEscuelaMapper escuelaMapper;

	@Test
	public void mantenerTipoGetTest() {

		Escuela escuelaTest = new Escuela();
		escuelaTest.setIdEscuela(2);
		escuelaTest.setNombre("INGENIERÍA DE SISTEMAS");
		escuelaTest.setIdFacultad(1);

		Parametro<Escuela> operacion = new Parametro<>(Operacion.SELECT, escuelaTest, "TEST USER");

		List<Escuela> escuelas = escuelaMapper.mantener(operacion);
		escuelas.forEach(System.out::println);
		
		operacion.setOperacion(Operacion.INSERT.name());
		escuelas = escuelaMapper.mantener(operacion);
		escuelas.forEach(System.out::println);
		
		escuelaTest.setNombre("INGENIERÍA DE SOFTWARE");
		operacion.setOperacion(Operacion.UPDATE.name());
		escuelas = escuelaMapper.mantener(operacion);
		escuelas.forEach(System.out::println);
		
		operacion.setOperacion(Operacion.DELETE.name());
		escuelas = escuelaMapper.mantener(operacion);
		escuelas.forEach(System.out::println);
	}}
