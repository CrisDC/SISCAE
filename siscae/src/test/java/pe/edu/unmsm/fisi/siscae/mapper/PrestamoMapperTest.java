package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.Date;
import java.util.List;

import java.time.LocalTime;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Prestamo;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class PrestamoMapperTest {

	
	private @Autowired IPrestamoMapper prestamoMapper;
	
	@Test
	public void mantenerTipoGetTest() {
	
		Prestamo prestamo = new Prestamo();
		
		LocalTime lcl = LocalTime.of(1, 1, 1);
		
		prestamo.setIdPrestamo(1);
		prestamo.setFecha(new Date(1995, 07, 04));
		prestamo.setHoraEntrada(lcl);
		prestamo.setIdEstadoTabla(3);
		prestamo.setIdRecurso(1);
		prestamo.setIdAdministrativo(1);
		prestamo.setIdPersona(1);
		
		Parametro<Prestamo> operacion = new Parametro<>(Operacion.SELECT, prestamo, "TEST USER");	
		
		List<Prestamo> prestamos = prestamoMapper.mantener(operacion);
		prestamos.forEach(System.out::println);
		
		
		operacion.setOperacion(Operacion.INSERT.name());
		prestamos = prestamoMapper.mantener(operacion);
		prestamos.forEach(System.out::println);

		
		operacion.setOperacion(Operacion.UPDATE.name());
		prestamos = prestamoMapper.mantener(operacion);
		prestamos.forEach(System.out::println);


		
		
		operacion.setOperacion(Operacion.DELETE.name());
		prestamos = prestamoMapper.mantener(operacion);
		prestamos.forEach(System.out::println);

		
		
		
		
		
		
	}
	
	
	
}
