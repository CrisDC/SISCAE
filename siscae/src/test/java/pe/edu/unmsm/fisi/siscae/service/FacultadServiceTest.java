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
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Facultad;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class FacultadServiceTest {

	private @Autowired IFacultadService facultadService;

	@Test

	public void test() {

		Facultad facultadTest = new Facultad();
		facultadTest.setIdFacultad(6);
		facultadTest.setNombre("Persona de prueba");
		facultadTest.setFechaRegistro(new Date(1997, 07, 04));
		facultadTest.setUsuarioRegistro("JAIRO");
		facultadTest.setFehaModificacion(new Date(1997, 07, 04));
		facultadTest.setUsuarioRegistro("Andre");

		List<Facultad> facultades = facultadService.buscarTodos();
		facultades.forEach(System.out::println);

		Facultad facultad = facultadService.buscarPorId(1);
		System.out.println(facultad);

		facultadService.registrarFacultad(facultadTest);

		facultadTest.setNombre("PROBANDO UPDATE");
		facultadService.actualizarFacultad(facultadTest);

		facultadService.eliminarFacultad(facultadTest);
	}

}
