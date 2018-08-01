package pe.edu.unmsm.fisi.siscae.mapper;


import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Administrativo;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class AdministrativoMapperTest {

	private @Autowired IAdministrativoMapper administrativoMapper;
	
	@Test
	public void mantenerTipoGetTest() {
		
		Administrativo administrativo = new Administrativo(); 
		
		administrativo.setIdAdministrativo(1);
		administrativo.setCodigoAdm("70099798");
		
		Parametro<Administrativo> operacion = new Parametro<>(Operacion.SELECT, administrativo, "TEST USER");		
		
		List<Administrativo> administrativos = administrativoMapper.mantener(operacion);
		administrativos.forEach(System.out::println);
		
		operacion.setOperacion(Operacion.INSERT.name());
		administrativos = administrativoMapper.mantener(operacion);
		administrativos.forEach(System.out::println);
		
		
		operacion.setOperacion(Operacion.UPDATE.name());
		administrativos = administrativoMapper.mantener(operacion);
		administrativos.forEach(System.out::println);
		
		
		operacion.setOperacion(Operacion.DELETE.name());
		administrativos = administrativoMapper.mantener(operacion);
		administrativos.forEach(System.out::println);
		
		
		
		
		
		
		
		
		
	}

	
	
}
