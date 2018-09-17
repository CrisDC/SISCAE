package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.EstadoTabla;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class EstadoTablaMapperTest {

	private @Autowired IEstadoTablaMapper estadoTablaMapper;
	
	@Test
	public void mantenerTipoGetTest() {
		EstadoTabla estadoTablaTest = new EstadoTabla();
		
		Parametro<EstadoTabla> operacion = new Parametro<>(Operacion.SELECT, estadoTablaTest, "TEST USER");
		
		List<EstadoTabla> estadosTabla = estadoTablaMapper.mantener(operacion);
		estadosTabla.forEach(System.out::println);
	}
	
}
