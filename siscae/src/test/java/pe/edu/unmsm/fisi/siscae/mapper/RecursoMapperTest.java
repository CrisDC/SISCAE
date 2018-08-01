package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Institucion;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Recurso;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class RecursoMapperTest {

	private @Autowired IRecursoMapper recursoMapper;

	@Test
	public void mantenerTipoGetTest() {
		Parametro<Recurso> operacion = new Parametro<>();
		Recurso recursoTest = new Recurso(2, "C-0002", "PROBANDO INSERT", 1, true, 1, 1, 1, null, null, null, null,
				null);
		System.out.println("pase");
		operacion.setOperacion(Operacion.SELECT.name());

		operacion.setObjeto(new Recurso());

		List<Recurso> recursos = recursoMapper.mantener(operacion);
		recursos.stream().forEach(recurso -> {
			System.out.println(recurso.toString());
		});

		operacion = new Parametro<>(Operacion.INSERT, OperacionParam.PRIMARY_KEY, recursoTest, "Usuario de prueba");

		recursos = recursoMapper.mantener(operacion);
		recursos.stream().forEach(recurso -> {
			System.out.println(recurso.toString());
		});

		recursoTest.setDescripcion("PROBANDO UPDATE");
		operacion.setOperacion(Operacion.UPDATE.name());
		operacion.setObjeto(recursoTest);

		recursos = recursoMapper.mantener(operacion);
		recursos.stream().forEach(recurso -> {
			System.out.println(recurso.toString());
		});

		operacion.setOperacion(Operacion.DELETE.name());

		recursos = recursoMapper.mantener(operacion);
		recursos.stream().forEach(recurso -> {
			System.out.println(recurso.toString());
		});

	}
}
