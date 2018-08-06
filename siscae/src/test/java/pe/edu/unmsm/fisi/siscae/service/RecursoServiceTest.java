package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Recurso;
import pe.edu.unmsm.fisi.siscae.service.IRecursoService;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class RecursoServiceTest {

	private @Autowired IRecursoService recursoService;

	@Test
	public void test() {

		Recurso recursoTest = new Recurso();
		recursoTest.setIdRecurso(8);
		recursoTest.setNumeroSerie("M-0012");
		recursoTest.setDescripcion("OPERATIVO");
		recursoTest.setMaxCapacidad(6);
		recursoTest.setIdEstadoTabla(1);
		recursoTest.setIdTipoRecurso(3);
		recursoTest.setIdAreaEstudio(4);
		recursoTest.setIdUbicacion(1);

		List<Recurso> recursos = recursoService.buscarTodos();
		recursos.forEach(System.out::println);

		boolean existe = recursoService.existe(8);

		if (existe) {
			Recurso recurso = recursoService.buscarPorId(8);
			System.out.println(recurso);
		}

		recursoService.registrarRecurso(recursoTest);

		recursoTest.setDescripcion("PROBANDO UPDATE");
		recursoService.actualizarRecurso(recursoTest);

		recursoService.eliminarRecurso(recursoTest);

	}

}
