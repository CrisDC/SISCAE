package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Usuario;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class UsuarioMapperTest {

	private @Autowired IUsuarioMapper usuarioMapper;
	
	@Test
	public void mantenerTipoGetTest() {
		
		Usuario usuarioTest = new Usuario();
		usuarioTest.setIdUsuario(1);
		usuarioTest.setUsername("angel");
		usuarioTest.setPass("a");
		usuarioTest.setIdRol(1);
		usuarioTest.setEstado("preso");
		usuarioTest.setIdPersona(1);
		
		Parametro<Usuario> operacion = new Parametro<Usuario>(Operacion.SELECT, usuarioTest, "TEST USER");
		
		List<Usuario> usuarios = usuarioMapper.mantener(operacion);
		
		operacion.setOperacion(Operacion.INSERT.name());
		usuarios = usuarioMapper.mantener(operacion);
		usuarios.forEach(System.out::println);
		
		operacion.setOperacion(Operacion.UPDATE.name());
		usuarios = usuarioMapper.mantener(operacion);
		usuarios.forEach(System.out::println);
		
		operacion.setOperacion(Operacion.DELETE.name());
		usuarios = usuarioMapper.mantener(operacion);
		usuarios.forEach(System.out::println);
		
		
	}
	
}
