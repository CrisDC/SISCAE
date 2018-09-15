package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MultiTabDet;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class MutiTabDetMapperTest {
	
	private @Autowired IMultiTabDetMapper multiTabDetMapper;
	
	@Test
	public void mantenerTipoGetTest() {
		
		MultiTabDet multiTabDetTest = new MultiTabDet();
		
		Parametro<MultiTabDet> operacion = new Parametro<>(Operacion.SELECT, multiTabDetTest, "TEST USER");
		
		List<MultiTabDet> multiTabDet = multiTabDetMapper.mantener(operacion);
		multiTabDet.forEach(System.out::println);
		
	}

}
