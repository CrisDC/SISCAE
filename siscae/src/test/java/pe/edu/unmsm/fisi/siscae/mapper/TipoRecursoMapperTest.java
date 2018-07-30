package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.TipoRecurso;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class TipoRecursoMapperTest {

	private @Autowired ITipoRecursoMapper tipoRecursoMapper;
	
	@Test
	public void mantenerTipoGetTest(){
		TipoRecurso tipoRecursoTest = new TipoRecurso();
		tipoRecursoTest.setIdTipoRecurso(2);
		tipoRecursoTest.setNombre("COMPUTADORA");
		tipoRecursoTest.setDescripcion("PARA USO PERSONAL O DOS PERSONAS");
		tipoRecursoTest.setUso("GRUPAL DE DOS");
		Parametro<TipoRecurso> operacion = new Parametro<>(Operacion.SELECT, tipoRecursoTest);
		
		List<TipoRecurso> tipoRecursos = tipoRecursoMapper.mantener(operacion);
		tipoRecursos.forEach(System.out::println);
		
		operacion.setUserAudit("TEST USER");
		operacion.setOperacion(Operacion.INSERT.name());
		
		tipoRecursos = tipoRecursoMapper.mantener(operacion);
		tipoRecursos.forEach(System.out::println);
		
		tipoRecursoTest.setDescripcion("TESTING UPDATE");
		operacion.setOperacion(Operacion.UPDATE.name());
		
		tipoRecursos = tipoRecursoMapper.mantener(operacion);
		tipoRecursos.forEach(System.out::println);
		
		operacion.setOperacion(Operacion.DELETE.name());
		tipoRecursos = tipoRecursoMapper.mantener(operacion);
		tipoRecursos.forEach(System.out::println);
	}
	
}
